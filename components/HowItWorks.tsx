"use client";

import { motion } from "framer-motion";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Open Website",
      desc: "No sign-ups, no paywalls. Just land on TollyPips and you're ready to go.",
      color: "bg-pink-400",
    },
    {
      num: "02",
      title: "Use Tool",
      desc: "Pick what you need from our backpack of tools and get your work done fast.",
      color: "bg-yellow-400",
    },
    {
      num: "03",
      title: "Post on Internet",
      desc: "Flex your results online, share with friends, and spread the word about TollyPips!",
      color: "bg-blue-400",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 px-6 relative bg-background min-h-[calc(100vh-80px)] flex flex-col justify-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "radial-gradient(#000 2px, transparent 2px)", backgroundSize: "30px 30px" }}></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-[50px] md:text-[80px] font-black uppercase tracking-widest text-foreground drop-shadow-[6px_6px_0px_rgba(74,222,128,1)]">
            How It Works
          </h2>
          <p className="text-2xl font-bold mt-4 max-w-2xl mx-auto">
            Three simple steps to supercharge your workflow.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 2 : -2 }}
              className={`border-4 border-foreground ${step.color} p-8 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.9)] relative`}
            >
              <div className="absolute -top-6 -left-6 bg-white border-4 border-foreground w-16 h-16 flex items-center justify-center rounded-full font-black text-3xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black">
                {step.num}
              </div>
              <h3 className="text-3xl font-black uppercase tracking-widest mb-4 mt-4 text-black">{step.title}</h3>
              <p className="text-lg font-bold text-black/80">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
