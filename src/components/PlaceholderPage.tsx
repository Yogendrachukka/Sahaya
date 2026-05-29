import { motion } from 'motion/react';
import { ReactNode } from 'react';

type PlaceholderPageProps = {
  title: string;
  icon: ReactNode;
  goHome: () => void;
};

export default function PlaceholderPage({ title, icon, goHome }: PlaceholderPageProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="py-5 px-7 overflow-y-auto h-full flex flex-col"
    >
      <div className="bg-app-white rounded-2xl border border-app-border flex-1 flex flex-col items-center justify-center shadow-sm">
        <div className="w-20 h-20 rounded-[20px] bg-app-bg text-app-ink flex items-center justify-center mb-6 shadow-inner">
          {icon}
        </div>
        <h2 className="text-2xl font-bold text-app-ink mb-2">{title}</h2>
        <p className="text-app-ink3 text-[15px] mb-6">This section is currently under construction.</p>
        <button 
          onClick={goHome}
          className="px-6 py-2.5 bg-app-ink text-white rounded-xl font-semibold hover:opacity-85 transition-opacity cursor-pointer"
        >
          Go Back Home
        </button>
      </div>
    </motion.div>
  );
}
