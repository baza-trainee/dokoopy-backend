const jwt = require("jsonwebtoken");
const { User } = require("../db/models/users");
const HttpError = require("../utils/HttpError");
const { JWT_SECRET } = process.env;

const authMiddleware = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const [ bearer, token ] = authorization.split(" ");
    if(bearer !== "Bearer") {
        next(new HttpError(401, "Not authorized"))
    }

    try {
        const { id } = jwt.verify(token, JWT_SECRET);
        console.log(id)
        const user = await User.findById(id);
        if(!user || !user.token) {
            next(new HttpError(404, "User not found"))
        }
        req.user = user;
        next()
    }
    catch {
        next(new HttpError(401, "Not authorized"))
    }
}

module.exports = authMiddleware;