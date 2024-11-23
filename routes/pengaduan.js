const router = require("express").Router();
const pengaduanController = require("../controllers/pengaduanController");

router.post("/create", (req, res) => {
  pengaduanController
    .create(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.put("/edit/:id", (req, res) => {
  let data = req.body;
  console.log(data);
  pengaduanController
    .edit(req.params.id, data)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.get("/getall", (req, res) => {
  pengaduanController
    .getData()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.get("/getbynomorlaporan=:nomorLaporan", (req, res) => {
  console.log(`Received request for nomorLaporan: ${req.params.nomorLaporan}`);
  pengaduanController
    .getByNomorLaporan(req.params.nomorLaporan)
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json(err));
});

router.get("/getbyid/:id", (req, res) => {
  console.log(req.params.id);
  pengaduanController
    .getById(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.delete("/delete/:id", (req, res) => {
  pengaduanController
    .delete(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

module.exports = router;
