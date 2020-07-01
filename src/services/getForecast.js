import axios from "axios";

const getForecastData = async () => {
  const response = await axios({
    method: "GET",
    url: ` https://mcr-codes-weather.herokuapp.com/forecast`,
  });
  return response;
};

export default getForecastData;
