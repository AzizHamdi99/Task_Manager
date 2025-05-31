export function formatCustomDate(date = new Date()) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const dayName = days[date.getDay()];
    const dayNumber = date.getDate();
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();

    const getOrdinal = (n: number) => {
        const s = ["th", "st", "nd", "rd"];
        const v = n % 100;
        return s[(v - 20) % 10] || s[v] || s[0];
    };

    return `${dayName} ${dayNumber}${getOrdinal(dayNumber)} ${monthName} ${year}`;
}
