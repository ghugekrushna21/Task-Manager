import "react-toastify/dist/ReactToastify.css";

import TabButton from "./TabButton";
import { TabName, SortOrder } from "../types";

type TaskTabsProps = {
  activeTab: TabName;
  setActiveTab: React.Dispatch<React.SetStateAction<TabName>>;
  setSortOrder: React.Dispatch<React.SetStateAction<SortOrder>>;
  sortOrder: SortOrder;
};

const TaskTabs = ({
  activeTab,
  setActiveTab,
  setSortOrder,
  sortOrder
}: TaskTabsProps) => {
  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="tabs-section">
      <TabButton
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        toggleSortOrder={toggleSortOrder}
        sortOrder={sortOrder}
      />
    </div>
  );
};

export default TaskTabs;
