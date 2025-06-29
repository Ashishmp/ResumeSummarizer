import os
import json
from fastapi import UploadFile
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Document
from utils import extract_text_from_pdf, summarize_with_sarvam, fallback_summary
import os


# Get absolute path of ../uploads relative to this file
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_DIR = os.path.abspath(os.path.join(BASE_DIR, "..", "uploads"))
os.makedirs(UPLOAD_DIR, exist_ok=True)

async def save_file_and_insights(file: UploadFile):
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())
    
    text = extract_text_from_pdf(file_path)
    
    try:
        summary_text = summarize_with_sarvam(text)
    except Exception:
        summary_text = fallback_summary(text)

    db: Session = SessionLocal()
    db_doc = Document(filename=file.filename, summary=summary_text)  # ✅ use summary_text

    db.add(db_doc)
    db.commit()
    db.refresh(db_doc)
    return {"filename": file.filename, "summary": summary_text}



def get_all_documents():
    db: Session = SessionLocal()
    return db.query(Document).all()
