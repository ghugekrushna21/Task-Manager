import { Task } from "../types";
import Stat from "./ui/Stat";

const TaskStats = ({ tasks }: { tasks: Task[] }) => {
  const safeTasks = Array.isArray(tasks) ? tasks : [];

  const totalTask = safeTasks.length;
  const completedTask = safeTasks.filter((t) => t.done).length;
  const activeTask = totalTask - completedTask;

  return (
    <section className="flex mb-6 justify-between">
      <Stat value={totalTask} label="TOTAL" />
      <Stat value={activeTask} label="ACTIVE" />
      <Stat value={completedTask} label="DONE" />
    </section>
  );
};

export default TaskStats;
