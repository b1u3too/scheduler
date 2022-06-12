import React from "react";

import {
  cleanup,
  fireEvent,
  getAllByTestId,
  getByAltText,
  getByDisplayValue,
  getByPlaceholderText,
  getByText,
  queryByAltText,
  queryByText,
  render,
  waitForElement,
  waitForElementToBeRemoved,
} from "@testing-library/react";

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
    const day = days.find(data => queryByText(data, "Monday"));

    expect(getByText(day, /no spots remaining/i)).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    //find appointment and click Delete
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments.find(data => queryByText(data, "Archie Cohen"));
    fireEvent.click(getByAltText(appointment, "Delete"));

    //check and use delete confirmation dialogue
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();
    fireEvent.click(getByText(appointment, "Confirm"));
    expect(getByText(appointment, /deleting/i)).toBeInTheDocument();

    //after deleting status finished, check new add button present
    await waitForElementToBeRemoved(() => getByText(appointment, /deleting/i));
    expect(queryByAltText(appointment, /add/i)).toBeInTheDocument();

    //check that day counter updated appropriately (dec 1)
    const days = getAllByTestId(container, "day");
    const day = days.find(data => queryByText(data, "Monday"));
    expect(getByText(day, /2 spots remaining/i)).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    //wait until page fully renders
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));

    //get a non-empty appointment and click Edit
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments.find(data => queryByText(data, "Archie Cohen"));
    fireEvent.click(getByAltText(appointment, "Edit"));

    //check that the form is pre-populated with name and interviewer
    expect(getByDisplayValue(appointment, "Archie Cohen")).toBeInTheDocument();
    expect(getByText(appointment, "Tori Malcolm")).toBeInTheDocument();

    //change the name and interviewer and save
    fireEvent.change(getByDisplayValue(appointment, "Archie Cohen"), {
      target: { value: "Ursula K. LeGuin" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, /save/i));

    //check that saving dial appears, wait until it goes away to move on
    expect(getByText(appointment, /saving/i)).toBeInTheDocument();
    await waitForElementToBeRemoved(() => getByText(appointment, /saving/i));

    //check that name and interviewer are updated
    expect(getByText(appointment, "Ursula K. LeGuin")).toBeInTheDocument();
    expect(getByText(appointment, "Sylvia Palmer")).toBeInTheDocument();

    //check that counter has stayed the same
    const days = getAllByTestId(container, "day");
    const day = days.find(data => queryByText(data, "Monday"));
    expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument();
  });
});

