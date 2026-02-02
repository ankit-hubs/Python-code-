import React, { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { Zap, ChevronDown, Check, AlertTriangle, XCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';

const COUNTRIES = [
  "Select All Countries",
  "United States", "Japan", "Germany", "Brazil", "India", "France", 
  "China", "South Korea", "United Arab Emirates", "Saudi Arabia", 
  "United Kingdom", "Spain", "Mexico", "Canada", "Australia", 
  "Netherlands", "Sweden", "Singapore", "Italy", "Russia"
];

function Analyzer() {
  const { t } = useTranslation();
  const [message, setMessage] = useState("");
  const [country, setCountry] = useState(COUNTRIES[1]); // Default to United States (index 1)
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleAnalyze = async () => {
    if (!message.trim()) return;
    setLoading(true);
    setResults(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: message, country: country })
      });
      const data = await response.json();
      // Ensure data is always an array
      setResults(Array.isArray(data) ? data : [data]);
    } catch (error) {
      console.error("Error analyzing:", error);
      alert("Failed to connect. Ensure the backend is running!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-300">
      
      <Navbar />

      {/* --- The Tool Section --- */}
      <div className="py-24 px-4 relative">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-colors">
            
            {/* Tool Header */}
            <div className="p-8 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800 transition-colors">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t('analyzer.title')}</h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">{t('analyzer.subtitle')}</p>
              </div>
              <div className="hidden sm:block">
                <span className="flex items-center gap-2 text-xs font-mono text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-400/10 px-3 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-green-500 dark:bg-green-400 animate-pulse"></span>
                  {t('analyzer.system_online')}
                </span>
              </div>
            </div>

            <div className="p-8 grid gap-8">
              {/* Country Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t('analyzer.target_region')}</label>
                <div className="relative">
                  <select 
                    value={country} 
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full appearance-none bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl p-4 pr-10 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-colors"
                  >
                    {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none w-5 h-5" />
                </div>
              </div>

              {/* Message Input */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t('analyzer.your_draft')}</label>
                <textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t('analyzer.placeholder')}
                  className="w-full h-40 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl p-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none transition-colors"
                />
              </div>

              {/* Action Button */}
              <button 
                onClick={handleAnalyze}
                disabled={loading || !message.trim()}
                className={`w-full py-4 rounded-xl font-bold text-lg transition flex items-center justify-center gap-3 ${
                  loading || !message.trim()
                    ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/25'
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t('analyzer.analyzing')}
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 fill-current" /> {t('analyzer.analyze_button')}
                  </>
                )}
              </button>
            </div>

            {/* --- Results Section --- */}
            <AnimatePresence>
              {results && (
                <Motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 transition-colors"
                >
                  <div className="p-8 space-y-12">
                    {results.map((res, idx) => (
                      <div key={idx} className="space-y-8 border-b border-slate-200 dark:border-slate-700 pb-8 last:border-0 last:pb-0">
                        {/* Header Badge */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{res.country}</h3>
                            <h3 className="text-lg font-bold text-slate-500 dark:text-slate-400 hidden sm:block">| {t('analyzer.report_title')}</h3>
                          </div>
                          <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full border ${
                            res.risk_level.includes("Safe") ? "bg-green-100 dark:bg-green-500/10 border-green-200 dark:border-green-500/30 text-green-700 dark:text-green-400" :
                            res.risk_level.includes("Risky") ? "bg-red-100 dark:bg-red-500/10 border-red-200 dark:border-red-500/30 text-red-700 dark:text-red-400" :
                            "bg-yellow-100 dark:bg-yellow-500/10 border-yellow-200 dark:border-yellow-500/30 text-yellow-700 dark:text-yellow-400"
                          }`}>
                             {res.risk_level.includes("Safe") ? <Check className="w-4 h-4" /> : 
                              res.risk_level.includes("Risky") ? <XCircle className="w-4 h-4" /> : 
                              <AlertTriangle className="w-4 h-4" />}
                             <span className="font-bold text-sm hidden sm:inline">{res.risk_level.split(' ')[1]} {res.risk_level.split(' ')[2]}</span>
                             <span className="font-bold text-sm sm:hidden">{res.risk_level.includes("Safe") ? "Safe" : "Risky"}</span>
                          </div>
                        </div>

                        {/* Interpretation */}
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors">
                            <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">{t('analyzer.local_interpretation')}</h4>
                            <p className="text-slate-700 dark:text-slate-200 italic">"{res.translated_meaning}"</p>
                          </div>
                          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-5 rounded-xl border border-indigo-200 dark:border-indigo-500/30 transition-colors">
                            <h4 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-3">{t('analyzer.cultural_context')}</h4>
                            <p className="text-indigo-900 dark:text-indigo-100">{res.reasoning}</p>
                          </div>
                        </div>

                        {/* Alternatives */}
                        {res.alternatives.length > 0 && (
                          <div className="bg-green-50 dark:bg-green-900/10 p-6 rounded-xl border border-green-200 dark:border-green-500/20 transition-colors">
                            <h4 className="text-sm font-bold text-green-700 dark:text-green-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                              <Check className="w-4 h-4" /> {t('analyzer.recommended_revisions')}
                            </h4>
                            <ul className="space-y-3">
                              {res.alternatives.map((alt, index) => (
                                <li key={index} className="flex gap-3 group">
                                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 flex items-center justify-center text-xs font-bold mt-0.5 transition-colors">
                                    {index + 1}
                                  </span>
                                  <span className="text-slate-700 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white transition cursor-text select-all">
                                    {alt}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </Motion.div>
              )}
            </AnimatePresence>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analyzer;