type StatProps = {
  value: number;
  label: string;
};

const Stat = ({ value, label }: StatProps) => {
  return (
    <div className="flex shadow-lg flex-col items-center bg-white dark:bg-gray-800 rounded-xl px-16 py-12 transition-colors">
      <span className="text-bold text-blue-400 text-3xl dark:text-blue:300">
        {value}
      </span>
      <span className="dark:text-white">{label}</span>
    </div>
  );
};

export default Stat;
