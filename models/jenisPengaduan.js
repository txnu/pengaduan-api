const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jenisPengaduanSchema = new Schema({
  jenis: {
    type: String,
  },
  idUnit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "unit",
  },
});

module.exports = mongoose.model("jenis_pengaduan", jenisPengaduanSchema);
