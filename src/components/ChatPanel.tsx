import { Pin, Mic, MoreHorizontal, Layout, Globe, Paperclip, Send, ChevronDown, Check, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useEffect, KeyboardEvent } from 'react';

type Message = {
  id: string;
  role: 'user' | 'ai';
  text: string;
  time: string;
  isInitialMock?: boolean;
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'msg-1',
    role: 'user',
    text: 'Create a social media post concept for our new eco-friendly packaging launch.',
    time: '10:24 AM',
    isInitialMock: true
  },
  {
    id: 'msg-2',
    role: 'ai',
    text: "Here's a social media post concept for your eco-friendly packaging launch.",
    time: '10:25 AM',
    isInitialMock: true
  }
];

type ChatPanelProps = {
  startEmpty?: boolean;
  key?: string | number;
};

export default function ChatPanel({ startEmpty = false }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>(startEmpty ? [] : INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const history = messages
        .filter(m => !m.isInitialMock)
        .map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }]
        }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text.trim(), history })
      });

      if (!res.ok) {
        throw new Error("Failed to fetch response from server.");
      }

      const data = await res.json();
      
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'ai',
        text: data.text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch (error: any) {
       console.error("Error computing ai response:", error);
       setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'ai',
        text: "Sorry, I ran into an error processing your request.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') handleSend(input);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1, ease: "easeOut" }}
      className="flex flex-col py-5 pr-5 pl-7 overflow-hidden h-full"
    >
      <div className="flex-1 bg-app-white rounded-2xl border border-app-border flex flex-col overflow-hidden shadow-sm">
        {/* Header */}
        <div className="py-[13px] px-[18px] border-b border-app-border flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold text-sm cursor-pointer hover:opacity-80">
            <span className="text-[15px]">✨</span>
            AI Assistant
            <ChevronDown className="w-3 h-3 text-app-ink3" />
          </div>
          <div className="flex gap-[14px] text-app-ink3 text-[15px]">
            <button className="hover:text-app-ink transition-colors cursor-pointer"><Pin className="w-[15px] h-[15px]" /></button>
            <button className="hover:text-app-ink transition-colors cursor-pointer"><Mic className="w-[15px] h-[15px]" /></button>
            <button className="hover:text-app-ink transition-colors cursor-pointer"><MoreHorizontal className="w-[15px] h-[15px]" /></button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 py-[22px] px-5 overflow-y-auto flex flex-col gap-5 scroll-smooth" ref={scrollRef}>
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div 
                key={msg.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className={msg.role === 'user' ? 'flex justify-end' : 'flex gap-[11px] items-start'}
              >
                {msg.role === 'user' ? (
                  <div className="bg-app-bg rounded-[16px_16px_4px_16px] py-[11px] px-[15px] max-w-[62%] shadow-sm">
                    <p className="text-[13.5px] leading-[1.55]">{msg.text}</p>
                    <div className="text-[11px] text-app-ink3 mt-1 text-right flex items-center justify-end gap-1">
                      {msg.time} 
                      <span className="flex"><Check className="w-[11px] h-[11px]" /><Check className="w-[11px] h-[11px] -ml-1.5" /></span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="w-8 h-8 rounded-full bg-app-bg flex items-center justify-center shrink-0 text-[15px] shadow-sm">✨</div>
                    <div className="flex-1">
                      <p className="text-[13.5px] text-app-ink2 mb-3 leading-[1.55]">{msg.text}</p>
                      
                      {msg.isInitialMock && (
                        <div className="border border-app-border rounded-[13px] overflow-hidden bg-app-white flex">
                          <div className="w-[160px] min-h-[180px] shrink-0 bg-gradient-to-br from-[#dce8cd] via-[#c8d9b4] to-[#b8cca0] flex items-center justify-center text-[52px] relative overflow-hidden">
                            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 60%, rgba(255,255,255,.25), transparent 70%)' }}></div>
                            <span className="relative z-10 drop-shadow-sm">🌿</span>
                          </div>
                          <div className="py-[15px] px-[17px] flex-1">
                            <div className="font-bold text-[13.5px] mb-1 flex items-center gap-[5px]">
                              Eco-Friendly Packaging Launch <span>🌱</span>
                            </div>
                            <div className="flex items-center gap-[5px] text-[11px] text-app-ink3 mb-[9px]">
                              <Layout className="w-3 h-3" /> Post Concept
                            </div>
                            <div className="text-[12.5px] text-app-ink2 leading-[1.6] mb-3">
                              Clean, minimal and nature-inspired design highlighting sustainability and our commitment to a better planet.
                            </div>
                            <div className="flex gap-1.5 flex-wrap">
                              <span className="px-2.5 py-[3px] rounded-full border border-[#cddebe] text-[11px] text-app-green-mid bg-app-green-pill font-medium">Sustainability</span>
                              <span className="px-2.5 py-[3px] rounded-full border border-[#cddebe] text-[11px] text-app-green-mid bg-app-green-pill font-medium">Minimal</span>
                              <span className="px-2.5 py-[3px] rounded-full border border-[#cddebe] text-[11px] text-app-green-mid bg-app-green-pill font-medium">Nature</span>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="text-[11px] text-app-ink3 mt-1.5">{msg.time}</div>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
            
            {isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-[11px] items-start">
                <div className="w-8 h-8 rounded-full bg-app-bg flex items-center justify-center shrink-0 text-[15px]">✨</div>
                <div className="flex items-center h-8 gap-1 px-3">
                  <span className="w-1.5 h-1.5 bg-app-ink3 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-app-ink3 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-app-ink3 rounded-full animate-bounce"></span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Quick Actions */}
        <div className="py-2.5 px-[18px] border-t border-app-border flex gap-[7px] items-center flex-wrap">
          {['Make it more vibrant', 'Add CTA suggestions', 'Create story version'].map((actionText) => (
            <button 
              key={actionText}
              onClick={() => setInput(actionText)}
              className="py-1.5 px-[13px] rounded-full border border-app-border bg-app-white text-[12px] text-app-ink2 cursor-pointer transition-colors hover:border-app-green-mid hover:bg-app-green-pill shadow-sm"
            >
              {actionText}
            </button>
          ))}
          <button 
            onClick={() => setMessages(INITIAL_MESSAGES)}
            className="w-8 h-8 rounded-full border border-app-border bg-app-white text-[14px] flex items-center justify-center cursor-pointer ml-auto text-app-ink3 hover:text-app-ink hover:bg-app-bg transition-colors shadow-sm"
            title="Reset Chat"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Input */}
        <div className="py-3 px-[18px] pb-[14px] border-t border-app-border flex items-center gap-2.5 bg-app-white">
          <Paperclip className="w-4 h-4 text-app-ink3 cursor-pointer hover:text-app-ink transition-colors" />
          <Globe className="w-4 h-4 text-app-ink3 cursor-pointer hover:text-app-ink transition-colors" />
          <Layout className="w-4 h-4 text-app-ink3 cursor-pointer hover:text-app-ink transition-colors" />
          
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message AI Assistant..." 
            className="flex-1 border-none outline-none text-[13.5px] text-app-ink bg-transparent placeholder-app-ink3 px-2 focus:ring-0" 
          />
          
          <button 
            onClick={() => handleSend(input)}
            disabled={!input.trim() || isTyping}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-md ${!input.trim() || isTyping ? 'bg-app-border text-app-ink3 cursor-not-allowed' : 'bg-app-ink text-white cursor-pointer hover:opacity-85 hover:scale-105 active:scale-95'}`}
          >
            <Send className="w-4 h-4 mr-0.5 mt-0.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
