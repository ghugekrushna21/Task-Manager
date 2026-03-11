import { useState, useMemo } from "react";
import Confetti from "react-confetti";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AddTask from "./components/AddTask";
import TaskStats from "./components/TaskStats";
import TaskList from "./components/TaskList";
import TaskTabs from "./components/TaskTabs";
import { TabName, SortOrder, User } from "./types/index";
import Card from "./components/ui/Card";
import useDarkMode from "./hooks/useDarkMode";
import useTasks from "./hooks/useTasks";
import ErrorMessage from "./components/ui/ErrorMessage";
import Button from "./components/ui/Button";
import Login from "./components/Login";
import Register from "./components/Register";
import { useAuth } from "./contexts/AuthContext";

const PRIORITY_WEIGHTS = { low: 1, medium: 2, high: 3 };

const App = () => {
  const { isDark, toggle: toggleDark } = useDarkMode();
  const { user, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(true);

  if (!user) {
    return showLogin ? (
      <Login onToggleForm={() => setShowLogin(false)} />
    ) : (
      <Register onToggleForm={() => setShowLogin(true)} />
    );
  }

  return (
    <AuthenticatedApp
      user={user}
      logout={logout}
      isDark={isDark}
      toggle={toggleDark}
    />
  );
};

type AuthenticatedAppProps = {
  user: User;
  logout: () => void;
  isDark: boolean;
  toggle: () => void;
};
const AuthenticatedApp = ({
  user,
  logout,
  isDark,
  toggle
}: AuthenticatedAppProps) => {
  const {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    error,
    loading,
    refetch
  } = useTasks();

  const [activeTab, setActiveTab] = useState<TabName>("active");
  const [showConfetti, setShowConfetti] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) =>
      sortOrder === "asc"
        ? PRIORITY_WEIGHTS[a.priority] - PRIORITY_WEIGHTS[b.priority]
        : PRIORITY_WEIGHTS[b.priority] - PRIORITY_WEIGHTS[a.priority]
    );
  }, [tasks, sortOrder]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors">
      {showConfetti ? (
        <Confetti
          numberOfPieces={300}
          width={innerWidth}
          height={innerHeight}
        />
      ) : null}

      <ToastContainer position="top-right" autoClose={2000} />

      <header className="bg-blue-500 text-white p-6 dark:bg-blue-600 transition-colors text-center">
        <div className="flex justify-center items-center gap-10 ">
          <div>
            <h1 className="text-3xl font-bold">Task Manager</h1>
            <p className="text-sm mt-1">Welcome, {user.name}!</p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={toggle}>
              {isDark ? "☀️" : "🌙"}
            </Button>
            <Button variant="secondary" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 min-w-2xl mx-auto my-8 px-4 ">
        {/* Add Task Section  */}

        <AddTask onSubmit={addTask} />

        {/* Stats Box Section  */}
        <TaskStats tasks={tasks} />

        {/* Task List Section */}
        <Card>
          <TaskTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setSortOrder={setSortOrder}
            sortOrder={sortOrder}
          />
          <h2 className="my-3 text-xl font-bold dark:text-white">
            {" "}
            My Tasks {!loading && `(${tasks.length})`}
            <a className="cursor-pointer" onClick={refetch}>
              🔄
            </a>
          </h2>
          {error ? <ErrorMessage message={error} /> : null}
          <div className="flex px-5 my-4 ">
            <input
              className="flex-1 p-2 border-2 rounded border-gray-300 focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:border-blue-400 transition-colors"
              type="text"
              placeholder="Enter task name here to search ..."
              value={searchText}
              onChange={(event) => {
                setSearchText(event.target.value);
                setActiveTab("search");
              }}
            />
          </div>

          <TaskList
            tasks={tasks}
            loading={loading}
            updateTask={updateTask}
            deleteTask={deleteTask}
            toggleTask={toggleTask}
            activeTab={activeTab}
            setShowConfetti={setShowConfetti}
            searchText={searchText}
            sortedTasks={sortedTasks}
          />
        </Card>
      </main>

      <footer className="p-1 bg-gray-800 text-white text-center ">
        Copyright &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default App;
