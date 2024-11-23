const router = require("express").Router();
const jenisPengaduanController = require("../controllers/jenispengaduanController");
const multer = require("multer");
const path = require("path");

router.post("/create", (req, res) => {
  jenisPengaduanController
    .create(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.get("/getall", (req, res) => {
  jenisPengaduanController
    .getData()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.get("/getbyid=:id", jenisPengaduanController.getById);
router.put("/update=:id", jenisPengaduanController.update);
router.delete("/delete=:id", jenisPengaduanController.delete);

module.exports = router;
