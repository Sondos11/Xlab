var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var usersSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model("users", usersSchema);
