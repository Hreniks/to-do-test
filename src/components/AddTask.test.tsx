import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../store/tasksSlice";
import AddTask from "./AddTask";
import TaskList from "./TaskList";

const renderWithProviders = (ui: React.ReactElement) => {
  const store = configureStore({
    reducer: { tasks: tasksReducer },
  });

  return render(<Provider store={store}>{ui}</Provider>);
};

describe("AddTask component", () => {
  it("should add a task", () => {
    renderWithProviders(
      <>
        <AddTask />
        <TaskList filter="all" />
      </>
    );

    const input = screen.getByLabelText(/new task/i);
    const button = screen.getByRole("button", { name: /add task/i });

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(button);

    expect(input).toHaveValue("");

    const taskListItems = screen.getAllByRole("listitem");
    const newTaskItem = taskListItems.find(
      (item) => item.textContent === "New Task"
    );
    expect(newTaskItem).toBeInTheDocument();
  });
});
