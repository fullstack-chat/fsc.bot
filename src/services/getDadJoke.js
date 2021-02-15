const axios = require("axios");

exports.getDadJoke = async (req, res) => {
  try {
    let response = await axios({
      method: "get",
      url: "https://icanhazdadjoke.com/",
      headers: {
        Accept: "application/json",
      },
    });

    return response.data.joke;
  } catch (error) {
    console.log(error);
    return "Oops, I couldn't find a joke for you";
  }
};
