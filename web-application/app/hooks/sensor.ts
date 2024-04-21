import { useEffect, useState } from "react";
import {
  LocalSensorReadingData,
  SensorReadingData,
} from "@/app/interfaces/common/sensorReading";
import { GET } from "@/app/utils/api";
import { SensorReadingsResponse } from "@/app/interfaces/responses/sensorReadingsResponse";
import { convertDateToLocale } from "../utils/date";

export function useSensor() {
  const [sensorReadings, setSensorReadings] = useState<
    LocalSensorReadingData[]
  >([]);
  const [loading, setLoading] = useState(false);

  const getSensorReadings = async () => {
    setLoading(true);
    await GET("/api/get-sensor-readings")
      .then(async (response: Response) => {
        const { data } = (await response.json()) as SensorReadingsResponse;
        const convertedData = data.map(
          (reading) =>
            ({
              id: reading.id,
              sensorReading: reading.sensorReading,
              date: convertDateToLocale(reading.createdAt),
              time: new Date(reading.createdAt).toLocaleTimeString(),
            } as LocalSensorReadingData)
        );
        setSensorReadings(convertedData);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getSensorReadings();
  }, []);

  return {
    sensorReadings,
    loading,
  };
}
