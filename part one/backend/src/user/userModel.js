var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var usersSchema = new Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: (val) => {
        return /^[a-zA-Z\s]{3,30}$/i.test(val);
      },
      message: (props) => `${props.value} is not a valid name !`,
    },
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
