import React, { useEffect, useState } from "react";

function History() {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/insights")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch insights");
        return res.json();
      })
      .then((data) => {
        setHistory(data);
        setError("");
      })
      .catch(() => {
        setError("Failed to load history.");
      });
  }, []);

  return (
    <div className="bg-gray-100 rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4"> History</h2>

      {error && <p className="text-red-500">{error}</p>}
      {history.length === 0 && !error && (
        <p className="text-gray-500">No history yet.</p>
      )}

      {/* History list with stronger space */}
      <div className="flex flex-col gap-6">
        {history.map((doc, idx) => (
          <div
            key={idx}
            className="bg-gray-300 rounded-lg p-5 shadow-lg transition hover:shadow-xl"
          >
            <div className="font-semibold text-gray-800 flex items-center gap-2">
              {doc.filename}
            </div>
            <p className="text-gray-700 text-sm mt-2">{doc.summary}</p>
            {doc.timestamp && (
              <p className="text-xs text-gray-600 mt-1">{doc.timestamp}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;
