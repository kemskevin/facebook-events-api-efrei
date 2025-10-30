import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstname: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Email invalide']
    },
    password_hash: { type: String, required: true },
    avatarurl: { type: String, default: '' },
    roles: {
      type: [String],
      default: ['user'],
      enum: ['user', 'admin']
    },
    createdat: { type: Date, default: Date.now }
  },
  { timestamps: false }
);

userSchema.index({ email: 1 }, { unique: true });

export default userSchema;
