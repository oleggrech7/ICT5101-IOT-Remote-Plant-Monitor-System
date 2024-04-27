export interface SensorReadingData {
  id: number;
  sensorReading: number;
  createdAt: string;
}

export interface LocalSensorReadingData {
  id: number;
  sensorReading: number;
  date: string;
  time: string;
}
