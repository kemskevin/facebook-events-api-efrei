import mongoose from 'mongoose';

const { Schema } = mongoose;

const shoppingItemSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      default: 1
    },
    arrivaltime: {
      type: String,
      required: true
    },
    event: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Unicité par nom + event
shoppingItemSchema.index({ name: 1, event: 1 }, { unique: true });

export default shoppingItemSchema;
