import { CheckSquare, GripVertical } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const INITIAL_TASKS = [
  { id: 1, title: 'Finalize packaging design', proj: 'Sustainable Packaging', date: 'Today', completed: false },
  { id: 2, title: 'Prepare launch assets', proj: 'Sustainable Packaging', date: 'Tomorrow', completed: false },
  { id: 3, title: 'Competitor analysis', proj: 'Website Redesign', date: 'May 24', completed: false },
  { id: 4, title: 'Design system updates', proj: 'Brand Guidelines', date: 'May 25', completed: false },
  { id: 5, title: 'Review marketing copy', proj: 'Marketing Campaign', date: 'May 26', completed: false },
];

function SortableTask({ task, toggleTask }: { key?: string | number, task: any, toggleTask: (id: number) => void }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 20 : 1,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style}
      className={`relative flex items-center gap-4 p-4 border rounded-xl transition-colors group bg-app-white ${isDragging ? 'border-app-ink shadow-md' : 'border-app-border hover:border-app-green-mid'}`}
    >
      <div 
        {...attributes} 
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-app-ink3 hover:text-app-ink -ml-2 -mr-1"
      >
        <GripVertical className="w-5 h-5" />
      </div>
      <div 
        onClick={() => toggleTask(task.id)}
        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border-[1.5px] transition-colors cursor-pointer ${task.completed ? 'bg-app-green-mid border-app-green-mid text-white' : 'border-[#ccc] group-hover:border-app-green-mid'}`}>
        {task.completed && <CheckSquare className="w-4 h-4" strokeWidth={3} />}
      </div>
      <div className="flex-1 cursor-pointer" onClick={() => toggleTask(task.id)}>
        <div className={`text-[14px] font-medium transition-colors ${task.completed ? 'text-app-ink3 line-through' : 'group-hover:text-app-green-mid'}`}>
          {task.title}
        </div>
        <div className="text-xs text-app-ink3 mt-1">📁 {task.proj}</div>
      </div>
      <div className="text-xs font-medium text-app-ink3 bg-app-bg px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0">{task.date}</div>
    </div>
  );
}

export default function TasksPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const filteredTasks = tasks.filter(t => {
    if (activeTab === 'Due Today') return t.date === 'Today';
    if (activeTab === 'Upcoming') return t.date !== 'Today';
    return true;
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setTasks((items) => {
        const oldIndex = items.findIndex(t => t.id === active.id);
        const newIndex = items.findIndex(t => t.id === over.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="py-5 pr-7 pl-5 overflow-y-auto h-full"
    >
      <div className="bg-app-white rounded-2xl border border-app-border p-6 shadow-sm min-h-full">
        <div className="flex items-center gap-3 font-bold text-lg mb-6">
          <CheckSquare className="w-6 h-6 text-app-ink" /> All Tasks
        </div>
        
        <div className="flex gap-2 mb-6">
          {['All', 'Due Today', 'Upcoming'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-1.5 px-4 rounded-[20px] text-sm cursor-pointer transition-colors outline-none ${activeTab === tab ? 'bg-app-ink text-white font-semibold' : 'bg-app-bg text-app-ink2 hover:bg-[#e4e4dd]'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="flex flex-col gap-2">
            {filteredTasks.length === 0 ? (
              <div className="text-sm text-app-ink3 py-8 text-center border-2 border-dashed border-app-border rounded-xl">No tasks found.</div>
            ) : (
              <SortableContext 
                items={filteredTasks.map(t => t.id)}
                strategy={verticalListSortingStrategy}
              >
                {filteredTasks.map((task) => (
                  <SortableTask key={task.id} task={task} toggleTask={toggleTask} />
                ))}
              </SortableContext>
            )}
          </div>
        </DndContext>
      </div>
    </motion.div>
  );
}
