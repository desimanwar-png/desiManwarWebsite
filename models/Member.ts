import mongoose, { Schema, Document, model, models, Model } from 'mongoose';

// Interface for the Member document
export interface IMember extends Document {
  name: string;
  email: string;
  phone: string;
  image: string;
  joiningDate: Date;
  designation?: string;
  fbURL?: string;
  instaURL?: string;
  twitterURL?: string;
  linkedinURL?: string;
  isActive: boolean;
  priority: number;
}

// Mongoose schema for the Member
const membersSchema: Schema<IMember> = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: '',
  },
  joiningDate: {
    type: Date,
    default: Date.now,
  },
  designation: {
    type: String,
  },
  fbURL: {
    type: String,
    default: '',
  },
  instaURL: {
    type: String,
    default: '',
  },
  twitterURL: {
    type: String,
    default: '',
  },
  linkedinURL: {
    type: String,
    default: '',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  priority: {
    type: Number,
    default: 1000,
  },
});

// Export the model, handling the case where the model might already be compiled
const Member: Model<IMember> = models.Member || model<IMember>('Member', membersSchema);

export default Member;
