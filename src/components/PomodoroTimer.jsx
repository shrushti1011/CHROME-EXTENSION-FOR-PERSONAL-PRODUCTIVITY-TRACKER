import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Pause, RotateCw, Heart } from "lucide-react";

const FOCUS_TIME = 25 * 60; // 25 minutes

function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(FOCUS_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [session, setSession] = useState(1);
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      setCompleted(completed + 1);
      setSession(session + 1);
      setTimeLeft(FOCUS_TIME);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, session, completed]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(FOCUS_TIME);
    setSession(1);
    setCompleted(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-red-500" />
          <CardTitle className="text-lg font-semibold">Focus Time</CardTitle>
        </div>
        {/* Placeholder for potential future settings/menu */}
        <div></div>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center flex-grow">
        <div className="text-6xl font-bold">{formatTime(timeLeft)}</div>
        <p className="text-sm text-muted-foreground mt-2 mb-4">
          Session {session} • Completed: {completed}
        </p>
        <div className="flex gap-4">
          <Button size="lg" onClick={toggleTimer}>
            {!isRunning ? (
              <>
                <Play className="mr-2 h-5 w-5" /> Start
              </>
            ) : (
              <>
                <Pause className="mr-2 h-5 w-5" /> Pause
              </>
            )}
          </Button>
          <Button variant="outline" size="lg" onClick={resetTimer}>
            <RotateCw className="mr-2 h-5 w-5" /> Reset
          </Button>
        </div>
        <div className="flex gap-2 mt-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-2 w-2 rounded-full bg-gray-300"
            ></div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default PomodoroTimer; 