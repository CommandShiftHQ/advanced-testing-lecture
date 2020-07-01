import React, { useState, useEffect } from "react";
import moment from "moment";
import getForecastData from "./services/getForecast";
import saveMood from "./services/saveMood";
import "./App.css";
import MoodForm from "./MoodForm";

function App() {
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [weatherReport, setWeatherReport] = useState({});

  useEffect(() => {
    const getForecast = async () => {
      try {
        /* BEFORE
        const result = await axios({
          method: "GET",
          url: ` https://mcr-codes-weather.herokuapp.com/forecast`,
        });
        */
        // trick is to pull all your API interactions
        // into separate modules which can be mocked via jest!
        const result = await getForecastData();
        setWeatherReport(result.data.forecasts[0]);
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };
    getForecast();
  }, []);

  const [mood, setMood] = useState("");
  const [isMoodCaptured, setMoodCaptured] = useState(false);

  const handleInputChange = (e) => {
    setMood(e.target.value);
  };

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      await saveMood({ mood });
    } catch (err) {
      setError(true);
    }
    setMoodCaptured(true);
    setLoading(false);
  };

  if (isError) {
    return <div>Sorry, something went wrong. Please refresh the page.</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const displayUmbrellaLink =
    weatherReport.description === "Rainy" && weatherReport.wind.speed >= 30; // 30 km/h

  return (
    <div className="App">
      <div className="date" data-testid="date-id">
        {moment(weatherReport.date).format("ddd Do MMM")}
      </div>
      <div className="temperature" data-testid="temperature-id">
        {weatherReport.temperature.max}&deg;c
      </div>
      <div className="description" data-testid="description-id">
        {weatherReport.description}
      </div>
      {displayUmbrellaLink && (
        <a
          href="https://umbrella.com/wind-resistant"
          data-testid="affiliate-umbrella"
        >
          Why don't you get a sturdy umbrella?
        </a>
      )}
      <br />
      <MoodForm
        isMoodCaptured={isMoodCaptured}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
      />
    </div>
  );
}

export default App;
