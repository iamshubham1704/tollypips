'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import {
    Calculator,
    FileText,
    Clock,
    BookOpen
} from 'lucide-react';

const features = [
    {
        icon: FileText,
        title: "Document Tools",
        description: "Convert, merge, and edit PDFs and documents with zero hassle.",
        color: "bg-emerald-400"
    },
    {
        icon: Calculator,
        title: "Utility Calcs",
        description: "Quickly calculate metrics, finances, and manage your daily tasks.",
        color: "bg-blue-400"
    },
    {
        icon: Clock,
        title: "Productivity",
        description: "AI tools designed to skyrocket your workflow and productivity.",
        color: "bg-orange-400"
    },
    {
        icon: BookOpen,
        title: "Resource Hub",
        description: "Access shared templates, assets, and quick reference materials.",
        color: "bg-purple-400"
    }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 12 }
  }
};

const About = () => {
    return (
        <section id="about" className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto flex flex-col items-center overflow-hidden">

            <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={containerVariants}
                className="text-center mb-20 max-w-3xl"
            >
                <motion.h2 
                    variants={itemVariants}
                    className="text-5xl md:text-7xl mb-8 font-black tracking-wider text-foreground drop-shadow-sm pb-2 uppercase"
                >
                    Everything You Need, <br /> All In One Place.
                </motion.h2>
                <motion.p 
                    variants={itemVariants}
                    className="text-xl md:text-2xl text-foreground/80 leading-relaxed font-medium"
                    style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                >
                    tollypips is the centralized platform designed for professionals and students alike.
                    Stop juggling between dozens of tabs. We bring all your daily essential tools
                    together in one seamless, lightning-fast experience.
                </motion.p>
            </motion.div>

            <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full"
            >
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        variants={itemVariants}
                        whileHover={{ 
                            scale: 1.05, 
                            rotate: index % 2 === 0 ? 3 : -3,
                            y: -10,
                            transition: { type: 'spring', stiffness: 300 }
                        }}
                        className={`group p-8 rounded-3xl border-4 border-foreground ${feature.color} shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.9)] flex flex-col items-center text-center transition-all duration-300 relative overflow-hidden`}
                    >
                        {/* Card internal decoration */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-500"></div>

                        <div className="w-20 h-20 bg-white border-4 border-black rounded-full flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform group-hover:-translate-y-2 transition-transform duration-300">
                            <feature.icon className="w-10 h-10 text-black" strokeWidth={2.5} />
                        </div>
                        <h3 className="text-3xl font-bold mb-3 tracking-widest text-black uppercase leading-tight">
                            {feature.title}
                        </h3>
                        <p 
                            className="text-black/80 font-bold leading-relaxed" 
                            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                        >
                            {feature.description}
                        </p>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default About;