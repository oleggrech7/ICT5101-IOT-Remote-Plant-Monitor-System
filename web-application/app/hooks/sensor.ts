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
  const [latestSensorReading, setLatestSensorReading] = useState<
    LocalSensorReadingData | undefined
  >(undefined);
  const [loading, setLoading] = useState(false);

  const getSensorReadings = async () => {
    setLoading(true);
    await GET("/api/get-sensor-readings")
      .then(async (response: Response) => {
        const { data } = (await response.json()) as SensorReadingsResponse;
        const sortedData = data.sort(
          (a, b) =>
            (new Date(b.createdAt as any) as any) -
            (new Date(a.createdAt as any) as any)
        );

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
        setLatestSensorReading(
          convertedData.find((value) => value.id === sortedData[0].id)
        );
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
    latestSensorReading,
    loading,
  };
}
