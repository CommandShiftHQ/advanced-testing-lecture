import React from "react";
import { render, fireEvent } from "@testing-library/react";
import MoodForm from "./MoodForm";

test("it renders", () => {
  const mockHandleInputChange = jest.fn();
  const mockHandleSubmit = jest.fn();

  const { asFragment } = render(
    <MoodForm
      isMoodCaptured={false}
      handleInputChange={mockHandleInputChange}
      handleSubmit={mockHandleSubmit}
    />
  );

  expect(asFragment()).toMatchSnapshot();

  /*

  const textbox = getByRole("textbox");
  const button = getByRole("button", { name: /submit/i });

  fireEvent.change(textbox, {
    target: { value: "feeling great!" },
  });
  // fireEvent.click(button);
  expect(textbox.value).toBe("feeling great!");
  await wait(() => {
    expect(saveMood).toHaveBeenCalledTimes(1);
    expect(saveMood).toHaveBeenCalledWith({
      mood: "feeling great!",
    });
  });
  */
});

test("it renders success when user submitted the form", () => {
  const mockHandleInputChange = jest.fn();
  const mockHandleSubmit = jest.fn();

  const { asFragment } = render(
    <MoodForm
      isMoodCaptured={true}
      handleInputChange={mockHandleInputChange}
      handleSubmit={mockHandleSubmit}
    />
  );

  expect(asFragment()).toMatchSnapshot();
});

test("it submits the form data and call handle submit function", () => {
  const mockHandleInputChange = jest.fn();
  const mockHandleSubmit = jest.fn();

  const {  getByTestId } = render(
    <MoodForm
      isMoodCaptured={false}
      handleInputChange={mockHandleInputChange}
      handleSubmit={mockHandleSubmit}
    />
  );

  const form = getByTestId("form");
  fireEvent.submit(form);
  expect(mockHandleSubmit).toHaveBeenCalled();
});
