import { useEffect, useState } from 'react';
import TimerIcon from '@/assets/icons/timer_quiz.png';

export default function Timer({ duration, color, onTimerEnd }) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    setTime(duration);

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      if (elapsed > duration) {
        clearInterval(interval);
        onTimerEnd();
      } else setTime(duration - elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [duration, onTimerEnd]);

  return (
    <div className="flex items-center gap-4">
      <img className="size-8" src={TimerIcon} alt="timer" />
      <span className={`font-content text-${color}`}>
        {time} {time > 1 ? 'seconds' : 'second'}
      </span>
    </div>
  );
}
