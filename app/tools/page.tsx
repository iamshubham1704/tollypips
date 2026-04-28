"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, FileSignature, CalendarClock, ExternalLink, Wrench, Type } from 'lucide-react';

const tools = [
  {
    id: 'context-passport',
    title: 'Context Passport',
    description: 'An intelligent browser extension to save, compress, and transfer your AI chat context across different platforms.',
    icon: BrainCircuit,
    color: 'bg-yellow-400',
    link: 'https://github.com/iamshubham1704/passport.git',
    status: 'Available',
  },
  {
    id: 'pdf-editor',
    title: 'PDF Editor',
    description: 'Add text, images, and redact content from PDFs right in your browser. No server uploads required.',
    icon: FileSignature,
    color: 'bg-pink-400',
    link: '/tools/pdf-editor',
    status: 'Available',
  },
  {
    id: 'tolly-humaniser',
    title: 'Tolly Humaniser',
    description: 'Converts your AI articles to human language seamlessly.',
    icon: Type,
    color: 'bg-purple-400',
    link: '/tools/humaniser',
    status: 'Available',
  },
  {
    id: 'attendance-manager',
    title: 'Attendance Manager',
    description: 'Track your university attendance with ease. Get smart predictions on how many classes you can afford to miss.',
    icon: CalendarClock,
    color: 'bg-green-400',
    status: 'Coming Soon',
  }
];

const containerVariants: import('framer-motion').Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants: import('framer-motion').Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 10 }
  }
};

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden pt-32 pb-24 px-6 md:px-12">
      
      {/* Neo-Brutalist Background Elements */}
      <div className="absolute top-40 right-10 w-24 h-24 bg-blue-400 rounded-full border-4 border-foreground -z-10 animate-pulse" />
      <div className="absolute bottom-20 left-20 w-32 h-32 bg-yellow-400 border-4 border-foreground rotate-12 -z-10" />
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 -z-20 h-full w-full bg-background bg-[linear-gradient(to_right,#80808033_2px,transparent_2px),linear-gradient(to_bottom,#80808033_2px,transparent_2px)] bg-size-[60px_60px]"></div>

      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="inline-flex bg-green-400 text-black px-6 py-2 rounded-full border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.9)] font-bold uppercase tracking-widest items-center gap-2 mb-8">
            <Wrench size={20} />
            <span>The Arsenal</span>
          </div>
          
          <h1 className="text-6xl md:text-9xl font-black uppercase tracking-widest text-foreground drop-shadow-[6px_6px_0px_rgba(34,197,94,1)] mb-6">
            All Tools
          </h1>
          <p className="text-xl md:text-3xl font-bold text-foreground/80 max-w-3xl mx-auto" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            A growing collection of utilities to turbocharge your workflow. 
          </p>
        </motion.div>

        {/* Tools Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {tools.map((tool, index) => (
            <motion.div
              key={tool.id}
              variants={itemVariants}
              whileHover={{ 
                scale: tool.status === 'Available' ? 1.03 : 1, 
                rotate: index % 2 === 0 ? 1 : -1,
                y: tool.status === 'Available' ? -5 : 0
              }}
              className={`group relative p-8 rounded-3xl border-4 border-foreground ${tool.color} shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.9)] flex flex-col transition-all duration-300 overflow-hidden ${tool.status !== 'Available' ? 'opacity-80 grayscale-20' : ''}`}
            >
              
              {/* Status Overlay Style for the card */}
              {tool.status !== 'Available' && (
                <div className="absolute -right-12 top-8 bg-black text-white font-black uppercase tracking-widest py-2 px-14 rotate-45 border-y-4 border-foreground/50 shadow-lg z-10 text-sm">
                  {tool.status}
                </div>
              )}

              {/* Icon */}
              <div className="w-20 h-20 bg-white border-4 border-black rounded-2xl flex items-center justify-center mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform group-hover:-translate-y-2 transition-transform duration-300">
                <tool.icon className="w-10 h-10 text-black" strokeWidth={2.5} />
              </div>
              
              <h3 className="text-3xl font-black mb-4 tracking-widest text-black uppercase leading-tight">
                {tool.title}
              </h3>
              
              <p className="text-lg font-bold text-black/80 leading-relaxed grow mb-8" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                {tool.description}
              </p>

              {/* Action Button */}
              {tool.status === 'Available' ? (
                <a 
                  href={tool.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-white text-black px-6 py-4 rounded-xl border-4 border-foreground text-xl font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2 hover:bg-black hover:text-white transition-colors"
                >
                  Open Tool
                  <ExternalLink strokeWidth={3} size={20} />
                </a>
              ) : (
                <button 
                  disabled
                  className="w-full bg-black/10 text-black/50 px-6 py-4 rounded-xl border-4 border-black/20 text-xl font-black uppercase tracking-widest cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {tool.status === 'Coming Soon' ? 'In Development' : 'Stay Tuned'}
                </button>
              )}
              
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
}