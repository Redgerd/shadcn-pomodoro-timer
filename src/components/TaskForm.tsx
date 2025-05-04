import React, { useState } from "react";
import { Button } from "./ui/button";

interface Task {
  name: string;
  description: string;
  pomodoros: number;
}

interface TaskFormProps {
  onAddTask: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [pomodoros, setPomodoros] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddTask({ name, description, pomodoros });

    setName("");
    setDescription("");
    setPomodoros(1);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 bg-neutral-900 text-neutral-100 p-4 rounded-lg border border-neutral-800 shadow-sm"
    >
      <input
        className="border border-neutral-700 bg-neutral-800 text-neutral-100 placeholder-neutral-500 rounded p-2 focus:outline-none focus:ring-2 focus:ring-stone-400"
        type="text"
        placeholder="Task name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        className="border border-neutral-700 bg-neutral-800 text-neutral-100 placeholder-neutral-500 rounded p-2 focus:outline-none focus:ring-2 focus:ring-stone-400"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        className="border border-neutral-700 bg-neutral-800 text-neutral-100 rounded p-2 focus:outline-none focus:ring-2 focus:ring-stone-400"
        value={pomodoros}
        onChange={(e) => setPomodoros(Number(e.target.value))}
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <option key={n} value={n}>
            {n} Pomodoro{n > 1 && "s"}
          </option>
        ))}
      </select>
      <div className="flex gap-2">
        <Button type="submit">Save Task</Button>
      </div>
    </form>
  );
  
};

export default TaskForm;
