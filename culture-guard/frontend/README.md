# Culture Guard - Frontend

This is the React-based frontend for the Culture Guard application, built with Vite and Tailwind CSS.

## 🚀 Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ```
2.  **Start the development server**:
    ```bash
    npm run dev
    ```
3.  **Build for production**:
    ```bash
    npm run build
    ```

## 🛠 Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Internationalization**: i18next & react-i18next
- **Animations**: Framer Motion

## 📂 Project Structure

- `src/components`: Reusable UI components like `Navbar` and `LanguageSwitcher`.
- `src/pages`: Main application views (`Home` and `Analyzer`).
- `src/i18n.js`: Configuration for multi-language support.
- `public/locales`: JSON translation files for different languages.

## 🌐 Multi-language Support

The UI currently supports:
- English (en)
- Spanish (es)
- French (fr)
- German (de)
- Japanese (ja)
- Portuguese (pt)
- Chinese (zh)

Translations are managed in `public/locales/`.