const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const beritaSchema = new Schema({
  judul: {
    type: String,
  },
  publikasi: {
    type: String,
  },
  deskripsi: {
    type: String,
  },
  image: {
    type: String,
  },
  publishedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("berita", beritaSchema);
