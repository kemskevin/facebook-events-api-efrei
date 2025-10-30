import mongoose from 'mongoose';

const { Schema } = mongoose;

const pollVoteSchema = new Schema({
  question: { type: Schema.Types.ObjectId, ref: 'PollQuestion', required: true },
  voter: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  optionkey: { type: String, required: true }, // clé d'une option de la question
  createdat: { type: Date, default: Date.now }
});

// Un seul vote par question et par participant
pollVoteSchema.index({ question: 1, voter: 1 }, { unique: true });

export default pollVoteSchema;
