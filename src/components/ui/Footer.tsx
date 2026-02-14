'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative z-10 w-full mt-32 border-t border-white/5 glass py-20 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* About Us */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h4 className="text-neon-blue font-bold uppercase tracking-widest text-sm mb-6">About Us</h4>
          <p className="text-white/60 text-sm leading-relaxed">
            SiteScope AI is a team of AI architects and design enthusiasts dedicated to making the web a more beautiful and functional place. We believe that every website deserves an elite-level audit.
          </p>
        </motion.div>

        {/* Journey */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h4 className="text-neon-purple font-bold uppercase tracking-widest text-sm mb-6">Our Journey</h4>
          <p className="text-white/60 text-sm leading-relaxed">
            Started in 2024, we realized that traditional SEO tools were too boring. We combined 3D visuals with "Big Data" AI to create a platform that feels like the future of web intelligence.
          </p>
        </motion.div>

        {/* What's Special */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">What's Special</h4>
          <ul className="space-y-4 text-white/60 text-sm">
            <li className="flex gap-2">
              <span className="text-neon-blue">✦</span> Hyper-accurate Big Data Audit
            </li>
            <li className="flex gap-2">
              <span className="text-neon-blue">✦</span> 3D Immersive Dashboard
            </li>
            <li className="flex gap-2">
              <span className="text-neon-blue">✦</span> Audience Archetype Simulation
            </li>
          </ul>
        </motion.div>

        {/* How We Help */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">How We Help</h4>
          <p className="text-white/60 text-sm leading-relaxed mb-4">
            We empower Founders to pitch better, Developers to build faster, and Designers to validate their vision with high-conviction AI data.
          </p>
          <div className="flex gap-4">
            <span className="text-xs font-mono text-neon-blue uppercase tracking-tighter">#BuildTheWeb</span>
            <span className="text-xs font-mono text-neon-purple uppercase tracking-tighter">#AIFirst</span>
          </div>
        </motion.div>

      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-xl font-bold tracking-tighter">
          SiteScope <span className="text-gradient">AI</span>
        </div>
        <div className="text-xs text-white/40 uppercase tracking-widest">
          © 2026 SiteScope AI. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
