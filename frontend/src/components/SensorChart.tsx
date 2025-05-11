// frontend/src/components/SensorChart.tsx
import { useEffect, useState } from "react";
import { fetchSensorList } from "../services/api/sensorService";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

export default function SensorChart() {
  const [labels, setLabels] = useState<string[]>([]);
  const [values, setValues] = useState<number[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchSensorList();
      setLabels(data.map((d) => new Date(d.timestamp).toLocaleTimeString()));
      setValues(data.map((d) => d.value));
    };
    loadData();
  }, []);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Sensor Value over Time",
        data: values,
        fill: false,
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="mt-6 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-2">กราฟ Sensor Data</h2>
      <Line data={chartData} />
    </div>
  );
}
