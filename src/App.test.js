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

// best effort
test('component renders', () => {
  const { asFragment } = render(<App weatherData={TEST_WEATHER_DATA} />);
  const component  = asFragment();
  // when using snapshots always open the resulting snapshot file
  // and visually check if the render is what you expect it to be!
  expect(component).toMatchSnapshot(); 
});


// you might just check test is in the document
// naive effort
test('renders weather status', () => {
  const { getByText } = render(<App weatherData={TEST_WEATHER_DATA} />);
  const weatherStatus = getByText(/Clear/i);
  expect(weatherStatus).toBeInTheDocument();
});

// manually check each section is rendered correctly
// highly specific tests 
// a lot of effort!
test('renders weather status', () => {
  const { getByTestId } = render(<App weatherData={TEST_WEATHER_DATA} />);
  const date = getByTestId("date-id");
  expect(date).toHaveTextContent("Mon 30th Apr");

  const temperature = getByTestId("temperature-id");
  expect(temperature).toHaveTextContent("11°c");

  const description = getByTestId("description-id");
  expect(description).toHaveTextContent("Clear");
});