export const csvToArray = (text: string, separator: string): string[] => {
    return text.split(separator);
};