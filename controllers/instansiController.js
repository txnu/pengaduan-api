const instansiModel = require("../models/instansi");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./static");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage, limits: { fieldSize: 200000 } });

exports.create = [
  upload.single("image"),
  async (req, res) => {
    try {
      const { jabatan, nama } = req.body;
      const image = req.file.filename;

      const newInstansi = new instansiModel({
        jabatan,
        nama,
        image,
      });

      await newInstansi.save();
      res.status(200).json({
        status: true,
        msg: "Jabatan Instansi Berhasil Ditambahkan",
      });
    } catch (error) {
      res.status(500).json({ msg: "Internal Server Error" });
    }
  },
];

exports.getall = async (req, res) => {
  try {
    const instansi = await instansiModel.find();
    const delay = 2000;

    setTimeout(() => {
      res.status(200).json({
        status: true,
        msg: "Berhasil mendapatkan semua struktu instansi",
        data: instansi,
      });
    }, delay);
  } catch (error) {
    res.status(500).json({
      status: false,
      msg: "Gagal mendapatkan struktur instansi",
      data: [],
    });
  }
};

exports.getbyid = async (req, res) => {
  try {
    const instansi = await instansiModel.findById(req.params.id);
    if (!instansi) {
      res.status(404).json({
        status: false,
        msg: "Struktur tidak ditemukan",
      });
    }
    res.status(200).json({
      status: true,
      msg: "Berhasil mendapatkan semua struktu instansi",
      data: instansi,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      msg: "Gagal mendapatkan struktur instansi",
      data: [],
    });
  }
};
