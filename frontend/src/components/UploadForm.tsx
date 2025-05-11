// frontend/src/components/UploadForm.tsx
import { useState } from "react";
import { uploadSensorData } from "../services/api/sensorService";
import type { SensorStats } from "../services/api/sensorService"; // ใช้ import type

export default function UploadForm({ onStats }: { onStats: (stats: SensorStats) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      return;
    }
    setLoading(true);
    try {
      const stats = await uploadSensorData(file);
      onStats(stats);
    } catch (err) {
      console.error(err);
      alert("Upload ล้มเหลว ลองใหม่อีกครั้ง");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow">
      <label htmlFor="file-input" className="sr-only">
        เลือกไฟล์ CSV หรือ JSON
      </label>
      <input
        id="file-input"
        type="file"
        accept=".csv,application/json"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        className="mb-2"
      />
      <button
        type="submit"
        disabled={!file || loading}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? "กำลังอัปโหลด..." : "อัปโหลดไฟล์"}
      </button>
    </form>
  );
}
