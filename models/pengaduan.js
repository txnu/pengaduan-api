const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pengaduanSchema = new Schema({
  nomorLaporan: {
    type: String,
    default: null,
  },
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  idJenisPengaduan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "jenis_pengaduan",
  },
  kronologi: {
    type: String,
    required: true,
  },
  tanggal: { type: Date, default: Date.now },
  status: {
    type: Number,
    default: 0,
  },
  kodeVerifikasi: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("pengaduan", pengaduanSchema);
