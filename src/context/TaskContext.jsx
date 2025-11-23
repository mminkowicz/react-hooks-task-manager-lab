import { createContext, useContext, useEffect, useMemo, useState } from "react";

export const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch(() => {});
  }, []);

  // Add new task
  async function addTask(title) {
    const tempId = `temp_${Math.random().toString(36).slice(2)}`;
    const optimistic = { id: tempId, title, completed: false };

    setTasks((prev) => [...prev, optimistic]);

    try {
      const res = await fetch("/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, completed: false }),
      });
      const created = await res.json();

      setTasks((prev) => prev.map((t) => (t.id === tempId ? created : t)));

      return created;
    } catch (err) {
      setTasks((prev) => prev.filter((t) => t.id !== tempId));
      throw err;
    }
  }

  // Toggle completion
  async function toggleComplete(id) {
    const current = tasks.find((t) => t.id === id);
    if (!current) return;

    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );

    try {
      await fetch(`/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !current.completed }),
      });
    } catch {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, completed: current.completed } : t,
        ),
      );
    }
  }

  const filteredTasks = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return tasks;
    return tasks.filter((t) => t.title.toLowerCase().includes(q));
  }, [tasks, query]);

  const value = {
    tasks,
    filteredTasks,
    query,
    setQuery,
    addTask,
    toggleComplete,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}