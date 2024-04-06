"use client";
import { Spinner } from "./components/spinner";
import { useSensor } from "./hooks/sensor";

export default function Home() {
  // const { sensorReadings } = useSensor();
  const sensorReadings = [
    {
      id: 1,
      sensorReading: 13,
      createdAt: "30/03/2024, 18:06:47",
    },
    {
      id: 2,
      sensorReading: 13.5,
      createdAt: "30/03/2024, 18:27:20",
    },
  ];
  
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1>ICT5101 - Internet of Things: Remote Plant Monitor System</h1>
      {sensorReadings.length === 0 && <Spinner />}
      <>
        {sensorReadings.map((reading) => (
          <div key={reading.id} className="flex flex-col items-center">
            <p>{reading.sensorReading}</p>
            <p>{reading.createdAt}</p>
          </div>
        ))}
      </>
    </main>
  );
}
