export function formateDate(date) {
  const parts=date.split('-');
  const dateFormated = parts[2]+"_"+parts[1]+"_"+parts[0];
  return dateFormated
}
  
  