// frontend/src/api/journalApi.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// GET journals
export const getJournals = async (userId) => {
  const res = await API.get(`/journals/${userId}`);
  return res.data;
};

// SAVE journal
export const saveJournal = async (journal) => {
  const res = await API.post("/journals", journal);
  return res.data;
};

// UPDATE journal
export const updateJournal = async (id, journal) => {
  const res = await API.put(`/journals/${id}`, journal);
  return res.data;
};

// DELETE journal
export const deleteJournal = async (id) => {
  const res = await API.delete(`/journals/${id}`);
  return res.data;
};
