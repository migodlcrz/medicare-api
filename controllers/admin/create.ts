import { Request, Response } from "express";
import Admin from "../../models/Admin";
import bcrypt from "bcrypt";
import validator from "validator";

export const createAdmin = async (req: Request, res: Response) => {
  try {
    const { name, username, password } = req.body;

    if (!name || !username || !password) {
      return res.status(400).json({ error: "Incomplete details." });
    }

    if (!validator.isLength(username, { min: 3, max: 20 })) {
      return res
        .status(400)
        .json({ error: "Username must be between 3 and 20 characters." });
    }

    if (!validator.isLength(password, { min: 6 })) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long." });
    }

    const existingUser = await Admin.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      name,
      username,
      password: hashedPassword,
    });

    await newAdmin.save();

    res.status(201).json({ message: "Admin created successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
};
