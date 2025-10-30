import mongoose from 'mongoose';

const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    thread: { type: Schema.Types.ObjectId, ref: 'Thread', required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true, trim: true },
    parent: { type: Schema.Types.ObjectId, ref: 'Message' }, // pour les réponses
    createdat: { type: Date, default: Date.now }
  },
  { timestamps: false }
);

messageSchema.index({ thread: 1, created_at: 1 });

export default messageSchema;
