import { useEffect, useState } from "react";

interface MoistureReading {
  timestamp: string;
  sensor_id: number;
  moisture: number;
}

function MoistureDashboard() {
  const [data, setData] = useState<MoistureReading[] | null>(null);

  useEffect(() => {
    fetch("https://flask-production-4667.up.railway.app/api/moisture")
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2>Moisture Sensor Dashboard</h2>
      {data ? (
        <ul>
          {data.map((reading) => (
            <li key={reading.timestamp}>
              Sensor {reading.sensor_id}: {reading.moisture}% (last updated{" "}
              {new Date(reading.timestamp).toLocaleTimeString()})
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading moisture data...</p>
      )}
    </div>
  );
}

export default MoistureDashboard;