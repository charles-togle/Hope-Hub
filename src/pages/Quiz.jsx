import { useState, useEffect } from 'react';

export default function Quiz() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Quiz</h1>
      <p className="text-lg">This is a quiz page.</p>
      <Timer duration={10} />
    </div>
  );
}

export function Timer({ duration }) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    setTime(duration);

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      if (elapsed > duration) {
        clearInterval(interval);
        alert('Time is up!');
      } else setTime(duration - elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [duration]);

  return (
    <>
      <div>⏱️ {time}</div>
    </>
  );
}
