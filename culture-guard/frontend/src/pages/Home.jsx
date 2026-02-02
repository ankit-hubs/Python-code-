import React from 'react';
import { motion as Motion } from 'framer-motion';
import { ShieldCheck, MessageSquare, Zap, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';

function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden transition-colors duration-300">
      
      <Navbar />

      {/* --- Hero Section --- */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-100 dark:bg-indigo-600/20 rounded-full blur-[120px] -z-10 transition-colors duration-300" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-100 dark:bg-purple-600/10 rounded-full blur-[100px] -z-10 transition-colors duration-300" />

        <div className="max-w-7xl mx-auto px-4 text-center">
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-6 transition-colors">
              {t('hero.tagline')}
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-slate-900 dark:text-white transition-colors">
              {t('hero.title_start')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                {t('hero.title_end')}
              </span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed transition-colors">
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button onClick={() => navigate('/analyzer')} className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold text-lg transition shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2">
                {t('hero.cta')} <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </Motion.div>
        </div>
      </section>

      {/* --- Features Grid --- */}
      <section id="features" className="py-24 bg-slate-50 dark:bg-slate-900/50 relative border-y border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white transition-colors">{t('features.title')}</h2>
            <p className="text-slate-600 dark:text-slate-400 transition-colors">{t('features.subtitle')}</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, title: t('features.risk_detection.title'), desc: t('features.risk_detection.desc') },
              { icon: MessageSquare, title: t('features.smart_rewrites.title'), desc: t('features.smart_rewrites.desc') },
              { icon: Zap, title: t('features.real_time_feedback.title'), desc: t('features.real_time_feedback.desc') }
            ].map((feature, i) => (
              <Motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-500/50 transition shadow-lg transition-colors"
              >
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg flex items-center justify-center mb-6 transition-colors">
                  <feature.icon className="text-indigo-600 dark:text-indigo-400 w-6 h-6 transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white transition-colors">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed transition-colors">{feature.desc}</p>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- How It Works Section --- */}
      <section id="how-it-works" className="py-24 bg-white dark:bg-slate-900 relative transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white transition-colors">How it Works</h2>
            <p className="text-slate-600 dark:text-slate-400 transition-colors">Three simple steps to perfect communication.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-slate-200 dark:bg-slate-800 -z-10 transition-colors" />

            {[
              { step: "1", title: t('how_it_works.step1.title'), desc: t('how_it_works.step1.desc') },
              { step: "2", title: t('how_it_works.step2.title'), desc: t('how_it_works.step2.desc') },
              { step: "3", title: t('how_it_works.step3.title'), desc: t('how_it_works.step3.desc') }
            ].map((item, i) => (
              <div key={i} className="text-center relative bg-white dark:bg-slate-900 p-4 transition-colors">
                <div className="w-16 h-16 mx-auto bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full flex items-center justify-center text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-6 shadow-lg relative z-10 transition-colors">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white transition-colors">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 transition-colors">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="py-8 text-center text-slate-500 text-sm border-t border-slate-200 dark:border-slate-800 transition-colors">
        <p>{t('footer.copyright')}</p>
        <p className="mt-2">{t('footer.built_with')}</p>
      </footer>

    </div>
  );
}

export default Home;