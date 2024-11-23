const router = require("express").Router();
const instansiController = require("../controllers/instansiController");

router.post("/create", instansiController.create);
router.get("/getall", instansiController.getall);
router.get("/getbyid=:id", instansiController.getbyid);

module.exports = router;
