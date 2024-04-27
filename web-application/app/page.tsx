"use client";
import { useMemo, useState } from "react";
import { DatePicker } from "./components/DatePicker";
import { ErrorAlert } from "./components/ErrorAlert";
import { SensorReadingsLineChart } from "./components/SensorReadingsLineChart";
import { Spinner } from "./components/spinner";
import { useSensor } from "./hooks/sensor";
import { getDateTimestamps } from "./utils/date";
import { Github } from "lucide-react";

export default function Home() {
  const { sensorReadings, loading, latestSensorReading } = useSensor();
  const [date, setDate] = useState<Date>();
  const [hidden, setHidden] = useState(false);
  const [fill, setFill] = useState(false);

  const isMoistureLow = useMemo(() => {
    if (!latestSensorReading) return false;
    return latestSensorReading.sensorReading < 300;
  }, [latestSensorReading]);

  const handleIconFill = (value: boolean) => {
    setFill(value);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-6">
      <section className="flex flex-col items-center">
        <h1 className="text-center text-primary font-extrabold pb-4">
          ICT5101 - Internet of Things: Remote Plant Monitor System
        </h1>
        <h2>Oleg Grech</h2>
        <a
          href="mailto:oleg.grech.19@um.edu.mt"
          target="_blank"
          className="hover:underline pt-2"
        >
          oleg.grech.19@um.edu.mt
        </a>
        <p
          className="flex hover:underline cursor-pointer pt-2"
          onMouseOver={() => handleIconFill(true)}
          onMouseOut={() => handleIconFill(false)}
        >
          Code found on
          <a
            href="https://github.com/oleggrech7/ICT5101-IOT-Remote-Plant-Monitor-System"
            target="_blank"
            className="pl-2"
          >
            <Github fill={fill ? "white" : "transparent"} />
          </a>
        </p>
      </section>
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
