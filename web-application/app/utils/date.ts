import { LocalSensorReadingData } from "@/app/interfaces/common/sensorReading";

export function convertDateToLocale(date: string | Date): string {
  return (typeof date === "string" ? new Date(date) : date).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "UTC",
    }
  );
}

export function getDateTimestamps(data: LocalSensorReadingData[]) {
  return data.map((entry) => {
    const [day, month, year] = entry.date.split("/");
    return new Date(`${month}/${day}/${year}`);
  });
}

