import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, waitForElementToBeRemoved, queryByText } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
  
    await waitForElement(()  => getByText("Monday"))
    fireEvent.click(getByText("Tuesday"))
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview, and reduces the spots remaining for the first day by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    //add a new appointment and save, check
    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Tomi Adeyemi" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, /saving/i)).toBeInTheDocument();

    //wait until Saving disappears then check the student name, edit, delete buttons appear
    await waitForElementToBeRemoved(() => getByText(appointment, /saving/i));

    expect(getByText(appointment, "Tomi Adeyemi")).toBeInTheDocument();
    expect(getByAltText(appointment, "Delete")).toBeInTheDocument();
    expect(getByAltText(appointment, "Edit")).toBeInTheDocument();

    //retrieve day list and check number of spots updated
    const days = getAllByTestId(container, "day");
    const monday = days.find(data => queryByText(data, "Monday"));

    expect(getByText(monday, /no spots remaining/i)).toBeInTheDocument();
  });
});

