var mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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

// function to hash password after add to database
usersSchema.pre("save", function (next) {
  if (this.isNew || this.isModified("password")) {
    bcrypt
      .hash(this.password, 10)
      .then((hash) => {
        this.password = hash;
        next();
      })
      .catch((error) => {
        next(error);
      });
  } else {
    next();
  }
});

module.exports = mongoose.model("users", usersSchema);
