import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { toggleTaskCompletion, deleteTask } from "../store/tasksSlice";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface TaskListProps {
  filter: "all" | "incomplete" | "completed";
}

const TaskList: React.FC<TaskListProps> = ({ filter }) => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();

  const filteredTasks = tasks.filter((task) => {
    if (filter === "incomplete") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const handleToggle = (id: number) => {
    dispatch(toggleTaskCompletion(id));
  };

  const handleDelete = (id: number) => {
    dispatch(deleteTask(id));
  };

  return (
    <List>
      {filteredTasks.map((task) => (
        <ListItem
          key={task.id}
          secondaryAction={
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => handleDelete(task.id)}
            >
              <DeleteIcon />
            </IconButton>
          }
        >
          <Checkbox
            edge="start"
            checked={task.completed}
            onChange={() => handleToggle(task.id)}
          />
          <ListItemText
            primary={task.text}
            sx={{ textDecoration: task.completed ? "line-through" : "none" }}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;
