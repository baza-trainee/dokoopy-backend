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

  const usersData = await fs.readFile(userPath, "utf-8");
  user = await JSON.parse(usersData);

    try {
      jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
              user.token = "";
              await fs.writeFile(userPath, JSON.stringify(user, null, 2), "utf-8");
              next(HttpError.UnauthorizedError(401, "Not authorized"));
            }});

      if (!user || !user.token || user.token !== token) {
          next(new HttpError.UnauthorizedError(401, "Not authorized"));
      }
      req.user = user;
      next();
  } catch {
      next(new HttpError(401, "Not authorized"));
  }  
};

module.exports = { authMiddleware };