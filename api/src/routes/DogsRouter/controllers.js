const axios = require("axios");
const { API_KEY } = process.env;
const { Dog, Temperament } = require("../../db.js").default;

module.exports = {
  getDogs: async (name) => {
    dogsApi = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=live_ESty7RNXMc6hELCB8lyIIjKevRlEqlxO6o2dpn7sGZQ1ao2ydN4gMhEYz55Yz3yq`
    );
    dogsApi = dogsApi.data.map((d) => {
      let dog = {
        id: d.id,
        breed: d.name,
        ["years of life"]: d.life_span,
        temperament: d.temperament,
        image: d.image.url,
        weight: d.weight.metric,
        height: d.height.metric,
      };
      return dog;
    });

    let dogsBd = await Dog.findAll({
      include: [
        {
          model: Temperament,
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
    });

    dogsBd = dogsBd.map((d) => {
      let dog = {
        id: d.idDog,
        breed: d.Breed,
        weight: d.Weight,
        height: d.Height,
        ["years of life"]: d["Years of life"],
        temperament: d.Temperaments.map((x) => x.name).join(", "),
        image: d.Image,
      };
      return dog;
    });

    let allDogs = [...dogsApi, ...dogsBd];

    //--------------------------------------------------------
    if (name) {
      const dogsFilter = allDogs.filter((dog) =>
        dog.breed.toLowerCase().includes(name.toLowerCase())
      );

      if (!dogsFilter[0]) throw new Error("La raza que buscas no existe");

      return dogsFilter;
    }

    return allDogs;
  },

  detailDog: async (id, getDogs) => {
    const dogEncontrado = (await getDogs()).find((dog) => dog.id == id);
    if (!dogEncontrado) throw new Error("Dog no econtrado");
    return dogEncontrado;
  },

  createDog: async (
    image,
    breed,
    temperaments,
    height,
    weight,
    years,
    getDogs
  ) => {
    if (!breed || !weight || !height || !years)
      throw new Error("Faltan campos sin llenar");

    let idMax = Math.max(...(await getDogs()).map((dog) => dog.id));

    Math.max(...(await getDogs()).map((dog) => dog.id));

    let breedCorrect =
      breed.charAt(0).toUpperCase() + breed.slice(1).toLowerCase();

    const newDog = await Dog.create({
      idDog: ++idMax,
      Breed: breedCorrect,
      Weight: weight,
      Height: height,
      ["Years of life"]: years,
      Image: image,
    });

    const temperament = await Temperament.findAll({
      where: { name: temperaments },
    });

    newDog.addTemperament(temperament);

    return newDog;
  },

  deleteDog: async (req, res) => {
    const { id } = req.params;
    console.log(id, "delete");

    try {
      await Dog.destroy({
        where: {
          idDog: id,
        },
      });
      res.status(200).send("dog borrado");
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
