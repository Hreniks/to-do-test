import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../store/tasksSlice";
import { Task } from "@/store/tasksSlice";
import { TextField, Button } from "@mui/material";

const AddTaskComponent: React.FC = () => {
  const [taskText, setTaskText] = useState("");
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (taskText.trim()) {
      const newTask: Task = {
        id: Date.now(),
        text: taskText,
        completed: false,
      };
      dispatch(addTask(newTask));
      setTaskText("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  return (
    <div>
      <TextField
        label="New Task"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        onKeyDown={handleKeyDown}
        sx={{ display: "flex", gap: 2, mb: 2 }}
      />
      <Button onClick={handleAddTask} variant="contained" color="primary">
        Add Task
      </Button>
    </div>
  );
};

export default AddTaskComponent;
