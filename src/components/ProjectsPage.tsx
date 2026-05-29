import { Square, MoreHorizontal, LayoutGrid, List } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

const PROJECTS = [
  { id: 1, name: 'Sustainable Packaging', icon: '📦', status: 'Active', color: '#4e7a3a', progress: 72, tasks: 6 },
  { id: 2, name: 'Website Redesign', icon: '🖥', status: 'In Progress', color: '#b87820', progress: 45, tasks: 12 },
  { id: 3, name: 'Brand Guidelines', icon: '🎨', status: 'Planning', color: '#888', progress: 10, tasks: 8 },
  { id: 4, name: 'Marketing Campaign', icon: '📣', status: 'On Hold', color: '#bbb', progress: 30, tasks: 5 }
];

export default function ProjectsPage() {
  const [viewMode, setViewMode] = useState<'grid'|'list'>('grid');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="py-5 pr-7 pl-5 overflow-y-auto h-full"
    >
      <div className="bg-app-white rounded-2xl border border-app-border p-6 shadow-sm min-h-full">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3 font-bold text-lg">
            <Square className="w-6 h-6 text-app-ink" /> Projects
          </div>
          <div className="flex gap-2 bg-app-bg p-1 rounded-lg">
            <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-md cursor-pointer ${viewMode === 'grid' ? 'bg-app-white shadow-sm text-app-ink' : 'text-app-ink3 hover:text-app-ink'}`}><LayoutGrid className="w-4 h-4" /></button>
            <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-md cursor-pointer ${viewMode === 'list' ? 'bg-app-white shadow-sm text-app-ink' : 'text-app-ink3 hover:text-app-ink'}`}><List className="w-4 h-4" /></button>
          </div>
        </div>
        
        <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {PROJECTS.map(proj => (
            <div key={proj.id} className={`border border-app-border rounded-xl p-5 hover:border-app-ink transition-colors cursor-pointer group ${viewMode === 'list' ? 'flex items-center gap-6' : ''}`}>
              <div className={`flex justify-between items-start ${viewMode === 'grid' ? 'mb-4' : 'flex-none'}`}>
                <div className="w-10 h-10 bg-app-bg rounded-lg flex items-center justify-center text-xl shadow-sm">{proj.icon}</div>
                {viewMode === 'grid' && <button className="text-app-ink3 hover:text-app-ink"><MoreHorizontal className="w-5 h-5" /></button>}
              </div>
              
              <div className={viewMode === 'list' ? 'flex-1 grid grid-cols-3 items-center' : ''}>
                <h3 className={`font-semibold text-[15px] ${viewMode === 'grid' ? 'mb-2' : ''}`}>{proj.name}</h3>
                
                <div className={`flex items-center gap-1.5 text-xs ${viewMode === 'grid' ? 'mb-6' : ''}`}>
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: proj.color }}></span>
                  <span style={{ color: proj.color }} className="font-medium">{proj.status}</span>
                </div>
                
                <div className={viewMode === 'list' ? 'w-48 ml-auto text-right' : ''}>
                  <div className={`flex justify-between text-xs text-app-ink3 mb-1.5 ${viewMode === 'list' ? 'justify-end gap-2' : ''}`}>
                    <span className={viewMode === 'list' ? 'hidden' : ''}>Progress</span>
                    <span className="font-medium text-app-ink">{proj.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-app-bg rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${proj.progress}%`, backgroundColor: proj.color }}></div>
                  </div>
                </div>
              </div>
              
              {viewMode === 'list' && <button className="text-app-ink3 hover:text-app-ink ml-4"><MoreHorizontal className="w-5 h-5" /></button>}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
