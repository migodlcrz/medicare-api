import jwt, { Secret } from "jsonwebtoken";

export const createToken = (_id: string, username: string) => {
  const secretOrPrivateKey: Secret = process.env.SECRET || "";
  return jwt.sign({ _id: _id, username: username }, secretOrPrivateKey, {
    expiresIn: "1h",
  });
};
