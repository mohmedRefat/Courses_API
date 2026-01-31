import jwt from "jsonwebtoken";

 function generateTokenJwt(payload) {
  return  jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
}

export default generateTokenJwt;
