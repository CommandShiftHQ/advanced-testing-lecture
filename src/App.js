import React from "react";
import moment from "moment";
import "./App.css";

function App(props) {
  const weatherReportForToday = props.weatherData;

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
    </div>
  );
}

export default App;
