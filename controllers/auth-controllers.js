const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const HttpError = require("../utils/HttpError");
const controllerWrapper = require("../utils/controllerWrapper");
const { RESET_PASSWORD_SECRET_KEY, BASE_URL, JWT_SECRET, FRONT_LOCALHOST, FRONT_BASE_URL } = process.env;
const { User } = require("../db/models/users");
const resetPasswordHtml = require('../utils/resetPasswordEmail');
const sendEmail = require('../utils/sendEmail');


const login = async (req, res) => {
  const { email, password} = req.body;
  const formattedEmail = email.toLowerCase();
    const user = await User.findOne({ email: formattedEmail });
    if (!user) { 
        throw new HttpError(401, "Email or password is wrong");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) { 
        throw new HttpError(401, "Email or password is wrong");
    }

    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: 3600 });
    await User.findByIdAndUpdate(user._id, { token });

    res.status(201).json({
        status: 'success',
        code: 201,
        token,
    },);
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(200).json({
    message: "Logout success"
  })
};

const getCurrentUser = async (req, res) => {
  const { email } = req.user;
  
  res.status(200).json({
    email,
})
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const formattedEmail = email.toLowerCase();

  const user = await User.findOne({ email: formattedEmail });
    if (!user) { 
        throw new HttpError(404, "User not found");
    }

  const payload = {
      id: user._id,
  };
  
  const resetToken = jwt.sign(payload, RESET_PASSWORD_SECRET_KEY, { expiresIn: 3600 });

  const resetPasswordEmail = {
      to: email,
      subject: "Зміна паролю для входу на сайт Dokoopy",
      html: `${resetPasswordHtml}
      target="_blank" href="${FRONT_BASE_URL}/login/renew/token/${user._id}/${resetToken}">Змінити пароль</a>
      </div>
      `
  };

  await sendEmail(resetPasswordEmail);

  res.status(200).json({
      status: 'success',
      code: 200,
      message: "Reset password email sent"
  })
};

const resetPassword = async (req, res) => {
  const { id, resetToken } = req.params;
  const { password } = req.body;

  jwt.verify(resetToken, RESET_PASSWORD_SECRET_KEY, function(err, decoded) {
      if (err) {
          throw new HttpError(403, "Reset token is expired")
      }
  });

  const hashPassword = await bcrypt.hash(password, 10);
  await User.findByIdAndUpdate({_id: id},{ password: hashPassword });

  res.status(200).json({
      status: 'success',
      code: 200,
      message: "Reset password is succesful"
  })
};

const changePassword = async (req, res) => {
  const { password, newPassword } = req.body;

  const passwordCompare = await bcrypt.compare(password, req.user.password);
    if (!passwordCompare) { 
        throw new HttpError(404, "Password is wrong");
    }
    const hashPassword = await bcrypt.hash(newPassword, 10);
    const user = await User.findByIdAndUpdate(req.user._id, { password: hashPassword });

    if (!user) { 
      throw new HttpError(404, "User not found");
  }

    res.status(200).json({
      message: "Password changed"
    })
}

module.exports = {
  login: controllerWrapper(login),
  logout: controllerWrapper(logout),
  getCurrentUser: controllerWrapper(getCurrentUser),
  forgotPassword: controllerWrapper(forgotPassword),
  resetPassword: controllerWrapper(resetPassword),
  changePassword: controllerWrapper(changePassword),
};

