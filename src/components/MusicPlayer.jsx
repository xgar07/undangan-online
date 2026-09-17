import React, { useState, useEffect, useRef } from 'react';
import { invitation } from '../data/invitation';

const MusicPlayer = ({ isOpened }) => {
  const { music } = invitation;
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!music || !music.enabled || !music.src) return;

    const audio = new Audio(music.src);
    audio.loop = true;
    audioRef.current = audio;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleError = () => {
      console.warn("Music source is invalid or cannot be loaded.");
      setHasError(true);
    };
    
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
      audio.pause();
    };
  }, [music]);

  // Attempt autoplay when the invitation is opened
  useEffect(() => {
    if (isOpened && audioRef.current && !hasError) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn("Autoplay blocked or failed. User must interact manually.", error.message);
          setIsPlaying(false);
        });
      }
    }
  }, [isOpened, hasError]);

  if (!music || !music.enabled || !music.src || hasError) return null;

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(err => {
            console.warn("Playback failed:", err.message);
            setIsPlaying(false);
          });
        }
      }
    }
  };

  // Unconditionally return null so there is NO UI whatsoever
  return null;
};

export default MusicPlayer;
