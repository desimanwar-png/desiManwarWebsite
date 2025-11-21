import mongoose, { Schema, Document, model, models, Model } from 'mongoose';

// Interface for the User document
export interface IUser extends Document {
  name: string;
  email: string;
  password?: string; // Optional because we might not always want to return it
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose schema for the User
const userSchema: Schema<IUser> = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false, // Prevents password from being returned in queries by default
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

// Export the model, handling the case where the model might already be compiled
const User: Model<IUser> = models.User || model<IUser>('User', userSchema);

export default User;
