import mongoose from 'mongoose';

const { Schema } = mongoose;

const pollSchema = new Schema({
  event: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
  title: { type: String, required: true, trim: true },
  createdby: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // un organisateur
  createdat: { type: Date, default: Date.now }
});

export default pollSchema;
