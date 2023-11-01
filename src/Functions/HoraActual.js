export function obtenerHoraActual() {
  const now = new Date();
  const horas = now.getHours();
  const minutos = now.getMinutes();
  const segundos = now.getSeconds();

  // Asegurémonos de que los valores tengan dos dígitos
  const horasStr = String(horas).padStart(2, '0');
  const minutosStr = String(minutos).padStart(2, '0');
  const segundosStr = String(segundos).padStart(2, '0');

  // Formatear la hora en "h:mm:ss"
  const horaActual = `${horasStr}:${minutosStr}:${segundosStr}`;
  
  return horaActual;
}

