import mongoose, { Schema, Document, model, models, Model } from 'mongoose';

// Interface for the Category document
export interface ICategory extends Document {
  name: string;
  subCategories: string[];
}

// Mongoose schema for the Category
const categorySchema: Schema<ICategory> = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  subCategories: [
    {
      type: String,
      required: true,
    },
  ],
});

// Export the model, handling the case where the model might already be compiled
const Category: Model<ICategory> = models.Category || model<ICategory>('Category', categorySchema);

export default Category;
