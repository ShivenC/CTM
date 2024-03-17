const mongoose = require("mongoose");
const { Schema } = mongoose;

const ListSchema = new Schema({
  owner: [
    {
      type: String,
    },
  ],
  email: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
});

const ListModel = mongoose.model("List", ListSchema);

module.exports = ListModel;
