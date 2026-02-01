import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, MessageSquare, Zap, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden transition-colors duration-300">
      
      <Navbar />

      {/* --- Hero Section --- */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-100 dark:bg-indigo-600/20 rounded-full blur-[120px] -z-10 transition-colors duration-300" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-100 dark:bg-purple-600/10 rounded-full blur-[100px] -z-10 transition-colors duration-300" />

        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-6 transition-colors">
              AI-Powered Cultural Intelligence
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-slate-900 dark:text-white transition-colors">
              Speak the Language of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                Culture & Trust
              </span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed transition-colors">
              Don't just translate words. Translate intent. Chater ensures your business messages are culturally safe, polite, and effective anywhere in the world.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button onClick={() => navigate('/analyzer')} className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold text-lg transition shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2">
                Analyze My Message <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- Features Grid --- */}
      <section id="features" className="py-24 bg-slate-50 dark:bg-slate-900/50 relative border-y border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white transition-colors">Why use Chater?</h2>
            <p className="text-slate-600 dark:text-slate-400 transition-colors">Stop guessing. Start connecting.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, title: "Risk Detection", desc: "Instantly spot phrases that might be offensive or misunderstood in your target country." },
              { icon: MessageSquare, title: "Smart Rewrites", desc: "Get AI-generated alternative phrasings that sound natural and professional to locals." },
              { icon: Zap, title: "Real-time Feedback", desc: "Analyze tone, hierarchy, and formality in milliseconds before you hit send." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-500/50 transition shadow-lg transition-colors"
              >
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg flex items-center justify-center mb-6 transition-colors">
                  <feature.icon className="text-indigo-600 dark:text-indigo-400 w-6 h-6 transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white transition-colors">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed transition-colors">{feature.desc}</p>
              </motion.div>
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
              { step: "1", title: "Select Region", desc: "Choose the country or culture you are communicating with." },
              { step: "2", title: "Draft Message", desc: "Type your email, Slack message, or proposal as you normally would." },
              { step: "3", title: "Get Analysis", desc: "Our AI checks for cultural nuance, risks, and offers polite alternatives." }
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
        <p>© 2026 Chater AI. All rights reserved.</p>
        <p className="mt-2">Built with ❤️ in Codespaces</p>
      </footer>

    </div>
  );
}

export default Home;