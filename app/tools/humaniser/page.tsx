"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Type, ArrowRight, ArrowDown, Copy, CheckCircle2, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function HumaniserPage() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const handleHumanize = async () => {
    if (!inputText.trim()) return;
    
    setIsLoading(true);
    setError("");
    
    try {
      const response = await fetch('/api/humanizer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }
      
      setOutputText(data.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to humanize text");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-background relative overflow-hidden pt-8 pb-24 px-6 md:px-12">
      
      {/* Neo-Brutalist Background Elements */}
      <div className="absolute top-40 right-10 w-24 h-24 bg-purple-400 rounded-full border-4 border-foreground -z-10 animate-pulse" />
      <div className="absolute bottom-20 left-20 w-32 h-32 bg-yellow-400 border-4 border-foreground rotate-12 -z-10" />
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 -z-20 h-full w-full bg-background bg-[linear-gradient(to_right,#80808033_2px,transparent_2px),linear-gradient(to_bottom,#80808033_2px,transparent_2px)] bg-size-[60px_60px]"></div>

      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex bg-purple-400 text-black px-6 py-2 rounded-full border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.9)] font-bold uppercase tracking-widest items-center gap-2 mb-8">
            <Type size={20} />
            <span>AI to Human</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-widest text-foreground drop-shadow-[6px_6px_0px_rgba(192,132,252,1)] mb-6">
            Tolly Humaniser
          </h1>
          <p className="text-xl md:text-2xl font-bold text-foreground/80 max-w-3xl mx-auto" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            Transform robotic AI text into natural, warm, and engaging human language.
          </p>
        </motion.div>

        {/* Main Interface */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col lg:flex-row gap-8 items-stretch justify-center"
        >
          
          {/* Input Section */}
          <div className="flex-1 flex flex-col bg-white border-4 border-foreground rounded-3xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.9)]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-black uppercase tracking-wider text-black">Input (AI Text)</h2>
              <span className="text-sm font-bold text-black/50 uppercase tracking-widest">{inputText.length} chars</span>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your AI-generated text here..."
              className="w-full flex-1 min-h-[300px] p-4 bg-gray-50 border-4 border-foreground rounded-xl text-lg text-black font-medium resize-none focus:outline-none focus:ring-4 focus:ring-purple-400/50"
              style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
            />
          </div>

          {/* Action Button (Desktop: Middle, Mobile: Stacked) */}
          <div className="flex items-center justify-center py-4 lg:py-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95, boxShadow: "0px 0px 0px 0px rgba(0,0,0,1)", y: 4 }}
              onClick={handleHumanize}
              disabled={isLoading || !inputText.trim()}
              className="bg-purple-400 text-black p-6 rounded-full border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.9)] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all z-10"
            >
              {isLoading ? (
                <Loader2 size={32} strokeWidth={3} className="animate-spin" />
              ) : (
                <>
                  <ArrowRight size={32} strokeWidth={3} className="hidden lg:block" />
                  <ArrowDown size={32} strokeWidth={3} className="block lg:hidden" />
                </>
              )}
            </motion.button>
          </div>

          {/* Output Section */}
          <div className="flex-1 flex flex-col bg-green-300 border-4 border-foreground rounded-3xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.9)] relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-black uppercase tracking-wider text-black">Output (Humanized)</h2>
              <button 
                onClick={handleCopy}
                disabled={!outputText}
                className="bg-white border-2 border-foreground p-2 rounded-lg hover:bg-black hover:text-white transition-colors disabled:opacity-50 text-black flex items-center gap-2"
                title="Copy to clipboard"
              >
                {copied ? <CheckCircle2 size={20} /> : <Copy size={20} />}
                <span className="font-bold text-sm uppercase hidden sm:block">{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            
            {error ? (
              <div className="w-full flex-1 min-h-[300px] p-4 bg-red-100 border-4 border-red-500 rounded-xl text-lg text-red-900 font-bold flex items-center justify-center text-center">
                {error}
              </div>
            ) : (
              <textarea
                value={outputText}
                readOnly
                placeholder="Your humanized text will appear here..."
                className="w-full flex-1 min-h-[300px] p-4 bg-white/90 border-4 border-foreground rounded-xl text-lg text-black font-medium resize-none focus:outline-none"
                style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
              />
            )}
          </div>

        </motion.div>

        {/* Back Button */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-16 flex justify-center"
        >
          <Link href="/tools">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-8 py-4 rounded-xl border-4 border-foreground text-xl font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.9)] hover:bg-black hover:text-white transition-colors"
            >
              Back to Tools
            </motion.button>
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
