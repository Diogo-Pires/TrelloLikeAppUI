import { parseISO, format } from "date-fns";

export const DatetimeToDateString = (dateTime: Date | string | undefined): string | undefined => {
    if (!dateTime) {
        return "";
    }

    let parsedDate: Date | undefined = DatetimeToDate(dateTime);
    if(!parsedDate)
        return "";

    return isNaN(parsedDate?.getTime()) ? "" : format(parsedDate, "yyyy-MM-dd");
} 

export const DatetimeToDate = (dateTime: Date | string | undefined): Date | undefined => {
    if (!dateTime) {
        return undefined;
    }

    let parsedDate: Date;

    if (dateTime instanceof Date) {
        parsedDate = dateTime;
    } else if (typeof dateTime === "string") {
        parsedDate = parseISO(dateTime);
    } else {
        console.warn("Invalid date format:", dateTime);
        return undefined;
    }

    return parsedDate;
} 