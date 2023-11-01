import React, { useState, useEffect } from 'react';

function CurrentDate() {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Los meses comienzan en 0, por lo que sumamos 1
    const year = currentDate.getFullYear();

    // Formatear la fecha como "dd/mm/yyyy"
    const formattedDate = `${day}/${month}/${year}`;

    setCurrentDate(formattedDate);
  }, []);

  return (
    currentDate
  );
}

export default CurrentDate;
