import React from "react";
import UploadForm from "./UploadForm";
import History from "./History";

function DocumentInsight() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Upload Box */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <UploadForm />
        </div>

        {/* History Box */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <History />
        </div>
      </div>
    </div>
  );
}

export default DocumentInsight;
