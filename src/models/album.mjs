import mongoose from 'mongoose';

const { Schema } = mongoose;

const albumSchema = new Schema({
  event: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  photos: [{ type: Schema.Types.ObjectId, ref: 'Photo' }],
  createdat: { type: Date, default: Date.now }
});

export default albumSchema;
