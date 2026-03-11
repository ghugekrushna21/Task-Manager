import { Task, Priority } from "../types";
import api from "./api";

export type NewTaskData = {
  name: string;
  priority: Priority;
};

export type UpdateTaskData = {
  name?: string;
  priority?: Priority;
  done?: boolean;
};

export const TaskApi = {
  getAllTasks: async () => {
    const { data } = await api.get<Task[]>("/tasks");
    return data;
  },

  getTask: async (id: number) => {
    const { data } = await api.get<Task>(`/tasks/${id}`);
    return data;
  },

  createTask: async (taskData: NewTaskData) => {
    const { data } = await api.post<Task>("/tasks", taskData);
    return data;
  },

  updateTask: async (id: number, updatedTask: UpdateTaskData) => {
    const { data } = await api.put<Task>(`/tasks/${id}`, updatedTask);
    return data;
  },

  deleteTask: async (id: number) => {
    await api.delete(`/tasks/${id}`);
  }
};
