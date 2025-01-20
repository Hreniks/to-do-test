import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TabsComponent from "./TabsComponent";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../store/tasksSlice";

const initialTasks = [
  { id: 1, text: "Task 1", completed: false },
  { id: 2, text: "Task 2", completed: true },
  { id: 3, text: "Task 3", completed: false },
];

const renderWithProviders = (ui: React.ReactElement) => {
  const store = configureStore({
    reducer: { tasks: tasksReducer },
    preloadedState: {
      tasks: {
        tasks: initialTasks,
      },
    },
  });

  return render(<Provider store={store}>{ui}</Provider>);
};

describe("TabsComponent", () => {
  it("renders and switches between tabs", () => {
    renderWithProviders(<TabsComponent />);

    // Check that all tab labels are present
    expect(screen.getByRole("tab", { name: /all tasks/i })).toBeInTheDocument();
    expect(
      screen.getByRole("tab", { name: /incomplete tasks/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("tab", { name: /completed tasks/i })
    ).toBeInTheDocument();

    // Check initial content of the first tab
    expect(screen.getByRole("tabpanel", { hidden: false })).toContainElement(
      screen.getByText(/task 1/i)
    );
    expect(screen.getByRole("tabpanel", { hidden: false })).toContainElement(
      screen.getByText(/task 2/i)
    );
    expect(screen.getByRole("tabpanel", { hidden: false })).toContainElement(
      screen.getByText(/task 3/i)
    );

    // Switch to Incomplete Tasks tab
    fireEvent.click(screen.getByRole("tab", { name: /incomplete tasks/i }));
    expect(screen.getByRole("tabpanel", { hidden: false })).toContainElement(
      screen.getByText(/task 1/i)
    );
    expect(screen.getByRole("tabpanel", { hidden: false })).toContainElement(
      screen.getByText(/task 3/i)
    );
    expect(screen.queryByText(/task 2/i)).not.toBeInTheDocument();

    // Switch to Completed Tasks tab
    fireEvent.click(screen.getByRole("tab", { name: /completed tasks/i }));
    expect(screen.getByRole("tabpanel", { hidden: false })).toContainElement(
      screen.getByText(/task 2/i)
    );
    expect(screen.queryByText(/task 1/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/task 3/i)).not.toBeInTheDocument();

    // Switch back to All Tasks tab
    fireEvent.click(screen.getByRole("tab", { name: /all tasks/i }));
    expect(screen.getByRole("tabpanel", { hidden: false })).toContainElement(
      screen.getByText(/task 1/i)
    );
    expect(screen.getByRole("tabpanel", { hidden: false })).toContainElement(
      screen.getByText(/task 2/i)
    );
    expect(screen.getByRole("tabpanel", { hidden: false })).toContainElement(
      screen.getByText(/task 3/i)
    );
  });
});
