"use client";

import { createContext, useState, useContext, ReactNode } from "react";

export interface Task {
  id: string;
  name: string;
  description: string;
  pomodorosRequired: number;
  completed: boolean;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, "id" | "completed">) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
  currentTask: Task | null;
  setCurrentTask: (task: Task | null) => void;
}

export const TaskContext = createContext<TaskContextType>({
  tasks: [],
  addTask: () => {},
  deleteTask: () => {},
  toggleTaskCompletion: () => {},
  currentTask: null,
  setCurrentTask: () => {},
});

export const useTaskContext = () => useContext(TaskContext);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      name: "Write blog post",
      description: "Finish the draft for the new blog post.",
      pomodorosRequired: 2,
      completed: false,
    },
    {
      id: "2",
      name: "Design new landing page",
      description: "Create a new design for the homepage.",
      pomodorosRequired: 4,
      completed: false,
    },
    {
      id: "3",
      name: "Refactor codebase",
      description: "Improve the code structure and performance.",
      pomodorosRequired: 3,
      completed: false,
    },
  ]);

  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  const addTask = (task: Omit<Task, "id" | "completed">) => {
    const newTask = {
      ...task,
      id: Date.now().toString(),
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
    if (currentTask?.id === id) {
      setCurrentTask(null);
    }
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        toggleTaskCompletion,
        currentTask,
        setCurrentTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
