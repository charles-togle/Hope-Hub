import { useState, useEffect, useRef, useCallback } from 'react';
import timerIcon from '@/assets/icons/timer_pft.png';

export function Timer ({
  onEnd = () => {},
  onStart = () => {},
  time = 320,
  className,
  setTimerCustom = null,
}) {
  const timerRef = useRef(null);
  const [timer, setTimer] = useState(time);

  const startTimer = useCallback(() => {
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        if (setTimerCustom !== null) {
          setTimerCustom(prev => Math.max(prev - 1, 0));
        } else {
          setTimer(prev => Math.max(prev - 1, 0));
        }
      }, 1000);
    }
  }, [setTimerCustom]);

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    startTimer();
    onStart();
    return () => {
      stopTimer();
    };
  }, [onStart, startTimer]);

  useEffect(() => {
    if (timer === 0) {
      onEnd();
    }
  }, [onEnd, timer]);

  return (
    <div className={`${className}`}>
      <img src={timerIcon} alt='rest-timer' className='w-[15%]' />
      <p className='text-wrap text-sm'>
        {Math.floor(timer / 60)} : {String(timer % 60).padStart(2, '0')}{' '}
        <span>{timer < 60 ? 'seconds' : 'mins'}</span>
      </p>
    </div>
  );
}
