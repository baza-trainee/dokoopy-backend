const fs = require("fs/promises");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const HttpError = require("../utils/HttpError");
const controllerWrapper = require("../utils/controllerWrapper");

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
    await fs.writeFile(userPath, JSON.stringify(user), "utf-8");
  } else {
    throw HttpError.BadRequest("Wrong email or password");
  }

  res.status(200).json(user.token);
};

const logout = async (req, res) => {
  const usersData = await fs.readFile(userPath, "utf-8");
  const user = await JSON.parse(usersData);

  if (req.token === user.token) {
    user.token = null;
    await fs.writeFile(userPath, JSON.stringify(user), "utf-8");
  } else {
    throw HttpError.UnauthorizedError("Not authorized");
  }

  res.status(204).json("No Content");
};

const getCurrentUser = async (req, res) => {
  const usersData = await fs.readFile(userPath, "utf-8");
  const user = await JSON.parse(usersData);
  let answer;
  if (req.token === user.token) {
    answer = { email: user.email };
  } else {
    throw HttpError.UnauthorizedError("Not authorized");
  }

  res.status(200).json(answer);
};

module.exports = {
  login: controllerWrapper(login),
  logout: controllerWrapper(logout),
  getCurrentUser: controllerWrapper(getCurrentUser),
};
