const { API_KEY } = process.env;
const axios = require("axios");
const { Dog, Temperament } = require("../../db.js");

module.exports = {
  getTemperaments: async () => {
    let dogsApi = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
    );
    let temperaments = dogsApi.data.map((t) => t.temperament);

    const temperamensNoRepetir = [
      ...new Set(temperaments.join(", ").replace(/ /g, "").split(",")),
    ].filter((t) => t !== "");

    for (let i = 0; i < temperamensNoRepetir.length; i++) {
      await Temperament.findOrCreate({
        where: { name: temperamensNoRepetir[i] },
      });
    }

    return Temperament.findAll();
  },
};
