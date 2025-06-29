# ResumeSummarizer

# 📝 Resume Summarizer

An AI-powered full-stack web application that allows users to upload resumes in PDF format and get smart, concise summaries using LLMs like Sarvam AI. Built using **React.js**, **FastAPI**, and **Python**.

---

## 🚀 Features

- Upload PDF resumes
- Extract text from PDF
- Generate summaries using Sarvam AI
- View previous uploaded resume summaries (history)
- Full-stack architecture (React frontend + FastAPI backend)

---

## 🛠 Tech Stack

- **Frontend**: React.js
- **Backend**: FastAPI (Python)
- **NLP/AI**: Sarvam AI (or pluggable LLM)
- **Database**: SQLite / Local storage
- **PDF Parsing**: PyPDF2

---

## 🖼️ Project Structure

ResumeSummarizer/
├── backend/
│   ├── venv/                 # Python virtual environment
│   ├── crud.py              # Database operations
│   ├── database.py          # DB connection setup
│   ├── main.py              # FastAPI entry point
│   ├── models.py            # SQLAlchemy models
│   ├── requirement.txt      # Python dependencies
│   ├── schema.py            # Pydantic schemas
│   ├── utils.py             # Resume parsing and LLM call
├── frontend/
│   ├── node_modules/        # Installed node packages
│   ├── public/              # Static files and HTML entry
│   ├── src/                 # React source code
│   │   ├── components/      # React components like UploadForm, History
│   │   ├── App.js           # Root component
│   │   └── index.js         # App entry point
│   ├── .gitignore           # Git ignore file
│   ├── package.json         # Project metadata & dependencies
│   ├── package-lock.json    # Exact dependency versions
└── README.md                # Documentation
├── uploads/                 # Resumes upload data





---

## ⚙️ Setup Instructions

### 1. Clone the Repository


git clone https://github.com/Ashishmp/ResumeSummarizer.git
cd ResumeSummarizer

### 2. Start Backend 


cd backend
python -m venv venv
# For Linux/macOS:
source venv/bin/activate
# For Windows:
venv\Scripts\activate

pip install -r requirements.txt

# Add your Sarvam API Key in `.env` or hardcode in summarizer.py
# Example .env format:
# SARVAM_API_KEY=your_sarvam_key_here

uvicorn main:app --reload


### 3. Start Frontend
cd ../frontend
npm install
npm start
