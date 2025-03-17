import { parseISO, format } from "date-fns";

export const DatetimeToDateString = (dateTime: Date | undefined): string | undefined => {
    if (!dateTime) {
        return ""; // Return an empty string when null/undefined
    }

    let parsedDate: Date;

    if (dateTime instanceof Date) {
        parsedDate = dateTime;
    } else if (typeof dateTime === "string") {
        parsedDate = parseISO(dateTime);
    } else {
        console.warn("Invalid date format:", dateTime);
        return "";
    }

    return isNaN(parsedDate.getTime()) ? "" : format(parsedDate, "yyyy-MM-dd");
} 