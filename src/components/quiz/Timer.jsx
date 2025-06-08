import { useEffect, useState, useContext } from 'react';
import TimerIcon from '@/assets/icons/timer_quiz.png';
import { RemainingTimeContext } from '@/providers/QuizContext';
import { motion } from 'motion/react';

export default function Timer({ duration, color, onTimerEnd }) {
  const [time, setTime] = useState(0);
  const remainingTimeRef = useContext(RemainingTimeContext);
  remainingTimeRef.current = time;

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
      <motion.img
        animate={{
          rotate: [-5, 5, -5, 5],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="size-8"
        src={TimerIcon}
        alt="timer"
      />
      <motion.span
        animate={{
          scale: [1, 1.08, 1],
          opacity: [1, 0.9, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`font-content text-${color}`}
      >
        {time} {time > 1 ? 'seconds' : 'second'}
      </motion.span>
    </div>
  );
}
