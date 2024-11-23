const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const unitSchema = new Schema({
  unit: {
    type: String,
  },
});

module.exports = mongoose.model("unit", unitSchema);
