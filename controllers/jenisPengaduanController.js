const jenisPengaduanModel = require("../models/jenisPengaduan");
const path = require("path");
const fs = require("fs");

exports.create = (data) =>
  new Promise((resolve, reject) => {
    jenisPengaduanModel
      .create(data)
      .then(() => {
        resolve({
          success: true,
          msg: "Berhasil Menyimpan Data",
        });
      })
      .catch((e) => {
        console.log(e);
        reject({
          success: false,
          msg: "Gagal Menyimpan Data",
        });
      });
  });

exports.getData = () =>
  new Promise((resolve, reject) => {
    jenisPengaduanModel
      .find()
      .populate("idUnit", "nama_unit")
      .then((res) => {
        resolve({
          success: true,
          msg: "Berhasil Mengambil Data",
          data: res,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        reject({
          success: false,
          msg: "Gagal Mengambil Data",
          data: [],
        });
      });
  });

exports.getById = async (req, res) => {
  try {
    const jenis = await jenisPengaduanModel.findById(req.params.id);
    if (!jenis) {
      return res.status(404).json({
        status: 404,
        msg: "Jenis Pengaduan tidak ditemukan",
        data: null,
      });
    }
    res.status(200).json({
      status: 200,
      msg: "Berhasil Mengambil Data",
      data: jenis,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      msg: "Gagal Mengambil Data",
      data: null,
      error: error.message,
    });
  }
};

// Update promo by ID
exports.update = async (req, res) => {
  const { id } = req.params;
  const { jenis } = req.body;

  try {
    let existingJenis = await jenisPengaduanModel.findById(id);
    if (!existingJenis) {
      return res.status(404).json({
        status: 404,
        msg: "Jenis Pengaduan Not Found",
        data: null,
      });
    }

    existingJenis.jenis = jenis;

    // Save updated promo data
    const updatedJenis = await existingJenis.save();

    res.status(200).json({
      status: 200,
      msg: "Jenis pengaduan updated successfully",
      data: updatedJenis,
    });
  } catch (error) {
    console.error("Failed to update Jenis Pengaduan:", error);
    res.status(500).json({
      status: 500,
      msg: "Failed to update Jenis Pengaduan",
      data: null,
      error: error.message,
    });
  }
};
exports.delete = async (req, res) => {
  try {
    const deleted = await jenisPengaduanModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        status: 404,
        msg: "Jenis Pengaduan tidak ditemukan",
        data: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      msg: "Gagal Menghapus Data",
      data: null,
      error: error.message,
    });
  }
};
