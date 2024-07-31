import express from "express";
import { login } from "../controllers/admin/login";
import { createAdmin } from "../controllers/admin/create";

const admin = express.Router();

admin.post("/login", login);

admin.post("/create", createAdmin);

export default admin;
