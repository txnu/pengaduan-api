const layananModel = require("../models/pelayanan");

exports.create = (data) =>
  new Promise((resolve, reject) => {
    layananModel
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

exports.getAll = () =>
  new Promise((resolve, reject) => {
    layananModel
      .find({})
      .then((res) => {
        resolve({
          success: true,
          msg: "Berhasil Mengambil Data",
          data: res,
        });
      })
      .catch(() =>
        reject({
          success: false,
          msg: "Gagal Mengambil Data",
          data: [],
        })
      );
  });

exports.getById = (id) =>
  new Promise((resolve, reject) => {
    layananModel
      .findOne({
        _id: id,
      })
      .then((res) => {
        resolve({
          success: true,
          msg: "Berhasil Mengambil Data",
          data: res,
        });
      })
      .catch(() =>
        reject({
          success: false,
          msg: "Gagal Mengmabil Data",
          data: {},
        })
      );
  });

exports.edit = (id, data) =>
  new Promise((resolve, reject) => {
    layananModel
      .updateOne(
        {
          _id: id,
        },
        data
      )
      .then(() =>
        resolve({
          success: true,
          msg: "Berhasil Edit Data",
        })
      )
      .catch(() =>
        reject({
          success: false,
          msg: "Gagal Edit Data",
        })
      );
  });

exports.delete = (id) =>
  new Promise((resolve, reject) => {
    layananModel
      .deleteOne({
        _id: id,
      })
      .then(() =>
        resolve({
          success: true,
          msg: "Berhasil Hapus Data",
        })
      )
      .catch(() =>
        reject({
          success: false,
          msg: "Gagal Hapus Data",
        })
      );
  });
