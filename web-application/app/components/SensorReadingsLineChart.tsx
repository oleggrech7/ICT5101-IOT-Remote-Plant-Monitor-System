import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { LocalSensorReadingData } from "../interfaces/common/sensorReading";
import { convertDateToLocale } from "../utils/date";

interface SensorReadingsLineChartProps {
  data: LocalSensorReadingData[];
  containerHeight?: number;
  date?: Date;
}

const error = console.error;
console.error = (...args: any) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};

const CustomTooltip = ({
  active,
  payload
}: {
  active: boolean;
  payload: Array<any>;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black p-2">
        <p>{`Date: ${payload[0].payload.date}`}</p>
        <p>{`Time: ${payload[0].payload.time}`}</p>
        <p>{`Sensor Reading:${payload[0].value}`}</p>
      </div>
    );
  }
};

const CustomizedDot = ({
  largerDot,
  cx,
  cy,
  value,
}: {
  largerDot: boolean;
  cx?: number;
  cy?: number;
  value?: number;
}) => {
  const radius = largerDot ? 5 : 3;
  if (value && value > 625) {
    return <circle cx={cx} cy={cy} r={radius} fill="red" />;
  }

  return <circle cx={cx} cy={cy} r={radius} fill="#008184" />;
};

function calculateAverageSensorReading(
  readings: LocalSensorReadingData[]
): number {
  let totalSensorReading = 0;

  for (const reading of readings) {
    totalSensorReading += reading.sensorReading;
  }

  const averageSensorReading = totalSensorReading / readings.length;
  return averageSensorReading;
}

export const SensorReadingsLineChart: React.FC<
  SensorReadingsLineChartProps
> = ({ data, containerHeight = 800, date }) => {
  const [chartData, setChartData] = useState(data);
  const [average, setAverage] = useState(0);

  useEffect(() => {
    if (date) {
      const localeData = convertDateToLocale(date);
      const filteredData = data.filter(
        (reading) => reading.date === localeData
      );
      setChartData(filteredData);
      return;
    }
    setChartData(data);
  }, [date]);

  useEffect(() => {
    setChartData(data);
    setAverage(calculateAverageSensorReading(data));
  }, [data]);

  useEffect(() => {
    setAverage(calculateAverageSensorReading(chartData));
  }, [chartData]);

  return (
    <>
      <p className="pb-4 pl-11">
        {date ? "Daily" : "Weekly"} Average
        {date ? ` for ${convertDateToLocale(date)}` : undefined}: {average.toFixed(2)}
      </p>
      <ResponsiveContainer height={containerHeight}>
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={date ? "time" : "date"} />
          <YAxis />
          <Tooltip
            content={<CustomTooltip active={false} payload={[]} />}
          />
          <Legend />
          <Line
            type="monotone"
            name="Sensor Reading"
            dataKey="sensorReading"
            stroke="#008184"
            dot={<CustomizedDot largerDot={false} />}
            activeDot={<CustomizedDot largerDot />}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};
