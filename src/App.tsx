import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Timer from "@/components/ui/timer";
import { useContext, useEffect, useState } from "react";
import { TimerContext } from "@/context/TimerContext";
import { MODE } from "@/constants/enum";
import NavBar from "@/components/navBar";
import { Toaster } from "./components/ui/toaster";
import Loader from "./components/ui/loader";

const App = () => {
  const { mode, setMode, timerText, setTimerText, setIsStarted } =
    useContext(TimerContext);

  const changeModeTo = (mode: number) => {
    setMode(mode);
    setIsStarted(false);
    setTimerText(timerText);
  };
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      document.readyState === "complete" ? setLoading(false) : setLoading(true);
    }, 1500);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <main className="flex flex-col items-center h-screen bg-neutral-950 text-neutral-50 gap-4 select-none ">
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
            onClick={() => changeModeTo(MODE.SHORTBREAK)}
            variant={mode === MODE.SHORTBREAK ? "outline_active" : "outline"}
          >
            Short Break
          </Button>
          <Button
            onClick={() => changeModeTo(MODE.LONGBREAK)}
            variant={mode === MODE.LONGBREAK ? "outline_active" : "outline"}
          >
            Long Break
          </Button>
        </Card>
        <Timer />
        <Card className="flex-col items-center">
          <p className="font-semibold">
            {mode === MODE.POMO ? "Time to Focus !" : "Time for Break !"}
          </p>
        </Card>
      </section>
      <Toaster />
    </main>
  );
};

export default App;
