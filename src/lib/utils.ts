import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    Authorization:
      "Bearer " +
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBjMzUwNDllLTFmNzgtNGMxMC04ZDE3LTllY2IxNjYwYzY1OCIsImVtYWlsIjoidGVzdEBtYWlsLmNvbSIsImlhdCI6MTczMDA0NDgwOH0.WjvWW_1MdqttT0nFXDwTHstxIFanCRrn_DxZFXPVi3U",
  },
});
