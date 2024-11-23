const beritaModel = require("../models/berita");
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

const upload = multer({ storage: storage, limits: { fileSize: 2000000 } });

exports.create = [
  upload.single("image"),
  async (req, res) => {
    try {
      const { judul, publikasi, deskripsi } = req.body;
      const image = req.file.filename;

      const newBerita = new beritaModel({
        judul,
        publikasi,
        deskripsi,
        image,
      });

      await newBerita.save();

      setTimeout(() => {
        res.status(200).json({
          success: true,
          msg: "Berita berhasil ditambah",
        });
      }, 1000);
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  },
];

exports.getAll = async (req, res) => {
  try {
    const beritas = await beritaModel.find();
    const delay = 1000;

    setTimeout(() => {
      res.status(200).json({
        status: 200,
        msg: "Berhasil Mengambil Data",
        data: beritas,
      });
    }, delay);
  } catch (error) {
    res.status(500).json({
      status: 500,
      msg: "Gagal Mengambil Data",
      data: [],
      error: error.message,
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const berita = await beritaModel.findById(req.params.id);
    if (!berita) {
      return res.status(404).json({
        success: false,
        msg: "Berita tidak ditemukan",
        data: null,
      });
    }
    res.status(200).json({
      success: true,
      msg: "Berhasil Mengambil Data",
      data: berita,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      msg: "Gagal Mengambil Data",
      data: null,
      error: error.message,
    });
  }
};

// Update promo by ID
exports.update = async (req, res) => {
  upload.single("image")(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res
        .status(400)
        .json({ message: "Multer error", error: err.message });
    } else if (err) {
      return res
        .status(500)
        .json({ message: "Unknown error", error: err.message });
    }

    const { id } = req.params;
    const { judul, publikasi, deskripsi } = req.body;
    let image = req.file ? req.file.filename : null;

    try {
      let existingBerita = await beritaModel.findById(id);
      if (!existingBerita) {
        return res.status(404).json({
          success: false,
          msg: "Berita Not Found",
          data: null,
        });
      }

      if (req.file) {
        const imagePath = path.join(
          __dirname,
          "../static",
          existingBerita.image
        );
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
        image = req.file.filename;
      } else {
        image = existingBerita.image;
      }
      existingBerita.judul = judul;
      existingBerita.publikasi = publikasi;
      existingBerita.deskripsi = deskripsi;
      existingBerita.image = image;

      const updatedBerita = await existingBerita.save();

      res.status(200).json({
        success: true,
        msg: "Berita updated successfully",
        data: updatedBerita,
      });
    } catch (error) {
      console.error("Failed to update berita:", error);
      res.status(500).json({
        success: false,
        msg: "Failed to update promo",
        data: null,
        error: error.message,
      });
    }
  });
};
exports.delete = async (req, res) => {
  try {
    const deleted = await beritaModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        status: 404,
        msg: "Berita tidak ditemukan",
        data: null,
      });
    }
    const imagePath = path.join(__dirname, "..", "static", deleted.image);

    fs.unlink(imagePath, (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          msg: "Gagal Menghapus Gambar",
          data: null,
          error: err.message,
        });
      }

      res.status(200).json({
        success: true,
        msg: "Berhasil Menghapus Data dan Gambar",
        data: deleted,
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Gagal Menghapus Data",
      data: null,
      error: error.message,
    });
  }
};
