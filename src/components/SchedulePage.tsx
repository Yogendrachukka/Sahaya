import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

const EVENTS = [
  { id: 1, title: 'Project Review', time: '10:00 AM – 11:00 AM', color: '#4e7a3a', day: 21 },
  { id: 2, title: 'Design Sync', time: '01:30 PM – 02:30 PM', color: '#b87820', day: 21 },
  { id: 3, title: 'Client Meeting', time: '11:00 AM – 12:00 PM', color: '#4e7a3a', day: 22 },
  { id: 4, title: 'Weekly Standup', time: '09:30 AM – 10:00 AM', color: '#888', day: 23 },
]

export default function SchedulePage() {
  const [selectedDay, setSelectedDay] = useState<number>(21);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="py-5 pr-7 pl-5 overflow-y-auto h-full"
    >
      <div className="bg-app-white rounded-2xl border border-app-border p-6 shadow-sm min-h-full flex gap-8">
        
        <div className="w-72 shrink-0">
          <div className="flex items-center gap-3 font-bold text-lg mb-6">
            <CalendarIcon className="w-6 h-6 text-app-ink" /> Schedule
          </div>
          
          <div className="flex justify-between items-center mb-4 px-1">
            <span className="text-[15px] font-semibold cursor-pointer hover:opacity-80">May 2025</span>
            <div className="flex gap-2 text-app-ink3">
              <ChevronLeft className="w-[18px] h-[18px] cursor-pointer hover:text-app-ink transition-colors" />
              <ChevronRight className="w-[18px] h-[18px] cursor-pointer hover:text-app-ink transition-colors" />
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-1 mb-6">
            {['MON','TUE','WED','THU','FRI','SAT','SUN'].map(day => (
              <div key={day} className="text-center text-[11px] font-bold text-app-ink3 py-2">{day}</div>
            ))}
            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
              <div 
                key={day} 
                onClick={() => setSelectedDay(day)}
                className={`text-center text-[13px] py-1.5 rounded-lg cursor-pointer transition-colors ${
                  selectedDay === day 
                    ? 'bg-app-ink text-white font-bold shadow-sm' 
                    : 'hover:bg-app-bg text-app-ink'
                } ${day === 1 ? 'col-start-4' : ''}`}
              >
                {day}
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 border-l border-app-border pl-8">
          <h3 className="text-lg font-bold mb-6">Events for May {selectedDay}, 2025</h3>
          
          <div className="flex flex-col gap-3">
            {EVENTS.filter(e => e.day === selectedDay).length === 0 ? (
               <div className="text-sm text-app-ink3 py-8 text-center border-2 border-dashed border-app-border rounded-xl">No events for this day.</div>
            ) : (
                EVENTS.filter(e => e.day === selectedDay).map(event => (
                  <div key={event.id} className="flex flex-col bg-app-bg rounded-xl p-4 border border-transparent hover:border-app-border transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: event.color }}></div>
                      <span className="font-semibold text-[15px] text-app-ink">{event.title}</span>
                    </div>
                    <div className="text-sm text-app-ink3 ml-4.5">{event.time}</div>
                  </div>
                ))
            )}
          </div>
        </div>

      </div>
    </motion.div>
  );
}
