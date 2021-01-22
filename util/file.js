export const FILE_SIZE_LIMIT = 2097152;

export const parseFileSize = (bytes) => {
    if (!bytes) return "0 B"
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, i)).toFixed(2) + " " + ['B', 'KB', 'MB', 'GB'][i];
};
