import mongoose from 'mongoose';

const { Schema } = mongoose;

const ticketTypeSchema = new Schema(
  {
    event: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 1 },
    created_at: { type: Date, default: Date.now }
  },
  { timestamps: false }
);

ticketTypeSchema.index({ event: 1, name: 1 }, { unique: true });

export default ticketTypeSchema;
