import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />); //this will create the virtual dom for the argument
  const linkElement = screen.getByText(/learn react/i); //screen provide the access to the virtual dom here learn
  //react will search in app.js file
  // 'learn react' can be regular expression ,case insensitive(i) could be string
  expect(linkElement).toBeInTheDocument(); //this wll indicate whether the test is pass or fail
});
