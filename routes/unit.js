const router = require("express").Router();
const unitController = require("../controllers/unitController");

router.post("/create", (req, res) => {
  unitController
    .create(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.put("/edit=:id", (req, res) => {
  let data = req.body;
  console.log(data);
  unitController
    .edit(req.params.id, data)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.get("/getall", (req, res) => {
  unitController
    .getData()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.get("/getbyid=:id", (req, res) => {
  console.log(req.params.id);
  unitController
    .getById(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.delete("/hapus=:id", (req, res) => {
  unitController
    .delete(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

module.exports = router;
