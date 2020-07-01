import React from "react";
import moment from "moment";
import "./App.css";

function App(props) {
  const weatherReportForToday = props.weatherData;

  const displayUmbrellaLink =
    props.weatherData.description === "Rainy" &&
    props.weatherData.wind.speed >= 30; // 30 km/h

  return (
    <div className="App">
      <div className="date" data-testid="date-id">
        {moment(weatherReportForToday.date).format("ddd Do MMM")}
      </div>
      <div className="temperature" data-testid="temperature-id">
        {weatherReportForToday.temperature.max}&deg;c
      </div>
      <div className="description" data-testid="description-id">
        {weatherReportForToday.description}
      </div>
      {displayUmbrellaLink && (
        <a href="https://umbrella.com/wind-resistant" data-testid="affiliate-umbrella">
          Why don't you get a sturdy umbrella?
        </a>
      )}
    </div>
  );
}

export default App;
