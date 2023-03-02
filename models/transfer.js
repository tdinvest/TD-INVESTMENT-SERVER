const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ptransferSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
  },
);

module.exports = mongoose.model('Transfer', postSchema);
