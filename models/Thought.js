const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create Student model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 128
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // TODO: Use a getter method to format the timestamp on query
    },
    username: {
      type: String,
      required: true
    },
    reactions: [
      // TODO: Array of nested documents created with the reactionSchema
      reactionSchema
    ]
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

thoughtSchema.virtual('reactionCount')
  .get(function () {
    return this.reactions.length
  })

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
