import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Timer from "@/components/ui/timer";
import { TimerContext } from "@/context/TimerContext";
import { MODE } from "@/constants/enum";
import NavBar from "@/components/navBar";
import { Toaster } from "./components/ui/toaster";
import Loader from "./components/ui/loader";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import MemeViewer from "@/components/MemeViewer";

// Define the Task interface here or import from a separate file
interface Task {
  name: string;
  description: string;
  pomodoros: number;
}

const App = () => {
  const { mode, setMode, timerText, setTimerText, setIsStarted } =
    useContext(TimerContext);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const handleAddTask = (task: Task) => {
    setTasks((prev) => [...prev, task]);
  };

  const changeModeTo = (mode: number) => {
    setMode(mode);
    setIsStarted(false);
    setTimerText(timerText); // This line might be redundant
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      document.readyState === "complete" ? setLoading(false) : setLoading(true);
    }, 1500);
    return () => clearTimeout(timeout);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <main className="flex flex-col items-center h-screen bg-neutral-950 text-neutral-50 gap-4 select-none">
      <NavBar />

      <section className="w-11/12 max-w-screen-md flex flex-col gap-4">
        <Card className="gap-2 w-full flex-wrap flex-1">
          <Button
            variant={mode === MODE.POMO ? "outline_active" : "outline"}
            onClick={() => changeModeTo(MODE.POMO)}
          >
            Pomodoro
          </Button>
          <Button
            variant={mode === MODE.SHORTBREAK ? "outline_active" : "outline"}
            onClick={() => changeModeTo(MODE.SHORTBREAK)}
          >
            Short Break
          </Button>
          <Button
            variant={mode === MODE.LONGBREAK ? "outline_active" : "outline"}
            onClick={() => changeModeTo(MODE.LONGBREAK)}
          >
            Long Break
          </Button>
        </Card>

        <Timer />

        <Card className="flex-col items-center">
          <p className="font-semibold">
            {mode === MODE.POMO ? "Time to Focus!" : "Time for Break!"}
          </p>
        </Card>
      </section>

      <Toaster />
      <MemeViewer />
      <section className="w-11/12 max-w-screen-md flex flex-col gap-4">
        <TaskForm onAddTask={handleAddTask} />
        <TaskList tasks={tasks} />
      </section>
    </main>
  );
};

export default App;
