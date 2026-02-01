# Slack Message Culture Guard 🌍

An AI-powered assistant that helps users understand the cultural meaning, tone, and potential risks of a message before sending it to international colleagues.

## 🚀 Quick Start (Codespaces)

1.  **Open the Terminal** (Ctrl+`).
2.  **Run the startup script** from the root of the workspace:
    ```bash
    ./run_app.sh
    ```
3.  **Open the App**:
    *   Codespaces will notify you that ports 5173 and 8000 are available.
    *   Click "Open in Browser" for **port 5173** (the Frontend).

## 🛠 Manual Setup

If you prefer to run things manually:

**1. Backend (Python/FastAPI)**
```bash
cd culture-guard/backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

**2. Frontend (React/Vite)**
```bash
# In a new terminal
cd culture-guard/frontend
npm install
npm run dev
```

## 📂 File Structure

```
culture-guard/
├── backend/
│   ├── main.py            # FastAPI app & Analysis Logic (Mocks Lingo.dev)
│   └── requirements.txt   # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── App.jsx        # Main UI Component
│   │   ├── main.jsx       # Entry point
│   │   └── index.css      # Tailwind imports
│   ├── package.json       # Node dependencies
│   ├── tailwind.config.js # Styling configuration
│   └── vite.config.js     # Build tool configuration
└── README.md              # This file
```

## 🧠 How It Works

1.  **Input**: User types a message and selects a target country.
2.  **Processing**: The frontend sends this to the Python backend (`/analyze`).
3.  **Analysis (Mocked)**: 
    *   The backend simulates the `lingo.dev` API behavior.
    *   It checks against cultural heuristics for specific countries (Japan, Germany, Brazil, India).
    *   It detects tone (e.g., "ASAP" is flagged for Japan).
4.  **Output**: Returns a risk assessment, cultural explanation, and safer alternatives.

## ✨ Features

*   **Real-time Analysis**: Immediate feedback on your message.
*   **Cultural Context**: Explains *why* a message might be offensive.
*   **Safer Alternatives**: Provides rewrite suggestions.
*   **Modern UI**: Built with React and Tailwind CSS.
