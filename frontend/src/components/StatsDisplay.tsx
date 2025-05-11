// frontend/src/components/StatsDisplay.tsx
import { SensorStats } from "../services/api/sensorService";

export default function StatsDisplay({ stats }: { stats: SensorStats }) {
  return (
    <div className="mt-4 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-2">สถิติพื้นฐาน</h2>
      <ul className="list-disc list-inside">
        <li>Mean: {stats.mean.toFixed(2)}</li>
        <li>Median: {stats.median.toFixed(2)}</li>
        <li>Standard Deviation: {stats.std.toFixed(2)}</li>
      </ul>
    </div>
  );
}
