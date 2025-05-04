import { useContext, useEffect } from "react";
import { Button } from "./button";
import { Card } from "./card";
import { TimerContext } from "@/context/TimerContext";
import CountdownTimer from "./countdownTimer";
import { MODE } from "@/constants/enum";
import { toast } from "./use-toast";

interface TimerProps {
  onTimerEnd: () => void;
}

const Timer = ({ onTimerEnd }: TimerProps) => {
  const { isStarted, setIsStarted } = useContext(TimerContext);
  const { mode, setMode } = useContext(TimerContext);

  const handleChangeCurrMode = () => {
    setIsStarted(false);
    if (mode === MODE.POMO) setMode(MODE.SHORTBREAK);
    else if (mode === MODE.SHORTBREAK) setMode(MODE.LONGBREAK);
    else setMode(MODE.POMO);

    setTimeout(() => {
      setIsStarted(true);
    }, 1000);

    // Show meme on every mode change (i.e., when timer hits 0)
    onTimerEnd();
  };

  const toggleTimer = () => {
    setIsStarted((prev) => !prev);
  };

  useEffect(() => {
    if (mode !== undefined) {
      toast({
        title: `Mode Changed to ${
          mode === MODE.POMO
            ? "Pomodoro"
            : mode === MODE.SHORTBREAK
            ? "Short Break"
            : "Long Break"
        }`,
        variant: "default",
      });
    }
  }, [mode]);

  return (
    <Card className="flex-col items-center space-y-4">
      <CountdownTimer callbackFn={handleChangeCurrMode} />
      <Card className="w-full">
        <Button
          className="text-xl uppercase font-bold px-6 py-4"
          variant={"secondary"}
          onClick={toggleTimer}
        >
          {isStarted ? "Stop" : "Start"}
        </Button>
      </Card>
    </Card>
  );
};

export default Timer;
