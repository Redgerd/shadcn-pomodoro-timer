import { useContext, useEffect } from "react";
import { Button } from "./button";
import { Card } from "./card";
import { TimerContext } from "@/context/TimerContext";
import CountdownTimer from "./countdownTimer";
import { MODE } from "@/constants/enum";
import { toast } from "./use-toast";

const Timer = () => {
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
  };

  const toggleTimer = () => {
    setIsStarted((prev) => !prev);
  };

  const changeCountDown = () => {
    handleChangeCurrMode();
  };

  useEffect(() => {
    if (mode) {
      toast({
        title: `Mode Changed to ${
          mode === 0 ? "Pomodoro" : mode === 1 ? "Short Break" : "Long Break"
        }`,
        variant: "default",
      });
    }
  }, [mode]);

  return (
    <Card className='flex-col items-center space-y-4'>
      <CountdownTimer callbackFn={changeCountDown} />
      <Card className='w-full'>
        <Button
          className='text-xl uppercase font-bold px-6 py-4'
          variant={"secondary"}
          onClick={() => {
            toggleTimer();
          }}
        >
          {isStarted ? "Stop" : "Start"}
        </Button>
      </Card>
    </Card>
  );
};

export default Timer;
