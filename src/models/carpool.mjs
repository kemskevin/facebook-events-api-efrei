import mongoose from 'mongoose';

const { Schema } = mongoose;

const carpoolSchema = new Schema(
  {
    departure_location: {
      type: String,
      required: true
    },
    departuretime: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      default: 0
    },
    availableseats: {
      type: Number,
      required: true,
      min: [1, 'Une voiture doit avoir au moins 1 place disponible']
    },
    maxdelay: {
      type: String, // ex: '30min'
      default: '0min'
    },
    driver: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    passengers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    event: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default carpoolSchema;
