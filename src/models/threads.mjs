import mongoose from 'mongoose';

const { Schema } = mongoose;

const threadSchema = new Schema(
  {
    scopetype: { type: String, required: true, enum: ['group', 'event'] }, // exclusif
    group: { type: Schema.Types.ObjectId, ref: 'Group' },
    event: { type: Schema.Types.ObjectId, ref: 'Event' },
    createdby: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdat: { type: Date, default: Date.now }
  },
  { validateBeforeSave: true }
);

// Validation exclusive : si scope_type = group -> group requis, sinon event
threadSchema.path('group').validate(function validateGroup(v) {
  return (this.scopetype === 'group' && v) || (this.scopetype === 'event' && !v);
}, 'Thread group/event exclusif (group attendu si scope_type=group)');

// Validation inverse : si scope_type = event -> event requis, sinon group
threadSchema.path('event').validate(function validateEvent(v) {
  return (this.scopetype === 'event' && v) || (this.scopetype === 'group' && !v);
}, 'Thread group/event exclusif (event attendu si scope_type=event)');

export default threadSchema;
