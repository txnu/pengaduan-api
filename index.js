const express = require("express");
const app = express();
const mongoose = require("mongoose");
const mongoUrl = "mongodb://127.0.0.1/PengaduanCepat";
const cors = require("cors");
const path = require("path");

mongoose
  .connect(mongoUrl, {})
  .then(() => {
    console.log("Berhasil Terhubung ke Databasee");
  })
  .catch((e) => {
    console.log(e);
    console.log("Gagal Terhubung ke Database");
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/pengaduan", require("./routes/pengaduan"));
app.use("/jenis-pengaduan", require("./routes/jenisPengaduan"));
app.use("/instansi", require("./routes/instansi"));
app.use("/berita", require("./routes/berita"));
app.use("/user", require("./routes/user"));
app.use("/unit", require("./routes/unit"));
app.use("/pelayanan", require("./routes/pelayanan"));

const directory = path.join(__dirname, "static");
app.use("/static", express.static(directory));

app.listen(5001, "0.0.0.0", () => {
  console.log("API Berjalan Dengan Baik");
});
