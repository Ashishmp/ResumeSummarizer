import requests
import PyPDF2
from collections import Counter
import re


def extract_text_from_pdf(path):
    reader = PyPDF2.PdfReader(path)
    return " ".join([page.extract_text() for page in reader.pages if page.extract_text()])
def clean_summary_text(text):
    # Remove markdown formatting (e.g., **bold**, *italic*)
    text = re.sub(r"\*\*(.*?)\*\*", r"\1", text)
    text = re.sub(r"\*(.*?)\*", r"\1", text)

    # Remove <think> tags or other XML-like tags
    text = re.sub(r"<[^>]+>", "", text)

    # Remove stray special characters except punctuation (. , - _)
    text = re.sub(r"[^\w\s\.,\-_]", "", text)

    # Normalize whitespace
    text = re.sub(r"\s+", " ", text).strip()

    return text

def summarize_with_sarvam(text):
    try:
        response = requests.post(
            "https://api.sarvam.ai/v1/chat/completions",
            headers={
                "api-subscription-key": "sk_iveqogis_XamwNq7wk4UG0geNlRmGBRIg",
                "Content-Type": "application/json"
            },
            json={
                "model": "sarvam-m",
                "messages": [
                    {
                        "role": "system",
                        "content": (
                            "You are a resume summarization assistant. Your task is to read resume content and return ONLY a professional "
                            "summary paragraph in third person. Do NOT explain your reasoning. Do NOT include anything other than the final summary. "
                            "Write concisely, under 100 words, highlighting education, current role, key skills, technologies, and achievements."
                        )
                    },
                    {
                        "role": "user",
                        "content": text[:8000]
                    }
                ],
                "temperature": 0.3,
                # "reasoning_effort": "medium"
            }
        )

        response.raise_for_status()
        result = response.json()
        summary_text = result.get("choices", [{}])[0].get("message", {}).get("content", "").strip()
        return clean_summary_text(summary_text)

    except Exception as e:
        print(f"❌ Sarvam AI call failed: {e}")
        return fallback_summary(text)

# def fallback_summary(text):
#     words = re.findall(r'\w+', text.lower())
#     common = Counter(words).most_common(5)
#     top_words = ", ".join([f"{w}" for w, _ in common])
#     return f"Summary not available. The resume mentions keywords like: {top_words}."
def fallback_summary(text):
    words = re.findall(r'\w+', text.lower())
    common = Counter(words).most_common(5)
    return "Summary not available. The resume mentions keywords like: " + ", ".join([w for w, _ in common]) + "."
