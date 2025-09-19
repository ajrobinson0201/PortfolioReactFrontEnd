import { useEffect, useState } from "react";
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

interface MoistureReading {
  timestamp: string;
  sensor_id: number;
  moisture: number;
}

function MoistureDashboard() {
  const [data, setData] = useState<MoistureReading[]>([]);

  useEffect(() => {
    fetch("https://flask-production-4667.up.railway.app/api/moisture")
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // Filter for sensor 1 only
  const sensor1Data = data.filter((reading) => reading.sensor_id === 1);

  // Format timestamps for display on x-axis
  const chartData = sensor1Data.map((reading) => ({
    ...reading,
    time: new Date(reading.timestamp).toLocaleTimeString(),
  }));

  return (
    <div>
      <h2>Moisture Sensor Dashboard</h2>
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={[0, 100]} unit="%" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="moisture"
              name="Sensor 1 Moisture"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p>Loading moisture data...</p>
      )}
    </div>
  );
}

export default MoistureDashboard;