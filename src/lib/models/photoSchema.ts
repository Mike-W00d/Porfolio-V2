import mongoose, { Document, Schema } from 'mongoose';

export interface IPhoto extends Document {
  imageURL: string;
  description: string;
}

const photoSchema = new Schema({
  imageURL: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Photo = mongoose.models.Photo || mongoose.model<IPhoto>('Photo', photoSchema);

export default Photo;