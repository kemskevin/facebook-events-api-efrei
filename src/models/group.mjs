import mongoose from 'mongoose';

const { Schema } = mongoose;

const groupSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    iconurl: { type: String, default: '' },
    coverurl: { type: String, default: '' },
    visibility: {
      type: String,
      required: true,
      enum: ['public', 'private', 'secret'],
      default: 'public'
    },
    allowmemberposts: { type: Boolean, default: true },
    allowmemberevents: { type: Boolean, default: true },
    admins: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    createdat: { type: Date, default: Date.now }
  },
  { timestamps: false }
);

groupSchema.index({ name: 'text', description: 'text' });

export default groupSchema;
