const userModel = require("../models/user");
const bcrypt = require("bcrypt");

exports.register = (data) =>
  new Promise((resolve, reject) => {
    userModel
      .findOne({
        email: data.email,
      })
      .then((user) => {
        if (user) {
          reject({
            success: false,
            msg: "Email Telah Terdaftar",
          });
        } else {
          bcrypt.hash(data.password, 10, (err, hash) => {
            data.password = hash;
            userModel
              .create(data)
              .then(() =>
                resolve({
                  success: true,
                  msg: "Berhasil Registrasi",
                })
              )
              .catch(() =>
                reject({
                  success: false,
                  msg: "Gagal Registrasi",
                })
              );
          });
        }
      });
  });

exports.login = (data) =>
  new Promise((resolve, reject) => {
    userModel
      .findOne({
        telepon: data.telepon,
      })
      .then((user) => {
        if (user) {
          if (bcrypt.compareSync(data.password, user.password)) {
            setTimeout(() => {
              resolve({
                success: true,
                msg: "Berhasil Login",
                data: user,
              });
            }, 2000);
          } else {
            setTimeout(() => {
              reject({
                success: false,
                msg: "Password Anda Salah",
              });
            }, 3000);
          }
        } else {
          setTimeout(() => {
            reject({
              success: false,
              msg: "Nomor Hp tidak terdaftar",
            });
          }, 3000);
        }
      });
  });

exports.loginAdmin = (data) =>
  new Promise((resolve, reject) => {
    userModel
      .findOne({
        email: data.email,
      })
      .then((user) => {
        if (user) {
          if (bcrypt.compareSync(data.password, user.password)) {
            setTimeout(() => {
              resolve({
                success: true,
                msg: "Berhasil Login",
                data: user,
              });
            });
          } else {
            setTimeout(() => {
              reject({
                success: false,
                msg: "Password Anda Salah",
              });
            }, 3000);
          }
        } else {
          setTimeout(() => {
            reject({
              success: false,
              msg: "Akses Ditolak",
            });
          }, 3000);
        }
      });
  });

exports.edit = (id, data) =>
  new Promise(async (resolve, reject) => {
    try {
      if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
      } else {
        const existingUser = await userModel.findOne({ _id: id });
        if (existingUser) {
          data.password = existingUser.password;
        } else {
          delete data.password;
        }
      }

      userModel
        .updateOne({ _id: id }, data)
        .then(() =>
          setTimeout(() => {
            resolve({ success: true, msg: "Berhasil Edit Data" });
          }, 2000)
        )
        .catch((err) =>
          setTimeout(() => {
            reject({ success: false, msg: "Gagal Edit Data" });
          }, 3000)
        );
    } catch (err) {
      setTimeout(() => {
        reject({ success: false, msg: err.message });
      }, 5000);
    }
  });

exports.getById = (id) => {
  return new Promise((resolve, reject) => {
    userModel
      .findById(id)
      .then((user) => {
        if (!user) {
          setTimeout(() => {
            return reject({
              success: false,
              msg: "User tidak ditemukan",
              data: {},
            });
          }, 3000);
        }
        setTimeout(() => {
          resolve({
            success: true,
            msg: "Berhasil Mengambil Data",
            data: user,
          });
        }, 2000);
      })
      .catch((err) => {
        setTimeout(() => {
          console.error("Error saat mengambil data user:", err);
          reject({
            success: false,
            msg: "Gagal Mengambil Data",
            data: {},
          });
        }, 5000);
      });
  });
};

exports.getAllUsers = async (req, res) => {
  try {
    let query = {};

    if (req.query.keyword) {
      query = {
        $or: [
          { namalengkap: { $regex: req.query.keyword, $options: "i" } },
          { username: { $regex: req.query.keyword, $options: "i" } },
        ],
      };
    }

    const users = await userModel.find().populate({
      path: "pengaduan",
      select: "idJenisPengaduan kronologi kodeVerfikasi tanggal",
    });

    setTimeout(() => {
      res.status(200).json({
        success: true,
        msg: "Berhasil Mengambil Data",
        data: users,
      });
    }, 2000);
  } catch (err) {
    setTimeout(() => {
      res.status(500).json({
        success: false,
        msg: "Gagal Mengambil Data",
        error: err.message,
      });
    }, 5000);
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const deletedUser = await userModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      setTimeout(() => {
        return res.status(404).json({
          success: false,
          msg: "User not found",
        });
      }, 3000);
    }

    setTimeout(() => {
      res.status(200).json({
        success: true,
        msg: "User deleted successfully",
        data: deletedUser,
      });
    }, 2000);
  } catch (err) {
    setTimeout(() => {
      res.status(500).json({
        success: false,
        msg: "Failed to delete user",
        error: err.message,
      });
    }, 5000);
  }
};
