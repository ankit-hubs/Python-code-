# Culture Guard - Backend

This is the FastAPI-based backend for the Culture Guard application. It leverages the Google Gemini API to provide cultural analysis of messages.

## 🚀 Getting Started

1.  **Install dependencies**:
    ```bash
    pip install -r requirements.txt
    ```
2.  **Environment Variables**:
    Create a `.env` file in this directory and add your Gemini API key:
    ```env
    GEMINI_API_KEY=your_api_key_here
    ```
3.  **Start the server**:
    ```bash
    uvicorn main:app --reload --port 8000
    ```

## 🧠 Core Logic

- **Gemini Integration**: Uses `google-generativeai` with the `gemini-2.5-flash` model.
- **Mock Fallback**: If no API key is present, a rule-based mock service provides basic cultural analysis for a subset of countries.
- **Endpoints**:
    - `POST /analyze`: Accepts a message and a country (or "Select All Countries") and returns a cultural risk assessment.

## 🛠 Tech Stack

- **Framework**: FastAPI
- **AI**: Google Gemini API
- **Language**: Python 3.12+
