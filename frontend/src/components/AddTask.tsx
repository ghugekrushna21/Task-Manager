import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useRef } from "react";
import { Priority } from "../types";
import Button from "./ui/Button";
import Card from "./ui/Card";
import { NewTaskData } from "../services/taskApi";

type AddTaskProps = {
  onSubmit: (task: NewTaskData) => void;
};

const AddTask = ({ onSubmit }: AddTaskProps) => {
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState<Priority | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const addNewTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (taskName.trim() === "") {
      toast.error("Please Enter Task Name.");
      return;
    }
    if (priority!.trim() === "") {
      toast.error("Please Select Priority.");
      return;
    }
    if (priority) {
      const newTask: NewTaskData = {
        name: taskName,
        priority
      };

      onSubmit(newTask);
      toast.success("Task added successfully.");
    }
    setPriority(null);
    setTaskName("");
    inputRef.current?.focus();
  };

  return (
    <Card className="mb-6 ">
      <h2 className="text-xl font-bold mb-3 text-white">Add new tasks</h2>
      <form className="flex gap-2" onSubmit={addNewTask}>
        <input
          className="flex-1 p-2 border-2 rounded border-gray-300  focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:border-blue-400 transition-colors"
          ref={inputRef}
          type="text"
          placeholder="Enter task here ..."
          required
          value={taskName}
          onChange={(event) => setTaskName(event.target.value)}
        />
        <select
          className="border-2 p-2 rounded border-gray-300 focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:border-blue-400 transition-colors"
          value={priority ?? ""}
          onChange={(event) => setPriority(event.target.value as Priority)}
        >
          <option value="">-- Select Priority --</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <Button variant="primary" type="submit">
          Add task
        </Button>
      </form>
    </Card>
  );
};
export default AddTask;
