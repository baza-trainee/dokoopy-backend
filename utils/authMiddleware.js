const fs = require("fs/promises");
const path = require("path");
const jwt = require("jsonwebtoken");
const HttpError = require("./HttpError");

const userPath = path.join(__dirname, "../db/users/users.json");

const authMiddleware = async (req, res, next) => {

  const { authorization = "" } = req.headers;
    const [ bearer, token ] = authorization.split(" ");
    if(bearer !== "Bearer") {
        next(new HttpError(401, "Not authorized"))
    }
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      const usersData = await fs.readFile(userPath, "utf-8");
      const user = await JSON.parse(usersData);
      user.token = null;
      await fs.writeFile(userPath, JSON.stringify(user), "utf-8");
      next(HttpError.UnauthorizedError("Timeout of token"));
    }
  });

  try {
    const user = jwt.decode(token, process.env.JWT_SECRET);

    req.token = token;

    req.user = user;
    next();
  } catch (error) {
    next(HttpError.UnauthorizedError("Invalid token"));
  }
};

module.exports = { authMiddleware };