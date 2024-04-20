import React, { use, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { LocalSensorReadingData } from "../interfaces/common/sensorReading";

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

export const SensorReadingsLineChart: React.FC<
  SensorReadingsLineChartProps
> = ({ data, containerHeight = 800, date }) => {
  useEffect(() => {
    console.log("date in chart", date);
  }, [date]);

  return (
    <ResponsiveContainer height={containerHeight}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="sensorReading"
          stroke="#008184"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
