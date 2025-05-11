// frontend/src/pages/App.tsx
import { useState } from "react";
import UploadForm from "../components/UploadForm";
import { SensorStats } from "../services/api/sensorService";
import StatsDisplay from "../components/StatsDisplay";

export default function App() {
  const [stats, setStats] = useState<SensorStats | null>(null);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Smart Sensor Data Insights</h1>
      <UploadForm onStats={setStats} />
      {stats && <StatsDisplay stats={stats} />}
    </div>
  );
}
