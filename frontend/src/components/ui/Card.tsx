import { ReactNode } from "react";

type CardProps = {
  className?: string;
  children: ReactNode;
};

const Card = ({ className, children = "" }: CardProps) => (
  <div
    className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transition-colors ${className}`}
  >
    {children}
  </div>
);

export default Card;
