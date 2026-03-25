import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getMoods = async () => {
  const res = await API.get("/moods/1");
  return res.data; // ✅ IMPORTANT
};

export const saveMood = async (mood) => {
  const res = await API.post("/moods", mood);
  return res.data;
};

export const getStreak = async () => {
  const res = await API.get("/moods/streak/1");
  return res.data;
};
