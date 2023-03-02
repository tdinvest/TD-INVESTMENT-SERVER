const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  name: {
    type: String,
  },
  username: {
    type: String,
  },
  balance: {
    type: String,
    default: '0.00'
  },
  accountNo: {
    type: String,
  },
  verify: {
    type: String,
    default: '0'
  },
  
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post'
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
