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
    <div className="bg-white text-black p-4 rounded flex flex-col gap-3">
      <h2 className="font-bold text-lg">Task List</h2>
      {tasks.length === 0 && (
        <p className="text-gray-500">No tasks added yet.</p>
      )}
      {tasks.map((task, idx) => (
        <div key={idx} className="border p-3 rounded">
          <h3 className="font-semibold">{task.name}</h3>
          <p className="text-sm text-gray-700">{task.description}</p>
          <p className="text-xs text-gray-500 mt-1">
            {task.pomodoros} Pomodoros
          </p>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
