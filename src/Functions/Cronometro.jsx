import React, { useState, useEffect } from 'react';

function Cronometro() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const currentMinutes = time.getMinutes();
  const seconds = time.getSeconds();

  let displayMinutes = currentMinutes;

  if (currentMinutes > 30) {
    displayMinutes = currentMinutes - 30;
  }

  const formattedTime = `${(displayMinutes < 10 ? '0' : '')}${displayMinutes}:${(seconds < 10 ? '0' : '')}${seconds}`;

  return formattedTime;
}

export default Cronometro;
