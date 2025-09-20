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

// Separate data for each sensor
const sensor1Data = data
.filter((r) => r.sensor_id === 1)
.map((r) => ({ ...r, time: new Date(r.timestamp).toLocaleTimeString() }));

const sensor2Data = data
.filter((r) => r.sensor_id === 2)
.map((r) => ({ ...r, time: new Date(r.timestamp).toLocaleTimeString() }));

return (
<div>
  <h2>Moisture Sensor Dashboard</h2>
  {(sensor1Data.length > 0 || sensor2Data.length > 0) ? (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis domain={[0, 100]} unit="%" />
        <Tooltip />
        <Legend />
        {/* Sensor 1 */}
        <Line
          type="monotone"
          data={sensor1Data}
          dataKey="moisture"
          name="Sensor 1"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
          isAnimationActive={false}
          dot={false}
          connectNulls
        />
        {/* Sensor 2 */}
        <Line
          type="monotone"
          data={sensor2Data}
          dataKey="moisture"
          name="Sensor 2"
          stroke="#82ca9d"
          activeDot={{ r: 8 }}
          isAnimationActive={false}
          dot={false}
          connectNulls
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