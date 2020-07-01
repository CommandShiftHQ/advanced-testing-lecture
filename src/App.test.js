import React from "react";
import { render, wait } from "@testing-library/react";
import App from "./App";

/* set up jest mock */
import getForecastData from "./services/getForecast";
jest.mock("./services/getForecast");

describe("App", () => {
  beforeEach(() => {
    // set the test api response
    getForecastData.mockResolvedValue({
      data: {
        location: { city: "Manchester", country: "GB" },
        forecasts: [
          {
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
          },
        ],
      },
    });
  });

  test("component shows loading screen", async () => {
    // api never resolves, it keeps in "pending" state
    getForecastData.mockReturnValue(new Promise(() => {}));
    const { asFragment } = render(<App />); 
    const component = asFragment();
    expect(component).toMatchSnapshot();
  });

  test("component renders", async () => {
    const { asFragment, getByText } = render(<App />);
    // pay attention to the line below, we're waiting for ASYNC API call to resolve
    // then we continue with our assertions/expections...
    await wait(() => expect(getByText("Clear")).toBeInTheDocument());
    const component = asFragment();
    expect(component).toMatchSnapshot();
  });

  test("component shows error screen", async () => {
    // api rejects with an error
    getForecastData.mockResolvedValue(Promise.reject("FAILED"));
    const { asFragment, getByText } = render(<App />); 
    await wait(() => expect(getByText(/wrong/i)).toBeInTheDocument());
    const component = asFragment();
    expect(component).toMatchSnapshot();
  });

  // we need to change the api response to be rainy and windy!
  test("renders umbrella affliate link when weather conditions are right", async () => {
    getForecastData.mockResolvedValue({
      data: {
        location: { city: "Manchester", country: "GB" },
        forecasts: [
          {
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
          },
        ],
      },
    })
    const { getByTestId, getByText } = render(<App />);
    await wait(() => expect(getByText("Rainy")).toBeInTheDocument());
    const description = getByTestId("affiliate-umbrella");
    expect(description).toHaveTextContent(
      "Why don't you get a sturdy umbrella?"
    );
  });

  test("doesnt render umbrella affliate link when weather is sunny", async () => {
    const { queryByTestId, getByText } = render(<App />);
    await wait(() => expect(getByText("Clear")).toBeInTheDocument());

    // why are we using query by?
    // The standard getBy methods throw an error when they can't find an element,
    // so if you want to make an assertion that an element is not present in the DOM,
    // see: https://stackoverflow.com/a/52783201
    const description = queryByTestId("affiliate-umbrella");
    expect(description).not.toBeInTheDocument();
  });
});
