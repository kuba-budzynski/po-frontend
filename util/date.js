export const DATE_FORMAT = "DD.MM.YYYY";
export const TIME_FORMAT = "HH:mm";

export const formatDuration = (duration) => {
    const minutes = duration % 60;
    const status = `${minutes < 10 ? '0' : ''}${minutes}m`;

    if (duration < 60)
        return status;

    return `${Math.floor(duration / 60)}h ${status}`;
}
