import prisma from "../config/prisma";
import { Priority, UpdateTaskPayload, CreateTaskPayload, Task } from "../types";

export const createTask = async (
  taskData: CreateTaskPayload,
  userId: number
): Promise<Task> =>
  await prisma.task.create({
    data: { ...taskData, userId }
  });

export const getAllTasksByUserId = async (userId: number): Promise<Task[]> =>
  await prisma.task.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" }
  });

export const getTaskById = async (
  id: number,
  userId: number
): Promise<Task | null> =>
  await prisma.task.findFirst({ where: { id, userId } });

export const updateTask = async (
  id: number,
  userId: number,
  data: UpdateTaskPayload
) => {
  try {
    return await prisma.task.update({
      where: { id, userId },
      data
    });
  } catch {
    return null;
  }
};

export const deleteTask = async (id: number, userId: number) => {
  try {
    await prisma.task.delete({ where: { id, userId } });
    return true;
  } catch {
    return false;
  }
};

export const toggleTask = async (id: number) => {
  const task = await prisma.task.findUnique({ where: { id } });
  if (!task) return null;

  return prisma.task.update({
    where: { id },
    data: { done: !task.done }
  });
};

export const taskStats = async () => {
  const total = await prisma.task.count();
  const done = await prisma.task.count({ where: { done: true } });
  const active = total - done;

  return {
    total,
    active,
    done
  };
};

export const getSortedTasks = async (
  sortBy: "priority" | "createdAt" = "createdAt",
  order: "asc" | "desc" = "asc"
) => {
  return prisma.task.findMany({
    orderBy: {
      [sortBy]: order
    }
  });
};

export const searchTask = async (query: string) => {
  return prisma.task.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive"
      }
    }
  });
};

export const filteredTasksByPriority = async (priority: Priority) => {
  return prisma.task.findMany({
    where: { priority }
  });
};

export const filterTaskByCompletionStatus = async (done: boolean) => {
  return prisma.task.findMany({
    where: { done }
  });
};

export const taskPagination = async (page: number, limit: number) => {
  return prisma.task.findMany({
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { createdAt: "desc" }
  });
};
