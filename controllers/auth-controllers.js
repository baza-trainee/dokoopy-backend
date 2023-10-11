const fs = require("fs/promises");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const HttpError = require("../utils/HttpError");
const controllerWrapper = require("../utils/controllerWrapper");
const { RESET_PASSWORD_SECRET_KEY, BASE_URL, FRONT_LOCALHOST } = process.env;
const resetPasswordHtml = require('../utils/resetPasswordEmail');
const sendEmail = require('../utils/sendEmail');

const userPath = path.join(__dirname, "../db/users/users.json");

const login = async (req, res) => {
  const { email, password } = req.body;

  const usersData = await fs.readFile(userPath, "utf-8");
  const user = await JSON.parse(usersData);

  if (user.token) {
    throw HttpError.ConflictError("User is logged in before");
  }

  if (user.email === email && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: 3600,
    });

    user.token = token;
    await fs.writeFile(userPath, JSON.stringify(user, null, 2), "utf-8");
  } else {
    throw HttpError.BadRequest("Wrong email or password");
  }

  res.status(200).json(user.token);
};

const logout = async (req, res) => {
  const usersData = await fs.readFile(userPath, "utf-8");
  const user = await JSON.parse(usersData);

  user.token = "";
  await fs.writeFile(userPath, JSON.stringify(user, null, 2), "utf-8");

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
  const usersData = await fs.readFile(userPath, "utf-8");
  const user = await JSON.parse(usersData);

  if (user.email !== email) {
    throw new HttpError(404, "User not found")
  }

  const payload = {
      email: user.email,
  };

  const resetToken = jwt.sign(payload, RESET_PASSWORD_SECRET_KEY, { expiresIn: 3600 });

  const resetPasswordEmail = {
      to: email,
      subject: "Зміна паролю для входу на сайт Dokoopy",
      html: `${resetPasswordHtml}
      target="_blank" href="${FRONT_LOCALHOST}/login/renew/token/${resetToken}">Змінити пароль</a>
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
  const { resetToken } = req.params;
  const { password } = req.body;

  const usersData = await fs.readFile(userPath, "utf-8");
  const user = await JSON.parse(usersData);

  jwt.verify(resetToken, RESET_PASSWORD_SECRET_KEY, function(err, decoded) {
      if (err) {
          throw new HttpError(403, "Reset token is expired")
      }
    });

  const hashPassword = await bcrypt.hash(password, 10);
  user.password = hashPassword;
  await fs.writeFile(userPath, JSON.stringify(user), "utf-8");

  res.status(200).json({
      status: 'success',
      code: 200,
      message: "Reset password is succesful"
  })
};

module.exports = {
  login: controllerWrapper(login),
  logout: controllerWrapper(logout),
  getCurrentUser: controllerWrapper(getCurrentUser),
  forgotPassword: controllerWrapper(forgotPassword),
  resetPassword: controllerWrapper(resetPassword),
};

