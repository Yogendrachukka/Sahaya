import { Search, Home, MessageSquare, Square, CheckSquare, Calendar, Settings, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

type SidebarProps = {
  activeNav: string;
  setActiveNav: (nav: string) => void;
  onNewChat: () => void;
};

export default function Sidebar({ activeNav, setActiveNav, onNewChat }: SidebarProps) {
  const [search, setSearch] = useState('');

  return (
    <motion.aside 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="w-[220px] shrink-0 bg-app-white border-r border-app-border flex flex-col py-5 pb-4 overflow-y-auto h-full"
    >
      {/* Logo */}
      <div className="flex items-center gap-[9px] px-[18px] pb-[18px]">
        <div className="w-8 h-8 bg-app-ink rounded-[9px] flex items-center justify-center text-base">🍀</div>
        <span className="font-bold text-base -tracking-[0.3px]">Sahaya</span>
      </div>

      <button 
        onClick={onNewChat}
        className="mx-[14px] mb-[14px] py-[9px] px-[14px] bg-app-ink text-white rounded-[10px] text-[13px] font-semibold flex items-center gap-1.5 hover:opacity-85 transition-opacity"
      >
        <span className="text-[17px] leading-none">+</span> New Chat
      </button>

      <div className="mx-[14px] mb-3 flex items-center gap-[7px] bg-app-bg rounded-lg py-[7px] px-2.5 outline-none focus-within:ring-1 focus-within:ring-app-border transition-all">
        <Search className="w-[13px] h-[13px] text-app-ink3 shrink-0" />
        <input 
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search chats..."
          className="text-[12px] flex-1 bg-transparent border-none outline-none text-app-ink placeholder:text-app-ink3"
        />
        <kbd className="font-sans text-[10px] text-app-ink3 bg-app-border px-[5px] py-[1px] rounded">⌘K</kbd>
      </div>

      <nav className="px-2">
        {[
          { icon: Home, label: 'Home' },
          { icon: MessageSquare, label: 'Chats' },
          { icon: Square, label: 'Projects' },
          { icon: CheckSquare, label: 'Tasks' },
          { icon: Calendar, label: 'Schedule' }
        ].map((item) => (
          <div 
            key={item.label} 
            onClick={() => setActiveNav(item.label)}
            className={`flex items-center gap-2.5 py-2 px-3 rounded-[9px] cursor-pointer text-[13px] transition-colors ${item.label === activeNav ? 'bg-app-hover text-app-ink font-semibold' : 'text-app-ink2 hover:bg-app-bg'}`}
          >
            <item.icon className="w-3.5 h-3.5 shrink-0" />
            {item.label}
          </div>
        ))}
      </nav>

      <div className="flex justify-between items-center px-[18px] pt-[14px] pb-[7px] text-[11px] font-bold text-app-ink3 tracking-[0.5px]">
        PROJECTS
        <button className="text-[18px] leading-none text-app-ink3 hover:text-app-ink transition-colors">+</button>
      </div>

      {[
        { icon: '📦', name: 'Sustainable Packaging', status: 'Active', color: '#4e7a3a' },
        { icon: '🖥', name: 'Website Redesign', status: 'In Progress', color: '#b87820' },
        { icon: '🎨', name: 'Brand Guidelines', status: 'Planning', color: '#888' },
        { icon: '📣', name: 'Marketing Campaign', status: 'On Hold', color: '#bbb' }
      ].map((proj) => (
        <div key={proj.name} className="flex items-center gap-[9px] py-1.5 px-2.5 rounded-[9px] mx-2 mb-[1px] cursor-pointer hover:bg-app-bg transition-colors">
          <div className="w-6 h-6 bg-app-bg rounded-md flex items-center justify-center text-xs text-app-ink2 shrink-0">{proj.icon}</div>
          <div>
            <div className="text-xs font-medium">{proj.name}</div>
            <div className="flex items-center gap-1 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: proj.color }}></span>
              <span style={{ color: proj.color }}>{proj.status}</span>
            </div>
          </div>
        </div>
      ))}

      <div className="text-xs text-app-ink3 py-1.5 px-[18px] cursor-pointer hover:text-app-green-mid transition-colors mt-1">
        View all projects →
      </div>

      <div className="flex-1"></div>

      <div className="px-2 mt-2">
        <div 
          onClick={() => setActiveNav('Settings')}
          className={`flex items-center gap-2.5 py-2 px-3 rounded-[9px] cursor-pointer text-[13px] transition-colors ${activeNav === 'Settings' ? 'bg-app-hover text-app-ink font-semibold' : 'text-app-ink2 hover:bg-app-bg'}`}
        >
          <Settings className="w-3.5 h-3.5 shrink-0" />
          Settings
        </div>
      </div>

      <div className="mx-3 mt-1 mb-3 py-2.5 px-[11px] bg-app-bg rounded-[11px] flex items-center gap-[9px] cursor-pointer hover:bg-[#e6e8e0] transition-colors">
        <div className="w-[33px] h-[33px] rounded-full bg-gradient-to-br from-[#8fad7a] to-[#4e7a3a] flex items-center justify-center text-sm text-white font-bold shrink-0">A</div>
        <div>
          <div className="text-xs font-semibold">Arjun Mehta</div>
          <div className="flex items-center gap-1 text-[11px] text-[#22c55e]">
            <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-[#22c55e]"></span>
            Product Designer
          </div>
        </div>
        <ChevronDown className="w-3.5 h-3.5 ml-auto text-app-ink3" />
      </div>
    </motion.aside>
  )
}
