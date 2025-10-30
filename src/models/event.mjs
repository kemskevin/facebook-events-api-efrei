import mongoose from 'mongoose';

const { Schema } = mongoose;

const eventSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    startdate: { type: Date, required: true },
    enddate: {
      type: Date,
      required: true,
      validate: {
        validator(v) {
          return !this.start_date || v >= this.start_date;
        },
        message: 'La date de fin doit être ≥ date de début'
      }
    },
    location: { type: String, default: '' },
    coverurl: { type: String, default: '' },
    privacy: { type: String, enum: ['public', 'private'], default: 'public' },
    organizers: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    group: { type: Schema.Types.ObjectId, ref: 'Group' }, // optionnel si créé dans un groupe
    createdat: { type: Date, default: Date.now }
  },
  { timestamps: false }
);

eventSchema.index({ name: 'text', description: 'text', location: 'text' });
eventSchema.index({ start_date: 1 });

export default eventSchema;
