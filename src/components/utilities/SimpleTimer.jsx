import { useState, useEffect, useRef, useCallback } from 'react';
import timerIcon from '@/assets/icons/timer_pft.png';

export function SimpleTimer ({
  onEnd = () => {},
  onStart = () => {},
  time = 320,
  className,
  setTimerCustom = null,
}) {
  const timerRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(time);
  const [hasInitialized, setHasInitialized] = useState(false);

  const updateTime = useCallback(
    secondsLeft => {
      if (typeof setTimerCustom === 'function') {
        setTimerCustom(secondsLeft);
      } else {
        setCurrentTime(secondsLeft);
      }
    },
    [setTimerCustom],
  );

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const pauseTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(
    durationInSeconds => {
      timerRef.current = setInterval(() => {
        setCurrentTime(prevTime => {
          const newTime = prevTime - 1;
          if (newTime > 0) {
            if (typeof setTimerCustom === 'function') {
              setTimerCustom(newTime);
            }
            return newTime;
          } else {
            stopTimer();
            onEnd();
            return 0;
          }
        });
      }, 1000);
    },
    [stopTimer, onEnd, setTimerCustom],
  );
  useEffect(() => {
    if (hasInitialized) return; // Only run once

    // Start fresh timer without any localStorage
    updateTime(time);
    startTimer(time);
    onStart();
    setHasInitialized(true);

    return () => {
      pauseTimer(); // Only pause on unmount
    };
  }, []); // Remove dependencies to prevent re-runs

  const displayTime =
    typeof setTimerCustom === 'function' ? currentTime : currentTime;

  return (
    <div className={className}>
      <img src={timerIcon} alt='rest-timer' className='w-[15%]' />
      <p className='text-wrap text-sm'>
        {Math.floor(displayTime / 60)} :{' '}
        {String(displayTime % 60).padStart(2, '0')}{' '}
        <span>{displayTime < 60 ? 'seconds' : 'mins'}</span>
      </p>
    </div>
  );
}
