"use client";

import About from "@/components/About";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-background">
      {/* Neo-Brutalist Background Elements */}
      <div className="absolute top-32 left-10 md:left-20 w-24 h-24 md:w-32 md:h-32 bg-yellow-400 rounded-full border-4 border-foreground -z-10 animate-bounce" style={{ animationDuration: '4s' }} />
      <div className="absolute top-64 right-10 md:right-32 w-16 h-16 md:w-24 md:h-24 bg-pink-400 border-4 border-foreground rotate-12 -z-10" />
      <div className="absolute top-1/2 left-10 w-12 h-12 bg-blue-400 border-4 border-foreground rounded-full -z-10" />
      
      {/* Background Grid Pattern (Neo-brutalist style) */}
      <div className="absolute inset-0 -z-20 h-full w-full bg-background bg-[linear-gradient(to_right,#80808033_2px,transparent_2px),linear-gradient(to_bottom,#80808033_2px,transparent_2px)] bg-size-[60px_60px]"></div>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh)] px-6 text-center pt-32 pb-24 relative z-10">
        
        

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[70px] md:text-[140px] font-black leading-[1.1] mb-8 text-foreground uppercase tracking-widest drop-shadow-[8px_8px_0px_rgba(244,114,182,1)]"
        >
          TollyPips
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[22px] md:text-[32px] font-bold text-foreground/80 mb-14 max-w-3xl"
          style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
        >
          Your all-in-one backpack of tools. Fast, free, and unapologetically bold.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-8 items-center"
        >
          <Link href="/tools"><motion.button 
            whileHover={{ scale: 1.05, rotate: -2 }}
            whileTap={{ scale: 0.95, y: 5, boxShadow: "0px 0px 0px 0px rgba(0,0,0,1)" }}
            className="group bg-green-400 text-black px-12 py-6 rounded-2xl border-4 border-foreground text-2xl font-black uppercase tracking-widest shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.9)] transition-all flex items-center gap-3"
          >
            Explore Tools
            <ArrowRight strokeWidth={3} size={28} className="group-hover:translate-x-2 transition-transform" />
          </motion.button></Link>

          <motion.button 
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95, y: 5, boxShadow: "0px 0px 0px 0px rgba(0,0,0,1)" }}
            className="bg-white text-black px-12 py-6 rounded-2xl border-4 border-foreground text-2xl font-black uppercase tracking-widest shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.9)] transition-all"
          >
            How It Works
          </motion.button>
        </motion.div>
      </div>

      <About />
      <Features/>
      <Footer/>

    </div>
  );
}
