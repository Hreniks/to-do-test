import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { addTask, toggleTaskCompletion, deleteTask } from "../store/tasksSlice";
import { Task } from "@/store/tasksSlice";

type UseTasks = {
  tasks: Task[];
  addTask: (task: Task) => void;
  toggleTaskCompletion: (id: number) => void;
  deleteTask: (id: number) => void;
};

const useTasks = (): UseTasks => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();

  const handleAddTask = (task: Task) => {
    dispatch(addTask(task));
  };

  const handleToggleTaskCompletion = (id: number) => {
    dispatch(toggleTaskCompletion(id));
  };

  const handleDeleteTask = (id: number) => {
    dispatch(deleteTask(id));
  };

  return {
    tasks,
    addTask: handleAddTask,
    toggleTaskCompletion: handleToggleTaskCompletion,
    deleteTask: handleDeleteTask,
  };
};

export default useTasks;
