# Slack Message Culture Guard 🌍

An AI-powered assistant that helps users understand the cultural meaning, tone, and potential risks of a message before sending it to international colleagues.

## 📖 Overview

Culture Guard acts as a bridge for global communication, using advanced AI to analyze messages for cultural sensitivity. It identifies potential misunderstandings across 20+ different cultures and provides actionable advice to ensure your message lands the way you intend.

## ✨ Key Features

*   **Gemini AI Powered**: Leveraging Google's `gemini-2.5-flash` model for nuanced, context-aware cultural analysis.
*   **Global Support**: Pre-configured analysis for **20+ major global economies**, including Japan, Germany, Brazil, India, China, and the UAE.
*   **Bulk Analysis**: The "Select All Countries" feature allows you to cross-check a single message against every supported culture simultaneously.
*   **Multi-language Interface**: The UI is fully internationalized and available in:
    *   English (en)
    *   Spanish (es)
    *   French (fr)
    *   German (de)
    *   Japanese (ja)
    *   Portuguese (pt)
    *   Chinese (zh)
*   **Contextual Feedback**: Returns a risk assessment (Safe, Misunderstood, or Risky), detailed reasoning, and culturally appropriate rewrites.
*   **Modern UX**: A responsive, dark-mode compatible interface built with React 18, Tailwind CSS, and Framer Motion animations.

---

## 🛠 Tech Stack

### Frontend (User Interface)
*   **Framework**: React 18
*   **Build Tool**: Vite
*   **Styling**: Tailwind CSS
*   **Icons**: Lucide React
*   **Internationalization**: i18next & react-i18next
*   **Animations**: Framer Motion

### Backend (API & Logic)
*   **Framework**: FastAPI (Python 3.12+)
*   **AI Model**: Google Gemini (`gemini-2.5-flash`) via `google-generativeai`
*   **Fallback System**: A rule-based mock service ensures basic functionality even without an API key.

---

## 🚀 Quick Start (Codespaces)

1.  **Open the Terminal** (Ctrl+`).
2.  **Run the startup script** from the root of the workspace:
    ```bash
    ./run_app.sh
    ```
3.  **Open the App**:
    *   Codespaces will notify you that ports 5173 and 8000 are available.
    *   Click "Open in Browser" for **port 5173** (the Frontend).

---

## ⚙️ Manual Setup Guide

If you prefer to run the components manually or are developing locally:

### 1. Backend Setup

The backend handles the AI processing and cultural logic.

```bash
# Navigate to the backend directory
cd culture-guard/backend

# (Optional) Create a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure Environment
# Create a .env file and add your Gemini API Key (Optional but recommended)
echo "GEMINI_API_KEY=your_actual_api_key_here" > .env

# Start the Server
uvicorn main:app --reload --port 8000
```

### 2. Frontend Setup

The frontend provides the interactive web interface.

```bash
# Open a new terminal and navigate to the frontend directory
cd culture-guard/frontend

# Install Node dependencies
npm install

# Start the Development Server
npm run dev
```

---

## 📂 Project Structure

```
culture-guard/
├── backend/
│   ├── main.py            # FastAPI Application & Gemini Integration logic
│   ├── .env               # Environment variables (API Keys)
│   └── requirements.txt   # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable UI (Navbar, LanguageSwitcher)
│   │   ├── pages/         # Page Views (Home, Analyzer)
│   │   ├── App.jsx        # Main Layout & Routing
│   │   ├── i18n.js        # i18next Configuration
│   │   └── main.jsx       # Entry Point
│   ├── public/locales/    # Translation JSONs (en, es, fr, de, ja, pt, zh)
│   ├── package.json       # NPM dependencies
│   ├── tailwind.config.js # Tailwind CSS Configuration
│   └── vite.config.js     # Vite Configuration
└── README.md              # Project Documentation
```

## 🧠 How It Works

1.  **Input**: You type a business message and select a target country (or "Select All").
2.  **API Call**: The frontend sends this data to the FastAPI backend (`/analyze`).
3.  **Intelligent Processing**:
    *   **Gemini API**: The backend constructs a prompt for the Gemini LLM, asking it to act as a "Cultural Communication Expert". It evaluates the message for power distance, indirectness, and tone specific to the target region.
    *   **Mock Fallback**: If the API key is missing or invalid, the system seamlessly switches to a rule-based engine. This engine checks for common pitfalls (e.g., "ASAP" implies rudeness in Japan, direct "No" is avoided in India).
4.  **Result**: The system returns a JSON response containing the `risk_level`, `translated_meaning`, `reasoning`, and `alternatives`, which the frontend displays in an easy-to-read card format.