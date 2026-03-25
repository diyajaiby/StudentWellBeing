import React, { useState, useEffect } from "react";
import { saveJournal, getJournals } from "../api/journalApi";
import { useNavigate } from "react-router-dom";
import "./JournalEntry.css";

const TEST_USER_ID = "64f0c2b7d3f1a5b7c1e9f123";

const JournalEntry = ({ goBack }) => {
  const [text, setText] = useState("");
  const [todayJournal, setTodayJournal] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkTodayJournal = async () => {
      try {
        const journals = await getJournals(TEST_USER_ID);

        const today = new Date().toISOString().split("T")[0];

        const existing = journals.find((journal) => {
          const journalDate = new Date(journal.journal_date)
            .toISOString()
            .split("T")[0];
          return journalDate === today;
        });

        if (existing) {
          setTodayJournal(existing);
          setText(existing.journal_text);
        }
      } catch (err) {
        console.error("Error checking today's journal:", err);
      }
    };

    checkTodayJournal();
  }, []);

  const handleGoBack = () => {
    if (goBack) goBack();
    else navigate(-1);
  };

  const handleSave = async () => {
    if (!text.trim()) return alert("Write something");

    try {
      await saveJournal({
        user_id: TEST_USER_ID,
        journal_text: text,
      });

      alert("Journal saved!");
      handleGoBack();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Save failed. Check backend logs.");
    }
  };

  const handleEdit = () => {
    navigate("/journal-history", { state: { highlightToday: true } });
  };

  return (
    <div className="journal-wrapper">
      <div className="journal-container">
        <h2 className="journal-title">💗 Daily Journal</h2>

        {todayJournal && (
          <div className="info-card">
            <p>✨ You’ve already written today.</p>
            <button className="edit-btn" onClick={handleEdit}>
              Edit Today’s Entry
            </button>
          </div>
        )}

        <textarea
          rows={8}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your thoughts..."
          className="journal-textarea"
          disabled={!!todayJournal}
        />

        <div className="journal-buttons">
          {!todayJournal && (
            <button className="save-btn" onClick={handleSave}>
              Save 💖
            </button>
          )}
          <button className="back-btn" onClick={handleGoBack}>
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default JournalEntry;
