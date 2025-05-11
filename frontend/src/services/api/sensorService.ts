// frontend/src/services/api/sensorService.ts
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export interface SensorStats {
  mean: number;
  median: number;
  std: number;
}

export interface SensorRecord {
  id: number;
  name: string;
  value: number;
  timestamp: string;
}

export const uploadSensorData = async (file: File): Promise<SensorStats> => {
  const form = new FormData();
  form.append("file", file);
  const response = await api.post<SensorStats>("/sensors/upload", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const fetchSensorList = async (): Promise<SensorRecord[]> => {
  const response = await api.get<SensorRecord[]>("/sensors");
  return response.data;
};
