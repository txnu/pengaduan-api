const pengaduanModel = require("../models/pengaduan");

function generateVerificationCode() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }

  return code;
}

exports.create = (data) =>
  new Promise((resolve, reject) => {
    data.kodeVerifikasi = generateVerificationCode();

    pengaduanModel
      .create(data)
      .then(() => {
        setTimeout(() => {
          resolve({
            success: true,
            msg: "Berhasil Menyimpan Data",
            code: data.kodeVerifikasi,
          });
        }, 1000);
      })
      .catch((e) => {
        setTimeout(() => {
          console.log(e);
          reject({
            success: false,
            msg: "Gagal Menyimpan Data",
          });
        }, 2000);
      });
  });

exports.getData = () =>
  new Promise((resolve, reject) => {
    pengaduanModel
      .find()
      .populate(
        "idUser",
        "namalengkap telepon alamat NIK tanggal_lahir pekerjaan"
      )
      .populate("idJenisPengaduan", "jenis idUnit")
      .then((res) => {
        setTimeout(() => {
          resolve({
            success: true,
            msg: "Berhasil Mengambil Data",
            data: res,
          });
        }, 2000);
      })
      .catch((error) => {
        setTimeout(() => {
          console.error("Error:", error);
          reject({
            success: false,
            msg: "Gagal Mengambil Data",
            data: [],
          });
        }, 3000);
      });
  });

exports.getByNomorLaporan = (nomorLaporan) =>
  new Promise((resolve, reject) => {
    pengaduanModel
      .findOne({
        nomorLaporan: nomorLaporan,
      })
      .then((res) => {
        if (res) {
          setTimeout(() => {
            resolve(
              {
                success: true,
                msg: "Berhasil mendapatkan Laporan",
                data: res,
              },
              2000
            );
          });
        } else {
          setTimeout(() => {
            resolve({
              success: false,
              msg: "Laporan tidak ditemukan",
              data: null,
            });
          }, 3000);
        }
      })
      .catch(() => {
        setTimeout(() => {
          reject({
            success: false,
            msg: "Gagal mendapatkan data laporan",
            data: {},
          });
        }, 5000);
      });
  });

exports.getById = (id) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      pengaduanModel
        .findById(id)
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
  });

exports.edit = (id, data) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      pengaduanModel
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
    }, 1000);
  });

exports.delete = (id) =>
  new Promise((resolve, reject) => {
    pengaduanModel
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
