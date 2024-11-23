const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const instansiSchema = new Schema({
  jabatan: {
    type: String,
    required: true,
  },
  nama: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("instansi", instansiSchema);
