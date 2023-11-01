import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router';
import { Home } from '../MasaMadreApp/pages/Home';
import { Registros } from '../MasaMadreApp/pages/Registros';

export const AppRouter = () => {
  const [isWindowActive, setIsWindowActive] = useState(true);

  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/Home" element={<Home/>}/>
      <Route path="/Registros" element={<Registros/>}/>
    </Routes>
  );
};
