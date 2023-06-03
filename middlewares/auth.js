const { User } = require("../models/User");
const { HttpError } = require("../utils/HttpError");
const jwt = require("jsonwebtoken");
const { assignTokens } = require("../utils/assignTokens");
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

const auth = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer" || !token) {
    return next(new HttpError(401, "Not authorized"));
  }

  const decoded = jwt.decode(token);
    let fetchedUser;
    
  try {
     fetchedUser = await User.findById(decoded.id);

    if (!fetchedUser || !fetchedUser.refresh_token) {
      throw new HttpError(401, "Not authorized");
    }
    jwt.verify(token, ACCESS_TOKEN_SECRET);
    req.user = fetchedUser;
    next();
  } catch (error) {
    if (error.name !== "TokenExpiredError") {
      return next(new HttpError(401, "Not authorized"));
    }
    const { accessToken, refreshToken } = assignTokens(fetchedUser);
    await User.findByIdAndUpdate(fetchedUser._id, { refreshToken });

    res.json({ accessToken });
  }
};

module.exports = { auth };
