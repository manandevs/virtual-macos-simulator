import React, { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { IoLogoApple } from 'react-icons/io5'
import './index.css'
import App from './App'

const BootScreen = ({ onBootComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Simulating the boot sequence (approx 2.5 seconds)
    const bootDuration = 2500; 
    const intervalTime = 50;
    const step = 100 / (bootDuration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          // 1. Start fading out the black screen
          setIsFading(true);
          // 2. Wait for the fade transition to finish, then unmount
          setTimeout(onBootComplete, 500); 
          return 100;
        }
        // Add a slight randomness to the step to mimic real OS loading stutter
        return prev + step * (Math.random() * 1.5 + 0.5);
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onBootComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-black transition-opacity duration-500 ease-in-out ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <IoLogoApple className="text-white text-[100px] mb-16" />
      
      {/* macOS style thin progress bar */}
      <div className="w-56 h-1.5 bg-[#333333] rounded-full overflow-hidden">
        <div 
          className="h-full bg-white rounded-full transition-all duration-75 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

const RootApp = () => {
  const [isBooted, setIsBooted] = useState(false);

  return (
    <>
      {/* Show the boot screen until fading is completely done */}
      {!isBooted && <BootScreen onBootComplete={() => setIsBooted(true)} />}
      
      {/* 
        Keep the OS App mounted but invisible. 
        This allows the wallpaper and icons to preload in the background! 
      */}
      <div 
        className={`w-full h-screen transition-opacity duration-1000 ${
          isBooted ? "opacity-100" : "opacity-0 overflow-hidden"
        }`}
      >
        <App />
      </div>
    </>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RootApp />
  </StrictMode>,
)