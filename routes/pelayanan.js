const router = require("express").Router();
const pelayananController = require("../controllers/pelayananController");

router.post("/create", (req, res) => {
  pelayananController
    .create(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.put("/edit=:id", (req, res) => {
  const data = req.body;
  console.log(data);
  pelayananController
    .edit(req.params.id, data)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.get("/getall", (req, res) => {
  pelayananController
    .getData()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.get("/getbyid=:id", (req, res) => {
  console.log(req.params.id);
  pelayananController
    .getById(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.delete("/delete=:id", (req, res) => {
  pelayananController
    .delete(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

module.exports = router;
