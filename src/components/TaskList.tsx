import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { toggleTaskCompletion, deleteTask } from "../store/tasksSlice";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  Slide,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const TaskList: React.FC<{ filter: "all" | "incomplete" | "completed" }> = ({
  filter,
}) => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();
  const [deletedTaskIds, setDeletedTaskIds] = useState<number[]>([]);

  const handleToggleTaskCompletion = (id: number) => {
    dispatch(toggleTaskCompletion(id));
  };

  const handleDeleteTask = (id: number) => {
    setDeletedTaskIds((prev) => [...prev, id]);
    setTimeout(() => {
      dispatch(deleteTask(id));
    }, 300);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "incomplete") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <List>
      {filteredTasks.map((task) => (
        <Slide
          direction="left"
          key={task.id}
          in={!deletedTaskIds.includes(task.id)}
          timeout={300}
        >
          <ListItem
            sx={{ cursor: "pointer" }}
            onClick={() => handleToggleTaskCompletion(task.id)}
          >
            <Checkbox
              edge="start"
              checked={task.completed}
              onChange={() => handleToggleTaskCompletion(task.id)}
              onClick={(e) => e.stopPropagation()}
            />
            <ListItemText
              primary={task.text}
              sx={{ textDecoration: task.completed ? "line-through" : "none" }}
              onClick={(e) => {
                e.stopPropagation();
                handleToggleTaskCompletion(task.id);
              }}
            />
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteTask(task.id);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        </Slide>
      ))}
    </List>
  );
};

export default TaskList;
