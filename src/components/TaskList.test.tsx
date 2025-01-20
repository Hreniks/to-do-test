import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../store/tasksSlice";
import TaskList from "./TaskList";
import { Task } from "@/store/tasksSlice";

const renderWithProviders = (
  ui: React.ReactElement,
  { initialState }: { initialState: { tasks: Task[] } }
) => {
  const store = configureStore({
    reducer: { tasks: tasksReducer },
    preloadedState: { tasks: { tasks: initialState.tasks } },
  });

  return render(<Provider store={store}>{ui}</Provider>);
};

describe("TaskList component", () => {
  const initialTasks = [
    { id: 1, text: "Task 1", completed: false },
    { id: 2, text: "Task 2", completed: true },
    { id: 3, text: "Task 3", completed: false },
  ];

  it("should display all tasks", () => {
    renderWithProviders(<TaskList filter="all" />, {
      initialState: { tasks: initialTasks },
    });

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
    expect(screen.getByText("Task 3")).toBeInTheDocument();
  });

  it("should display only incomplete tasks", () => {
    renderWithProviders(<TaskList filter="incomplete" />, {
      initialState: { tasks: initialTasks },
    });

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 3")).toBeInTheDocument();
    expect(screen.queryByText("Task 2")).not.toBeInTheDocument();
  });

  it("should display only completed tasks", () => {
    renderWithProviders(<TaskList filter="completed" />, {
      initialState: { tasks: initialTasks },
    });

    expect(screen.getByText("Task 2")).toBeInTheDocument();
    expect(screen.queryByText("Task 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Task 3")).not.toBeInTheDocument();
  });
});
