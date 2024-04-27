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
  payload,
  label,
}: {
  active: boolean;
  payload: Array<any>;
  label: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black p-2">
        <p>{`Date: ${label}`}</p>
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
  if (value && value < 300) {
    return <circle cx={cx} cy={cy} r={radius} fill="red" />;
  }

  return <circle cx={cx} cy={cy} r={radius} fill="#008184" />;
};

export const SensorReadingsLineChart: React.FC<
  SensorReadingsLineChartProps
> = ({ data, containerHeight = 800, date }) => {
  const [chartData, setChartData] = useState(data);

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
  }, [data]);

  return (
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
          content={<CustomTooltip active={false} payload={[]} label={""} />}
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
  );
};
