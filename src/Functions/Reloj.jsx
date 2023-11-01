import React, { useState, useEffect } from 'react';

function Reloj() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours

  const formattedTime = `${formattedHours}:${(minutes < 10 ? '0' : '')}${minutes} ${ampm}`;

  return (
    formattedTime
  );
}

export default Reloj;

