import { Search, Bell } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

export default function Header() {
  const [search, setSearch] = useState('');

  return (
    <motion.header 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.05, ease: "easeOut" }}
      className="bg-app-bg flex items-center justify-between px-7 border-b border-transparent shrink-0 h-[72px]"
    >
      <div className="flex items-center gap-3">
        <div className="text-[22px]">☀️</div>
        <div>
          <h1 className="text-[17px] font-bold tracking-[-0.3px]">Good morning, Arjun</h1>
          <p className="text-xs text-app-ink3">Here's what's happening with your projects today.</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-app-white border border-app-border rounded-[10px] py-[7px] px-[13px] w-[220px]">
          <Search className="w-[13px] h-[13px] text-app-ink3" />
          <input 
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search anything..."
            className="text-[13px] text-app-ink bg-transparent outline-none flex-1 placeholder:text-app-ink3" 
          />
          <kbd className="font-sans text-[10px] text-app-ink3 bg-app-bg px-[5px] py-[1px] rounded">⌘K</kbd>
        </div>
        <button className="w-9 h-9 rounded-full bg-app-white border border-app-border flex items-center justify-center cursor-pointer relative text-app-ink hover:bg-app-hover transition-colors">
          <Bell className="w-[15px] h-[15px]" />
          <div className="absolute top-[6px] right-[6px] w-2 h-2 bg-app-red rounded-full border-[1.5px] border-white"></div>
        </button>
      </div>
    </motion.header>
  );
}
