import { SetStateAction, useState } from "react";

import "react-toastify/dist/ReactToastify.css";

import TaskItem from "./TaskItem.js";
import { TabName, Task } from "../types/index";
import { UpdateTaskData } from "../services/taskApi.js";
import LoadingSpinner from "./ui/LoadingSpinner.js";

type TaskListProps = {
  tasks: Task[];
  loading: boolean;
  updateTask: (id: number, updates: UpdateTaskData) => Promise<Task>;
  deleteTask: (id: number) => Promise<void>;
  toggleTask: (id: number) => Promise<void>;
  activeTab: TabName;
  setShowConfetti: React.Dispatch<SetStateAction<boolean>>;
  searchText: string;
  sortedTasks: Task[];
};

const TaskList = ({
  tasks,
  loading,
  updateTask,
  deleteTask,
  toggleTask,
  activeTab,
  setShowConfetti,
  searchText,
  sortedTasks
}: TaskListProps) => {
  const [editedTaskId, setEditedTaskId] = useState<number | null>(null);

  const filteredTasks = () => {
    if (activeTab === "sort") return sortedTasks;

    if (activeTab === "search") {
      if (searchText.trim() === "") return [];

      return tasks.filter((task) =>
        task.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (activeTab === "active") return tasks.filter((task) => !task.done);
    if (activeTab === "done") return tasks.filter((task) => task.done);

    return tasks;
  };

  const visibleTasks = filteredTasks();

  return (
    <>
      {loading ? (
        <LoadingSpinner message="Loading tasks..." />
      ) : visibleTasks.length > 0 ? (
        <div className="flex flex-col gap-3">
          {visibleTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              updateTask={updateTask}
              deleteTask={deleteTask}
              toggleTask={toggleTask}
              editedTaskId={editedTaskId}
              setEditedTaskId={setEditedTaskId}
              setShowConfetti={setShowConfetti}
            />
          ))}
        </div>
      ) : activeTab === "search" ? (
        <div className="text-gray-400 dark:text-gray-600 text-center">
          <p>No tasks found for your query!</p>
        </div>
      ) : (
        <div className="text-gray-400 dark:text-gray-500 text-center">
          <p>No task yet.</p>
        </div>
      )}
    </>
  );
};

export default TaskList;
