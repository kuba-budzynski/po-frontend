import dayjs from "dayjs";

export const DATE_FORMAT = "DD.MM.YYYY";
export const TIME_FORMAT = "HH:mm";

export const formatDuration = (duration) => {
    const minutes = duration % 60;
    const status = `${minutes < 10 ? '0' : ''}${minutes}m`;

    if (duration < 60)
        return status;

    return `${Math.floor(duration / 60)}h ${status}`;
}

export const formatDateToPrint = (date) => dayjs(date).format("HH:mm DD.MM.YYYY")

export const formatHour = (date) => dayjs(date).format("HH:mm:ss")
