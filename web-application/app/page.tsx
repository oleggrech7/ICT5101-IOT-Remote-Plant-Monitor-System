"use client";
import { useMemo, useState } from "react";
import { DatePicker } from "./components/DatePicker";
import { ErrorAlert } from "./components/ErrorAlert";
import { SensorReadingsLineChart } from "./components/SensorReadingsLineChart";
import { Spinner } from "./components/spinner";
import { useSensor } from "./hooks/sensor";
import { getDateTimestamps } from "./utils/date";

export default function Home() {
  const { sensorReadings, loading, latestSensorReading } = useSensor();
  const [date, setDate] = useState<Date>();
  const [hidden, setHidden] = useState(false);

  const isMoistureLow = useMemo(() => {
    if (!latestSensorReading) return false;
    return latestSensorReading.sensorReading < 300;
  }, [latestSensorReading]);

  return (
    <main className="flex min-h-screen flex-col items-center p-6">
      <h1 className="text-center text-primary font-extrabold">
        ICT5101 - Internet of Things: Remote Plant Monitor System
      </h1>
      <section className="w-full pt-4">
        {loading ? (
          <section className="flex flex-col items-center">
            <Spinner />
          </section>
        ) : sensorReadings.length ? (
          <section className="flex flex-col align-middle">
            <div
              className={`flex flex-row pb-5 items-center ${
                !hidden && isMoistureLow ? "justify-between" : "justify-end"
              }`}
            >
              {isMoistureLow && (
                <ErrorAlert
                  title="Warning"
                  message="Latest reading has indicated that the moisture level is low"
                  hidden={hidden}
                  setHidden={setHidden}
                />
              )}
              <DatePicker
                date={date}
                setDate={setDate}
                dataAvailableDates={getDateTimestamps(sensorReadings)}
              />
            </div>
            <SensorReadingsLineChart data={sensorReadings} date={date} />
          </section>
        ) : (
          <section className="flex flex-col items-center">
            <h2 className="font-extrabold">
              No sensor readings currently available. Please check again later!
            </h2>
          </section>
        )}
      </section>
    </main>
  );
}
