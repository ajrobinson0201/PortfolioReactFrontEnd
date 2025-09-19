import { useEffect, useState } from "react";

function MoistureDashboard() {
  const [data, setData] = useState<any>(null);

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
        <p>
          Sensor {data.sensor_id}: {data.moisture}
          {data.unit} (last updated {data.timestamp})
        </p>
      ) : (
        <p>Loading moisture data...</p>
      )}
    </div>
  );
}

export default MoistureDashboard;