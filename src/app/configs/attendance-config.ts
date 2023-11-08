// Get the current time components
const currentDate = new Date();
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();
// const seconds = currentTime.getSeconds();

export const formattedDate = currentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
});

export const formattedTime = `${hours}:${minutes}`;

export const isClockInOver = (clockInTime) => {
    const [clockInHours, clockInMinutes] = clockInTime.split(':').map(Number);
    return hours > clockInHours || (hours === clockInHours && minutes >= clockInMinutes);
};