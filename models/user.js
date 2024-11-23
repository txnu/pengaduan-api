const mongoose = require("mongoose");
const pengaduan = require("./pengaduan");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  namalengkap: {
    type: String,
  },
  NIK: {
    type: Number,
    required: true,
  },
  tanggal_lahir: {
    type: String,
    required: true,
  },
  pekerjaan: {
    type: String,
    required: true,
  },
  agama: {
    type: String,
    default: null,
  },
  telepon: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  alamat: {
    type: String,
    default: true,
  },
  pengaduan: [{ type: mongoose.Schema.Types.ObjectId, ref: "pengaduan" }],
  role: {
    type: Number,
    default: 1, // 1 user biasa 2 admin
  },
});

module.exports = mongoose.model("user", userSchema);
