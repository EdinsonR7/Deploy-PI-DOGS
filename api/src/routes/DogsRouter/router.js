const { Router } = require("express");
const router = Router();
const {
  getDogs,
  detailDog,
  createDog,
  deleteDog,
} = require("./controllers.js");

router.get("/", async (req, res) => {
  const { name } = req.query;
  console.log({ name }, "esto es una prueba");
  try {
    const dogs = await getDogs(name);
    res.status(200).json(dogs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const dogId = await detailDog(id, getDogs);
    res.status(200).json(dogId);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.post("/", async (req, res) => {
  const { image, breed, temperaments, height, weight, years } = req.body;

  try {
    let newDog = await createDog(
      image,
      breed,
      temperaments,
      height,
      weight,
      years,
      getDogs
    );
    if (newDog) res.send("Dog Creado");
  } catch (error) {
    res.send(error.message);
  }
});

router.delete("/:id", deleteDog);

module.exports = router;
