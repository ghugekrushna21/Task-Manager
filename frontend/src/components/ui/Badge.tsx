import { Priority } from "../../types";

const PRIORITY_BADGE_CLASS_NAME = {
  low: "bg-green-50 text-green-500 dark:bg-green-900/20 dark:text-green-400",
  medium:
    "bg-yellow-50 text-yellow-500 dark:bg-yellow-900/20 dark:text-yellow-400",
  high: "bg-red-50 text-red-500 dark:bg-red-900/20 dark:text-red-400"
};

type BadgeProps = { priority: Priority };

const Badge = ({ priority }: BadgeProps) => (
  <span
    className={`p-1 max-w-fit rounded ${PRIORITY_BADGE_CLASS_NAME[priority]}`}
  >
    {priority.charAt(0).toUpperCase() + priority.slice(1)}
  </span>
);

export default Badge;
