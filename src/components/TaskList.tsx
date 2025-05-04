interface Task {
  name: string;
  description: string;
  pomodoros: number;
}

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <div className="bg-neutral-900 text-neutral-100 p-4 rounded-lg flex flex-col gap-3 border border-neutral-800 shadow-sm">
      <h2 className="font-bold text-lg text-neutral-50">Task List</h2>
      {tasks.length === 0 && (
        <p className="text-neutral-500">No tasks added yet.</p>
      )}
      {tasks.map((task, idx) => (
        <div
          key={idx}
          className="border border-neutral-800 bg-neutral-800 p-3 rounded-md"
        >
          <h3 className="font-semibold text-neutral-100">{task.name}</h3>
          <p className="text-sm text-neutral-300">{task.description}</p>
          <p className="text-xs text-neutral-500 mt-1">
            {task.pomodoros} Pomodoros
          </p>
        </div>
      ))}
    </div>
  );
};


export default TaskList;
