import { Request, Response } from "express";
import Admin from "../../models/Admin";
import validator from "validator";
import bcrypt from "bcrypt";
import { createToken } from "../createToken";

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ error: "Incomplete details." });
      return;
    }

    const user = await Admin.findOne({ username });

    if (!user) {
      res.status(400).json({ error: "Invalid credentials." });
      return;
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      res.status(400).json({ error: "Invalid credentials." });
      return;
    }

    try {
      const token = createToken(String(user._id), String(user.username));

      const username = user.username;
      const name = user.name;

      return res.status(200).json({
        message: "Logged In.",
        token: token,
        username: username,
        name: name,
      });
    } catch (error) {
      res.status(400).json({ error: error });
      console.log(error);
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
};
