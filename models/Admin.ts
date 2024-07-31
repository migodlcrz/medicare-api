import { Schema, model, Document } from "mongoose";

interface IAdmin extends Document {
  username: string;
  password: string;
}

const adminSchema = new Schema<IAdmin>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default model<IAdmin>("Admin", adminSchema);
