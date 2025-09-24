import { useEffect, useMemo, useState } from "react";
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


interface MoistureDataPoint {
  time: string,
  moisturePercent: number
}

interface Sensor {
  id: string,
  moistureData: MoistureDataPoint[]
}

// interface SensorDataMessage {
//   timestamp: string;
//   sensors: Sensor[]
// }

interface SensorData {
  sensor_id: string,
  timestamp: string,
  moisture: number
}

// Generate random pastel colors with enforced variation
const generatePastelColor = (usedHues: number[] = []): string => {
  let hue: number;
  let attempts = 0;
  const maxAttempts = 50;

  do {
    hue = Math.floor(Math.random() * 360);
    attempts++;
  } while (
    attempts < maxAttempts &&
    usedHues.some(usedHue => Math.abs(hue - usedHue) < 60) // Minimum 60 degrees apart
  );

  const saturation = Math.floor(Math.random() * 30) + 40; // 40-70% saturation for pastel
  const lightness = Math.floor(Math.random() * 20) + 70; // 70-90% lightness for pastel
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

function MoistureDashboard() {
  const [data, setData] = useState<SensorData[]>([]);

  useEffect(() => {
    fetch("https://flask-production-4667.up.railway.app/api/moisture")
      .then((res) => res.json())
      .then((data: SensorData[]) => {
        console.log(data)
        setData(data)
      });
    // .catch(console.error);
  }, []);

  const sensors: Sensor[] = useMemo(() => {
    const sensorMap = new Map<string, MoistureDataPoint[]>();

    data.forEach((sensorData: SensorData) => {
      const moistureDataPoint: MoistureDataPoint = {
        time: new Date(sensorData.timestamp).toLocaleTimeString(),
        moisturePercent: sensorData.moisture
      };

      if (sensorMap.has(sensorData.sensor_id)) {
        sensorMap.get(sensorData.sensor_id)!.push(moistureDataPoint);
      } else {
        sensorMap.set(sensorData.sensor_id, [moistureDataPoint]);
      }
    });

    const returnArray = Array.from(sensorMap.entries()).map(([sensorId, moistureData]) => ({
      id: sensorId,
      moistureData: moistureData
    }));

    console.log(returnArray);

    return returnArray;
  }, [data])

  // Generate colors with enforced variation
  const sensorColors = useMemo(() => {
    const usedHues: number[] = [];
    return sensors.map(() => {
      const color = generatePastelColor(usedHues);
      // Extract hue from the generated color for tracking
      const hueMatch = color.match(/hsl\((\d+),/);
      if (hueMatch) {
        usedHues.push(parseInt(hueMatch[1]));
      }
      return color;
    });
  }, [sensors]);

  // Separate data for each sensor
  // const sensor1Data = data
  //   .filter((r) => r.sensor_id === 1)
  //   .map((r) => ({ ...r, timestamp: new Date(r.timestamp).toLocaleTimeString() }));

  // const sensor2Data = data
  //   .filter((r) => r.sensor_id === 2)
  //   .map((r) => ({ ...r, timestamp: new Date(r.timestamp).toLocaleTimeString() }));

  return (
    <div>
      <h2>Moisture Sensor Dashboard</h2>
      {(sensors.length > 0 && sensors[0].moistureData.length > 0) ? (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={[0, 100]} unit="%" />
            <Tooltip />
            <Legend />
            {sensors.map((sensor, index) => (
              <Line
                key={sensor.id}
                type="monotone"
                data={sensor.moistureData}
                dataKey="moisturePercent"
                name={sensor.id}
                stroke={sensorColors[index]}
                activeDot={{ r: 8 }}
                isAnimationActive={false}
                dot={false}
                connectNulls
              />
            ))}
            {/* Sensor 1 */}
            {/* <Line
              type="monotone"
              data={sensor1Data}
              dataKey="moisture"
              name="Sensor 1"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
              isAnimationActive={false}
              dot={false}
              connectNulls
            /> */}
            {/* Sensor 2 */}
            {/* <Line
              type="monotone"
              data={sensor2Data}
              dataKey="moisture"
              name="Sensor 2"
              stroke="#82ca9d"
              activeDot={{ r: 8 }}
              isAnimationActive={false}
              dot={false}
              connectNulls
            /> */}
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p>Loading moisture data...</p>
      )}
    </div>
  );
}

export default MoistureDashboard;