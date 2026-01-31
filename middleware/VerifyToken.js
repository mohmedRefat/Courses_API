import jwt from "jsonwebtoken";

const VerifyToken = (req, res, next) => {
  try {
    const authHeader =
      req.headers["authorization"] || req.headers["Authorization"];

    if (!authHeader) {
      return res.status(401).json({
        status: "FAIL",
        message: "Authorization header is missing",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        status: "FAIL",
        message: "Token is missing",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      status: "ERROR",
      message: "Invalid or expired token",
    });
  }
};

export default VerifyToken;
