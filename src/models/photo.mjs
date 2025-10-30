import mongoose from 'mongoose';

const { Schema } = mongoose;

const photoSchema = new Schema(
  {
    album: { type: Schema.Types.ObjectId, ref: 'Album', required: true },
    postedby: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    url: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    comments: [
      {
        author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        content: { type: String, required: true, trim: true },
        createdat: { type: Date, default: Date.now }
      }
    ],
    createdat: { type: Date, default: Date.now }
  },
  { timestamps: false }
);

photoSchema.index({ album: 1, created_at: 1 });

export default photoSchema;
