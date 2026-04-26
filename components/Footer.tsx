"use client";

import React from 'react';
import Link from 'next/link';
import { Mail, Heart } from 'lucide-react';

const GithubIcon = ({ size = 24, ...props }: React.SVGProps<SVGSVGElement> & { size?: number | string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={props.strokeWidth || "2.5"} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

const TwitterIcon = ({ size = 24, ...props }: React.SVGProps<SVGSVGElement> & { size?: number | string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={props.strokeWidth || "2.5"} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-background border-t-8 border-foreground relative overflow-hidden">
      {/* Decorative top border accents */}
      <div className="absolute top-0 left-10 w-20 h-8 bg-yellow-400 border-x-4 border-b-4 border-foreground rounded-b-xl" />
      <div className="absolute top-0 right-20 w-16 h-12 bg-pink-400 border-x-4 border-b-4 border-foreground rounded-b-xl" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block group mb-6">
              <h2 className="text-5xl font-black tracking-widest text-foreground uppercase drop-shadow-[4px_4px_0px_rgba(34,197,94,1)] dark:drop-shadow-[4px_4px_0px_rgba(34,197,94,0.5)] transition-transform group-hover:-translate-y-1">
                TollyPips
              </h2>
            </Link>
            <p className="text-xl font-bold text-foreground/80 mb-8 max-w-sm" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              The ultimate backpack of tools. Fast, free, and unapologetically bold.
            </p>
            <div className="flex gap-4">
              {[
                { icon: TwitterIcon, color: 'bg-blue-400', href: '#' },
                { icon: GithubIcon, color: 'bg-purple-400', href: '#' },
                { icon: Mail, color: 'bg-yellow-400', href: '#' }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, rotate: 5, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-14 h-14 border-4 border-foreground rounded-2xl flex items-center justify-center ${social.color} shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.9)] transition-colors text-black`}
                >
                  <social.icon strokeWidth={2.5} size={24} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-2xl font-black uppercase tracking-wider mb-6 text-foreground">Explore</h3>
            <ul className="space-y-4">
              {['Home', 'About', 'Tools', 'Pricing'].map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link === 'Home' ? '/' : link === 'About' ? '/#about' : `/${link.toLowerCase()}`}
                    className="text-lg font-bold text-foreground/70 hover:text-foreground hover:underline decoration-4 underline-offset-4 decoration-pink-400 transition-all uppercase tracking-wide"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-2xl font-black uppercase tracking-wider mb-6 text-foreground">Legal</h3>
            <ul className="space-y-4">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link, index) => (
                <li key={index}>
                  <Link 
                    href="#"
                    className="text-lg font-bold text-foreground/70 hover:text-foreground hover:underline decoration-4 underline-offset-4 decoration-yellow-400 transition-all uppercase tracking-wide"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t-4 border-foreground border-dashed flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-lg font-bold text-foreground/80 text-center md:text-left">
            © {new Date().getFullYear()} TollyPips. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-lg font-bold text-foreground/80 bg-green-400/20 px-4 py-2 rounded-xl border-2 border-foreground border-dashed">
            Made with <Heart className="text-red-500 fill-red-500 animate-pulse" size={20} /> by TollyPips Team
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
