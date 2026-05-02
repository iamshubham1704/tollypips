'use client'
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Heart, X } from 'lucide-react';

const DonateButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    const modal = (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 font-sans" onClick={() => setIsOpen(false)}>
            <div 
                className="bg-white border-4 border-black p-8 rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-sm w-full relative flex flex-col items-center"
                onClick={e => e.stopPropagation()}
            >
                <button 
                    className="absolute top-4 right-4 text-black hover:text-red-500 hover:rotate-90 transition-all bg-yellow-400 border-2 border-black rounded-full p-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    onClick={() => setIsOpen(false)}
                >
                    <X size={20} strokeWidth={3} />
                </button>
                
                <h2 className="text-3xl font-black uppercase mb-2 text-center mt-2 text-black" style={{ fontFamily: 'var(--font-bangers)' }}>Support Us!</h2>
                <p className="text-center font-bold mb-6 text-gray-700 text-[16px] font-sans max-w-[280px]">
                    If you like our design, tools, or anything about the website, your small contribution means a lot! ❤️
                </p>
                
                <div className="bg-[#00BAF2] p-4 rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-full flex flex-col items-center">
                    <div className="bg-white p-2 rounded-lg w-full max-w-[200px] aspect-square flex items-center justify-center border-2 border-black overflow-hidden relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                            src="/donation-qr.png" 
                            alt="Donate QR Code" 
                            className="w-full h-full object-contain"
                            onError={(e) => {
                                // Fallback to auto-generated QR if user hasn't saved the image to public/
                                e.currentTarget.src = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent('upi://pay?pa=9315863073@ptaxis&pn=Shubham Solanki&cu=INR')}`;
                            }} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <button 
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 bg-red-400 text-black p-4 border-4 border-black rounded-full hover:-translate-y-2 hover:drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center group shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.9)]"
                title="Support Us"
            >
                <Heart size={28} strokeWidth={3} className="fill-black group-hover:scale-110 transition-transform animate-pulse" />
            </button>

            {isOpen && createPortal(modal, document.body)}
        </>
    );
};

export default DonateButton;
