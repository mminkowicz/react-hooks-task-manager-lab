# Task Manager (React Hooks)

Tiny app to **add**, **complete/undo**, and **search** tasks using:
- `useContext` for global state
- `useId` for accessible form input
- `useRef` for the search box

## Quick Start
```bash
npm install
npm run server   # JSON Server → http://localhost:6001/tasks
npm run dev      # Vite → http://localhost:5173
npm run test     # Vitest (watch)

How to Use
Type a task and click Add Task.

Click Complete (or Undo) to toggle.

Use Search tasks... to filter the list live.

Files to Know
src/context/TaskContext.jsx – loads tasks, addTask, toggleComplete, filteredTasks, setFilter

src/components/TaskForm.jsx – uses useId, adds tasks

src/components/SearchBar.jsx – uses useRef, updates filter

src/components/TaskList.jsx & TaskItem.jsx – render and toggle tasks

src/main.jsx – wraps <App /> with <TaskProvider>

API (JSON Server)
GET /tasks

POST /tasks { title, completed: false }

PATCH /tasks/:id { completed: boolean }

## Screenshot

![Task Manager](./taskmanager-screenshot.png)