"use client";
import { SensorReadingsLineChart } from "./components/SensorReadingsLineChart";
import { Spinner } from "./components/spinner";
import { DatePicker } from "./components/DatePicker";
import { useSensor } from "./hooks/sensor";
import { useEffect, useState } from "react";

export default function Home() {
  // const { sensorReadings, loading } = useSensor();
  const [date, setDate] = useState<Date>();

  const localSensorReadings = [
    {
      id: 1,
      sensorReading: 13,
      date: "30/03/2024",
      time: "18:06:47",
    },
    {
      id: 2,
      sensorReading: 13.5,
      date: "30/03/2024",
      time: "18:27:20",
    },
    {
      id: 3,
      sensorReading: 15,
      date: "06/04/2024",
      time: "18:56:38",
    },
    {
      id: 4,
      sensorReading: 88,
      date: "07/04/2024",
      time: "11:01:51",
    },
    {
      id: 5,
      sensorReading: 88,
      date: "07/04/2024",
      time: "11:21:13",
    },
    {
      id: 6,
      sensorReading: 88,
      date: "07/04/2024",
      time: "11:30:38",
    },
    {
      id: 7,
      sensorReading: 12,
      date: "10/04/2024",
      time: "19:05:59",
    },
    {
      id: 8,
      sensorReading: 12,
      date: "10/04/2024",
      time: "19:20:47",
    },
    {
      id: 9,
      sensorReading: 12,
      date: "10/04/2024",
      time: "19:21:38",
    },
    {
      id: 10,
      sensorReading: 12,
      date: "10/04/2024",
      time: "19:48:24",
    },
    {
      id: 11,
      sensorReading: 199,
      date: "10/04/2024",
      time: "19:48:57",
    },
  ];

  useEffect(() => {
    console.log(date);
  }, [date]);

  return (
    <main className="flex min-h-screen flex-col items-center p-6">
      <h1 className="text-center text-primary">
        ICT5101 - Internet of Things: Remote Plant Monitor System
      </h1>
      <section className="w-full pt-4">
        {/* {loading ? (
          <Spinner />
        ) : (
          <SensorReadingsLineChart data={localSensorReadings} />
        )} */}
        <DatePicker date={date} setDate={setDate} />
        <SensorReadingsLineChart data={localSensorReadings} date={date} />
      </section>
      {/* <>
        {sensorReadings.map((reading) => (
          <div key={reading.id} className="flex flex-col items-center">
            <p>{reading.sensorReading}</p>
            <p>{reading.date}</p>
            <p>{reading.time}</p>
          </div>
        ))}
      </> */}
    </main>
  );
}
