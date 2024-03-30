"use client";
import { useSensor } from "./hooks/sensor";

export default function Home() {
  const { sensorReadings } = useSensor();
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1>ICT5101 - Internet of Things: Remote Plant Monitor System</h1>

    </main>
  );
}
