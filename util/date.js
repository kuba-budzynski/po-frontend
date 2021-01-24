import dateFormat from 'dateformat'

export const DATE_FORMAT = "DD.MM.YYYY";
export const TIME_FORMAT = "HH:mm";

export const formatDuration = (duration) => {
    const minutes = duration % 60;
    const status = `${minutes < 10 ? '0' : ''}${minutes}m`;

    if (duration < 60)
        return status;

    return `${Math.floor(duration / 60)}h ${status}`;
}

export const formatDateToPrint = (date) => {
    return dateFormat(date, "hh:MM dd.mm.yyyy")
}

export const formatHour = (date) => {
    return dateFormat(date, "HH:MM:ss");
}