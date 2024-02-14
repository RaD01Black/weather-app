
const DAYS = [
    "sunday",
    "Monday",
    "Tuesday",
    "wednesday",
    "Thursday",
    "friday",
    "saturday",
];

const getWeekDay = (date) => {
    return DAYS[new Date(date * 1000).getDay()];
}

export { getWeekDay};