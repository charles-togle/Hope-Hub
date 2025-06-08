import { useRef, useState } from 'react';

export default function AudioPlayer({ source, children }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = () => {
    const audio = audioRef.current;
    if (audio) {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.log('Playback failed:', error);
        });
    }
  };

  return (
    <div onClick={handleClick}>
      <audio ref={audioRef} loop>
        <source src={source} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      {children}
    </div>
  );
}
