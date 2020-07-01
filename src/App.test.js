import React from 'react';
import { render, getByTestId } from '@testing-library/react';
import App from './App';

const TEST_WEATHER_DATA = {
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

// tests from step 1 have been reducted to keep this example simple
// in real-life you would keep those tests and add these new ones on top!
test('renders umbrella affliate link when weather conditions are right', () => {
  const RAINY_DAY_WITH_STRONG_WIND = {
    date: 1525046400000,
    temperature: {
      max: 11,
      min: 4,
    },
    wind: {
      speed: 35,
      direction: "s",
    },
    humidity: 30,
    description: "Rainy",
    icon: "800",
  };
  const { getByTestId } = render(<App weatherData={RAINY_DAY_WITH_STRONG_WIND} />);
  const description = getByTestId("affiliate-umbrella");
  expect(description).toHaveTextContent("Why don't you get a sturdy umbrella?");
});

test('doesnt render umbrella affliate link when weather is sunny', () => {
  const SUNNY_DAY = {
    date: 1525046400000,
    temperature: {
      max: 11,
      min: 4,
    },
    wind: {
      speed: 35,
      direction: "s",
    },
    humidity: 30,
    description: "Sunny",
    icon: "800",
  };
  const { queryByTestId } = render(<App weatherData={SUNNY_DAY} />);
  // why are we using query by?
  // The standard getBy methods throw an error when they can't find an element, 
  // so if you want to make an assertion that an element is not present in the DOM, 
  // see: https://stackoverflow.com/a/52783201

  const description = queryByTestId("affiliate-umbrella");
  expect(description).not.toBeInTheDocument();
});