const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pelayananSchema = new Schema({
  layanan: {
    type: String,
  },
});

module.exports = mongoose.model("pelayanan", pelayananSchema);
