const unitModel = require("../models/unit");

exports.create = (data) =>
  new Promise((resolve, reject) => {
    unitModel
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
    unitModel
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
    unitModel
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
    unitModel
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
    unitModel
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
