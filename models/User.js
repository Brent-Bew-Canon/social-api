const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: thoughtSchema
    }],
    friends: [{
      type: Schema.Types.ObjectId,
      ref: this
    }]
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.virtual('friendCount')
  .get(function () {
    return this.friends.length
  })

const User = model('user', userSchema);

module.exports = User;
