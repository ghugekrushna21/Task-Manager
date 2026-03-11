import { SortOrder, TabName } from "../types";

type TabButtonProps = {
  activeTab: TabName;
  setActiveTab: React.Dispatch<React.SetStateAction<TabName>>;
  sortOrder: SortOrder;
  toggleSortOrder: () => void;
};

const TabButton = ({
  activeTab,
  setActiveTab,
  sortOrder,
  toggleSortOrder
}: TabButtonProps) => {
  const tabs = [
    { key: "all", label: "ALL" },
    { key: "active", label: "ACTIVE" },
    { key: "done", label: "DONE" },
    {
      key: "sort",
      label: sortOrder === "asc" ? "Low → High" : "High → Low",
      action: toggleSortOrder
    }
  ];

  return (
    <div className="flex justify-between">
      {tabs.map(({ key, label, action }) => {
        const isActive = activeTab === key;
        return (
          <button
            key={key}
            className={`py-2 px-4 rounded-md cursor-pointer 
              ${
                isActive
                  ? "bg-orange-400 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            onClick={() => {
              setActiveTab(key as TabName);
              action?.();
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default TabButton;
