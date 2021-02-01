import dayjs from "dayjs";

export const DATE_FORMAT = "DD.MM.YYYY";
export const TIME_FORMAT = "HH:mm";

export const formatDuration = (duration = 0) => {
    const minutes = `${duration % 60}m`;

    if (duration < 60)
        return minutes;

    return `${Math.floor(duration / 60)}h ${minutes}`;
}

export const formatDateToPrint = (date) => dayjs(date).format("HH:mm DD.MM.YYYY")

export const formatHour = (date) => dayjs(date).format("HH:mm:ss")
