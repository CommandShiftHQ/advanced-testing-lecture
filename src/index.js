import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const weatherData = {
  date: 1525046400000,
  temperature: {
    max: 11,
    min: 4,
  },
  wind: {
    speed: 13,
    direction: "s",
  },
  humidity: 30,
  description: "Clear",
  icon: "800",
};

ReactDOM.render(
  <React.StrictMode>
    <App weatherData={weatherData} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
