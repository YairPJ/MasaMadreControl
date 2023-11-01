export const CalculateWorkTime = (start, end) => {
    console.log(start, end);
    const startTime = getTimeInSeconds(start);
    const endTime = getTimeInSeconds(end);

    const totalWorkTime = (endTime - startTime) 

    return formatTime(totalWorkTime);
};

const getTimeInSeconds = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
};

const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`;
};

const formatNumber = (num) => {
    return num.toString().padStart(2, '0');
};