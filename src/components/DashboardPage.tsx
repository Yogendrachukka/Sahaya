import { Calendar as CalendarIcon, CheckSquare, ChevronLeft, ChevronRight, ListTodo, Briefcase, Activity, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

const INITIAL_TASKS = [
  { id: 1, title: 'Finalize packaging design', proj: 'Sustainable Packaging', date: 'Today', completed: false },
  { id: 2, title: 'Prepare launch assets', proj: 'Sustainable Packaging', date: 'Tomorrow', completed: false },
  { id: 3, title: 'Competitor analysis', proj: 'Website Redesign', date: 'May 24', completed: false }
];

export default function DashboardPage() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const completedCount = tasks.filter(t => t.completed).length;
  const progress = Math.round((completedCount / tasks.length || 0) * 100);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1, ease: "easeOut" }}
      className="py-5 px-7 overflow-y-auto h-full flex flex-col gap-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-app-ink">Dashboard Overview</h2>
          <p className="text-sm text-app-ink3 mt-1">Here is a summary of your workspace activities.</p>
        </div>
        <button className="bg-app-white border border-app-border rounded-[10px] px-4 py-2 text-[13px] font-semibold hover:bg-app-bg transition-colors">
          Download Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Metric 1 */}
        <div className="bg-app-white rounded-2xl border border-app-border p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-app-green-pill text-app-green-dark flex items-center justify-center">
            <CheckSquare className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[22px] font-bold">{completedCount}/{tasks.length}</div>
            <div className="text-sm text-app-ink3">Tasks Completed</div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-app-white rounded-2xl border border-app-border p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[22px] font-bold">4</div>
            <div className="text-sm text-app-ink3">Active Projects</div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-app-white rounded-2xl border border-app-border p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-700 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[22px] font-bold">12 hrs</div>
            <div className="text-sm text-app-ink3">Time Logged This Week</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-8">
        
        {/* Projects Progress */}
        <div className="bg-app-white rounded-2xl border border-app-border p-6 shadow-sm flex flex-col">
          <div className="flex items-center gap-2 font-bold text-base mb-6">
            <Activity className="w-[18px] h-[18px]" /> Project Progress
          </div>
          <div className="flex items-center justify-center gap-10 py-6">
            <div className="relative w-32 h-32 shrink-0">
              <svg width="128" height="128" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="64" cy="64" r="54" fill="none" stroke="#e6e8e0" strokeWidth="12" />
                <circle cx="64" cy="64" r="54" fill="none" stroke="var(--color-app-green-dark)" strokeWidth="12" strokeDasharray={`${progress * 3.39} 339`} strokeLinecap="round" className="transition-all duration-500" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="font-bold text-2xl text-app-ink">{progress}%</div>
                <div className="text-[10px] text-app-ink3 uppercase font-semibold">Overall</div>
              </div>
            </div>
            <div className="flex-1">
              <div className="font-semibold text-[15px] mb-1">Sustainable Packaging</div>
              <div className="flex items-center gap-2 text-xs text-app-green-mid mb-2">
                <span className="w-2 h-2 rounded-full bg-app-green-mid"></span> On track
              </div>
              <div className="text-xs text-app-ink3 mb-4">{completedCount} of {tasks.length} tasks completed this sprint.</div>
              <div className="flex gap-[4px] items-end h-[48px]">
                <div className="w-2 rounded-[3px] bg-app-green-light" style={{ height: '55%' }}></div>
                <div className="w-2 rounded-[3px] bg-app-green-light" style={{ height: '75%' }}></div>
                <div className="w-2 rounded-[3px] bg-app-green-light" style={{ height: '40%' }}></div>
                <div className="w-2 rounded-[3px] bg-app-green-light" style={{ height: '88%' }}></div>
                <div className="w-2 rounded-[3px] bg-app-green-dark transition-all duration-500" style={{ height: `${progress}%`, minHeight: '10%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Priority Tasks */}
        <div className="bg-app-white rounded-2xl border border-app-border p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 font-bold text-base">
              <ListTodo className="w-[18px] h-[18px]" /> Priority Tasks
            </div>
            <button className="text-[13px] text-app-green-mid hover:opacity-80 transition-opacity font-semibold">View All</button>
          </div>
          
          <div className="flex flex-col gap-1 mt-2">
            {tasks.length === 0 ? (
              <div className="text-xs text-app-ink3 py-4 text-center">No tasks found.</div>
            ) : (
              tasks.map((task) => (
                <div 
                  key={task.id} 
                  onClick={() => toggleTask(task.id)}
                  className="flex items-center gap-3 py-3 border-b border-app-bg group cursor-pointer last:border-0"
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border-[1.5px] transition-colors ${task.completed ? 'bg-app-green-mid border-app-green-mid text-white' : 'border-[#ccc] group-hover:border-app-green-mid'}`}>
                    {task.completed && <CheckSquare className="w-3.5 h-3.5" strokeWidth={3} />}
                  </div>
                  <div className="flex-1">
                    <div className={`text-[13.5px] font-medium transition-colors ${task.completed ? 'text-app-ink3 line-through' : 'group-hover:text-app-green-mid text-app-ink'}`}>
                      {task.title}
                    </div>
                  </div>
                  <div className="text-xs font-semibold text-app-ink3 bg-app-bg px-2 py-1 rounded whitespace-nowrap shrink-0">{task.date}</div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </motion.div>
  );
}
