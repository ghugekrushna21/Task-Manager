import { useState } from "react";
import { toast } from "react-toastify";
import { Priority, Task } from "../types";
import Button from "./ui/Button";
import Badge from "./ui/Badge";
import { UpdateTaskData } from "../services/taskApi";

const CONFETTI_TIME = 5000;

type TaskItemProps = {
  task: Task;
  updateTask: (id: number, updates: UpdateTaskData) => Promise<any>;
  deleteTask: (id: number) => Promise<void>;
  toggleTask: (id: number) => Promise<void>;
  editedTaskId: number | null;
  setEditedTaskId: React.Dispatch<React.SetStateAction<number | null>>;
  setShowConfetti: React.Dispatch<React.SetStateAction<boolean>>;
};

const TaskItem = ({
  task,
  updateTask,
  deleteTask,
  toggleTask,
  editedTaskId,
  setEditedTaskId,
  setShowConfetti
}: TaskItemProps) => {
  const [editedTaskName, setEditedTaskName] = useState("");
  const [editedTaskPriority, setEditedTaskPriority] = useState<Priority | null>(
    null
  );

  const editTask = (task: Task) => {
    setEditedTaskId(task.id);
    setEditedTaskName(task.name);
    setEditedTaskPriority(task.priority);
  };

  const saveEditedTask = (taskId: number) => {
    if (!editedTaskName.trim()) {
      toast.error("Please enter task name");
      return;
    }
    if (!editedTaskPriority) {
      toast.error("Please select priority");
      return;
    }

    const editedTask: UpdateTaskData = {
      name: editedTaskName,
      priority: editedTaskPriority
    };

    updateTask(taskId, editedTask);
    setEditedTaskId(null);
    setEditedTaskName("");
    setEditedTaskPriority(null);
  };

  const handleDelete = async (taskId: number) => {
    const isConfirmed = confirm(`Delete "${task.name}"?`);
    if (!isConfirmed) return;

    await deleteTask(taskId);
  };

  const handleToggle = async (taskId: number) => {
    if (!task.done) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), CONFETTI_TIME);
    }

    await toggleTask(taskId);
  };

  return (
    <div
      className={`flex justify-between items-center border-2 border-gray-500 dark:border-gray-600 transition-colors rounded-md p-4  ${task.done ? "opacity-40" : ""}`}
    >
      <div className="flex flex-col  animate-pulse gap-3">
        {editedTaskId === task.id ? (
          <>
            <input
              className="p-1 rounded border-2 border-gray-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:border-blue-400 transition-colors"
              type="text"
              value={editedTaskName}
              placeholder="Enter new task name here ..."
              onChange={(event) => setEditedTaskName(event.target.value)}
            />
            <select
              className="p-1 rounded border-2 border-gray-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:border-blue-400 transition-colors"
              value={editedTaskPriority ?? ""}
              onChange={(event) =>
                setEditedTaskPriority(event.target.value as Priority)
              }
            >
              <option value="">-- Edit Priority --</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </>
        ) : (
          <h3
            className={` dark:text-white  ${task.done ? "line-through" : ""}`}
          >
            {task.name}
          </h3>
        )}
        {editedTaskId !== task.id && <Badge priority={task.priority} />}
      </div>

      <div>
        <div className="flex gap-2">
          {editedTaskId === task.id ? (
            <Button onClick={() => saveEditedTask(task.id)}>Save</Button>
          ) : (
            <Button variant="primary" onClick={() => editTask(task)}>
              Edit
            </Button>
          )}
          <Button onClick={() => handleToggle(task.id)}>
            {task.done ? "Undo" : "Done"}
          </Button>
          <Button variant="danger" onClick={() => handleDelete(task.id)}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
