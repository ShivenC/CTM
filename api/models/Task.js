const mongoose = require("mongoose");
const { Schema } = mongoose;

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlenght: 1,
    trim: true,
  },
  _listId: {
    type: mongoose.Types.ObjectId,
    requrired: true,
  },
});

const TaskModel = mongoose.model("Task", TaskSchema);

module.exports = TaskModel;
