import { useCallback, useEffect, useState } from "react";
import { Task } from "../types";
import { NewTaskData, TaskApi, UpdateTaskData } from "../services/taskApi";

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await TaskApi.getAllTasks();
      setTasks(data);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to fetch tasks";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = useCallback(async (taskData: NewTaskData) => {
    try {
      setError(null);

      const newTask = await TaskApi.createTask(taskData);
      setTasks((prev) => [...prev, newTask]);

      return newTask;
    } catch (e) {
      setError("Failed to create task");
      throw e;
    }
  }, []);

  const updateTask = useCallback(
    async (id: number, updates: UpdateTaskData) => {
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
      );

      try {
        setError(null);
        const updatedTask = await TaskApi.updateTask(id, updates);
        setTasks((prev) =>
          prev.map((task) => (task.id === id ? updatedTask : task))
        );

        return updatedTask;
      } catch (e) {
        await fetchTasks();
        setError("Failed to update task");
        throw e;
      }
    },
    [fetchTasks]
  );

  const deleteTask = useCallback(
    async (id: number) => {
      const previousTasks = [...tasks];

      setTasks((prev) => prev.filter((task) => task.id !== id));

      try {
        setError(null);

        await TaskApi.deleteTask(id);
      } catch (e) {
        setTasks(previousTasks);

        setError("Failed to delete task");
        throw e;
      }
    },
    [tasks]
  );

  const toggleTask = useCallback(
    async (id: number) => {
      const task = tasks.find((task) => task.id === id);
      if (!task) return;

      await updateTask(id, { done: !task.done });
    },
    [tasks, updateTask]
  );

  return {
    tasks,
    loading,
    error,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    refetch: fetchTasks
  };
};

export default useTasks;
