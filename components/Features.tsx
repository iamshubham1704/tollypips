'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Zap, Unlock, Wrench } from 'lucide-react';

const features = [
  {
    title: 'Free to Use',
    description: 'Access all our premium tools without spending a single dime. No hidden fees, ever.',
    icon: Zap,
    color: 'bg-yellow-400',
  },
  {
    title: 'No Login Required',
    description: 'Jump straight into the action. No tedious sign-ups or email verifications needed.',
    icon: Unlock,
    color: 'bg-green-400',
  },
  {
    title: 'Advanced Tools',
    description: 'Equipped with a powerful, pro-level toolkit designed to supercharge your workflow.',
    icon: Wrench,
    color: 'bg-pink-400',
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10
    }
  }
};

const Features = () => {
  return (
    <section className="py-24 px-6 md:px-12 bg-background overflow-hidden relative">
      {/* Decorative animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div 
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1] 
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-5%] w-96 h-96 rounded-full bg-yellow-400/10 blur-[80px]"
        />
        <motion.div 
          animate={{ 
            rotate: [360, 0],
            scale: [1, 1.2, 1] 
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[40%] left-[-10%] w-120 h-120 rounded-full bg-pink-400/10 blur-[100px]"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-20"
        >
          
          <motion.h2 
            variants={itemVariants}
            className="text-6xl md:text-8xl font-black tracking-wider mb-8 text-foreground drop-shadow-sm uppercase"
          >
            Why Choose Us?
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto font-medium"
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            Experience the ultimate toolset designed for speed, simplicity, and raw power.
          </motion.p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                rotate: index % 2 === 0 ? 2 : -2,
                y: -10,
                transition: { type: 'spring', stiffness: 300 }
              }}
              className={`group p-10 rounded-3xl border-4 border-foreground ${feature.color} shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.9)] flex flex-col items-center text-center transition-all duration-300 relative overflow-hidden`}
            >
              {/* Card internal decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-500"></div>
              
              <div className="w-24 h-24 bg-white border-4 border-black rounded-full flex items-center justify-center mb-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform group-hover:-translate-y-2 transition-transform duration-300">
                <feature.icon className="w-12 h-12 text-black" strokeWidth={2.5} />
              </div>
              
              <h3 className="text-4xl font-bold mb-4 tracking-widest text-black uppercase leading-tight">
                {feature.title}
              </h3>
              
              <p 
                className="text-lg font-bold text-black/80 leading-relaxed" 
                style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
              >
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;