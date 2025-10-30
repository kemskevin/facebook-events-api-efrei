import mongoose from 'mongoose';

const { Schema } = mongoose;

const ticketOrderSchema = new Schema(
  {
    event: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    ticketType: { type: Schema.Types.ObjectId, ref: 'TicketType', required: true },
    buyer: {
      // personne extérieure possible
      firstname: { type: String, required: true, trim: true },
      lastname: { type: String, required: true, trim: true },
      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Email invalide']
      },
      address: { type: String, required: true, trim: true }
    },
    purchasedat: { type: Date, default: Date.now }
  },
  { timestamps: false }
);

// une personne extérieure peut obtenir 1 seul billet par event
ticketOrderSchema.index({ 'buyer.email': 1, event: 1 }, { unique: true });

export default ticketOrderSchema;
