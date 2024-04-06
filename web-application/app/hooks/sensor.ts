import { useEffect, useState } from "react";
import { SensorReadingData } from "../interfaces/common/sensorReading";
import { GET } from "../utils/api";
import { SensorReadingsResponse } from "../interfaces/responses/sensorReadingsResponse";

export function useSensor() {
  const [sensorReadings, setSensorReadings] = useState<SensorReadingData[]>([]);

  const getSensorReadings = async () => {
    await GET("/api/get-sensor-readings").then(async (response: Response) => {
      const { data } = (await response.json()) as SensorReadingsResponse;
      const convertedData = data.map((reading) => ({
        id: reading.id,
        sensorReading: reading.sensorReading,
        createdAt: new Date(reading.createdAt).toLocaleString(),
      }));
      setSensorReadings(convertedData);
    });
  };

  useEffect(() => {
    getSensorReadings();
  }, []);

  return {
    sensorReadings,
  };
}
