export const DatetimeToDateString = (dateTime: Date | undefined): string | undefined => {
    console.log(dateTime)
    return dateTime?.toISOString().split("T")[0];
} 