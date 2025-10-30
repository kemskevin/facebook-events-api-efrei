import mongoose from 'mongoose';

const { Schema } = mongoose;

const pollQuestionSchema = new Schema(
  {
    poll: { type: Schema.Types.ObjectId, ref: 'Poll', required: true },
    question: { type: String, required: true, trim: true },
    options: [
      {
        // réponses possibles
        _id: false,
        key: { type: String, required: true }, // ex: 'A', 'B'...
        label: { type: String, required: true }
      }
    ]
  },
  { timestamps: false }
);

export default pollQuestionSchema;
