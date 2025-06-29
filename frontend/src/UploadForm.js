import React, { useState } from "react";

function UploadForm() {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "application/pdf") {
      setError("Only PDF files allowed.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setError("");
    setSummary("");

    try {
      const response = await fetch("http://localhost:8080/upload-resume", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Upload failed");
      const data = await response.json();
      setSummary(data.summary || "No summary returned.");
    } catch (err) {
      setError("Upload failed. Check backend or network.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-200 rounded-xl shadow-md p-8">
      <h2 className="text-xl font-semibold mb-4 text-center">Upload resume</h2>

      <label
        htmlFor="fileUpload"
        className="block border-2 border-dashed border-gray-400 p-6 bg-white rounded-lg text-center cursor-pointer hover:bg-gray-100 transition"
      >
        <span className="text-gray-700">Click or drag a PDF file here to upload</span>
        <input
          type="file"
          id="fileUpload"
          onChange={handleUpload}
          accept="application/pdf"
          className="hidden"
        />
      </label>

      {loading && <p className="mt-4 text-blue-600 text-center">Uploading...</p>}
      {error && <p className="mt-4 text-red-600 text-center">{error}</p>}

      {summary && !loading && (
        <div className="mt-6 bg-white p-4 rounded-md shadow-inner">
          <h3 className="font-medium mb-2">Summary</h3>
          <p className="text-gray-700">{summary}</p>
        </div>
      )}
    </div>
  );
}

export default UploadForm;
