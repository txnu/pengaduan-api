const router = require("express").Router();
const beritaController = require("../controllers/beritaController");
const multer = require("multer");
const path = require("path");

router.post("/create", beritaController.create);
router.get("/getall", beritaController.getAll);
router.get("/getbyid/:id", beritaController.getById);
router.put("/update/:id", beritaController.update);
router.delete("/delete/:id", beritaController.delete);

module.exports = router;
