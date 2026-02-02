import React from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="relative flex items-center group">
      <div className="absolute left-3 text-slate-400 dark:text-slate-500 pointer-events-none">
        <Languages className="w-4 h-4" />
      </div>
      <select
        onChange={changeLanguage}
        value={i18n.language}
        className="appearance-none bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 pl-9 pr-4 py-1.5 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer border border-transparent hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
        aria-label="Select Language"
      >
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="fr">Français</option>
        <option value="de">Deutsch</option>
        <option value="ja">日本語</option>
        <option value="pt">Português</option>
        <option value="zh">中文</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
