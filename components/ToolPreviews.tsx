'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';

const tools = [
  {
    title: 'PDF Editor',
    description: 'Edit, annotate, and manage your PDFs with blazing speed.',
    image: '/images/pdf_editor_mockup.png',
    color: 'bg-pink-400'
  },
  {
    title: 'Context Passport',
    description: 'Seamlessly transfer your coding context across environments.',
    image: '/images/context_passport_mockup.png',
    color: 'bg-cyan-400'
  },
  {
    title: 'Tolly Humaniser',
    description: 'Converts your AI articles to human language.',
    image: '/images/tolly_humaniser_mockup.png',
    color: 'bg-purple-400'
  },
  {
    title: 'Attendance Manager',
    description: 'Track attendance like a pro with real-time insights.',
    image: '/images/attendance_manager_mockup.png',
    color: 'bg-lime-400'
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 12
    }
  }
};

const ToolPreviews = () => {
  return (
    <section className="py-24 px-6 md:px-12 bg-white overflow-hidden relative border-t-8 border-b-8 border-black">
      {/* Neo-Brutalist Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-20"
        >
          <motion.div variants={itemVariants} className="inline-block mb-6">
            <span className="bg-yellow-400 text-black font-black uppercase tracking-widest px-6 py-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-lg md:text-xl transform -rotate-2 inline-block">
              Sneak Peek
            </span>
          </motion.div>
          <motion.h2 
            variants={itemVariants}
            className="text-5xl md:text-7xl font-black tracking-wider mb-6 text-black uppercase"
          >
            See Them In Action
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl text-black/80 max-w-3xl mx-auto font-bold"
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            Don&apos;t just take our word for it. Here is a preview of the unapologetically bold interfaces powering our tools.
          </motion.p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 gap-16"
        >
          {tools.map((tool, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-10`}
            >
              <div className="w-full lg:w-1/2">
                <div className={`p-8 md:p-12 border-8 border-black ${tool.color} shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rounded-3xl relative group`}>
                  <div className="absolute -top-6 -right-6 w-12 h-12 bg-white border-4 border-black rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-10 flex items-center justify-center font-black text-xl">
                    {index + 1}
                  </div>
                  <h3 className="text-4xl md:text-6xl font-black mb-6 uppercase text-black drop-shadow-sm">
                    {tool.title}
                  </h3>
                  <p className="text-xl md:text-2xl font-bold text-black/80 mb-8" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                    {tool.description}
                  </p>
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <motion.div 
                  whileHover={{ scale: 1.02, rotate: index % 2 === 0 ? 1 : -1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="rounded-3xl border-8 border-black overflow-hidden shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] bg-white relative aspect-video"
                >
                  <Image 
                    src={tool.image} 
                    alt={`${tool.title} interface preview`} 
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ToolPreviews;
