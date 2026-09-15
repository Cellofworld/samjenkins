import { Module, Lesson } from '../data/courses';
import { CheckCircle, Circle, ChevronDown, ChevronRight, BookOpen, Trophy } from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  modules: Module[];
  selectedModule: Module | null;
  selectedLesson: Lesson | null;
  completedLessons: string[];
  onSelectLesson: (module: Module, lesson: Lesson) => void;
  progress: number;
  totalLessons: number;
}

export default function Sidebar({
  modules,
  selectedModule,
  selectedLesson,
  completedLessons,
  onSelectLesson,
  progress,
  totalLessons,
}: SidebarProps) {
  const [expandedModules, setExpandedModules] = useState<string[]>(
    selectedModule ? [selectedModule.id] : [modules[0]?.id]
  );

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev =>
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const getModuleProgress = (module: Module) => {
    const completed = module.lessons.filter(l => completedLessons.includes(l.id)).length;
    return { completed, total: module.lessons.length };
  };

  return (
    <div className="w-80 h-screen bg-gray-900 border-r border-gray-800 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <BookOpen size={20} className="text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-white">Jenkins DevOps</h1>
            <p className="text-xs text-gray-400">Интерактивный самоучитель</p>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Прогресс курса</span>
            <span className="text-blue-400 font-medium">{progress}%</span>
          </div>
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>{completedLessons.length} из {totalLessons} уроков</span>
            {progress === 100 && <Trophy size={14} className="text-yellow-400" />}
          </div>
        </div>
      </div>

      {/* Modules list */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {modules.map((module) => {
          const isExpanded = expandedModules.includes(module.id);
          const isSelected = selectedModule?.id === module.id;
          const moduleProgress = getModuleProgress(module);
          const isComplete = moduleProgress.completed === moduleProgress.total;

          return (
            <div key={module.id}>
              <button
                onClick={() => toggleModule(module.id)}
                className={`w-full flex items-center gap-2 p-3 rounded-lg text-left transition-all ${
                  isSelected
                    ? 'bg-gray-800 border border-gray-700'
                    : 'hover:bg-gray-800/50'
                }`}
              >
                <span className="text-xl">{module.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-200 truncate">
                      {module.title}
                    </span>
                    {isComplete && <CheckCircle size={14} className="text-green-400 flex-shrink-0" />}
                  </div>
                  <div className="text-xs text-gray-500">
                    {moduleProgress.completed}/{moduleProgress.total} уроков
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronDown size={16} className="text-gray-500" />
                ) : (
                  <ChevronRight size={16} className="text-gray-500" />
                )}
              </button>

              {isExpanded && (
                <div className="ml-4 mt-1 space-y-0.5 border-l-2 border-gray-800 pl-3">
                  {module.lessons.map((lesson) => {
                    const isLessonSelected = selectedLesson?.id === lesson.id;
                    const isLessonCompleted = completedLessons.includes(lesson.id);

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => onSelectLesson(module, lesson)}
                        className={`w-full flex items-center gap-2 p-2 rounded-md text-left text-sm transition-all ${
                          isLessonSelected
                            ? 'bg-blue-500/10 text-blue-300 border border-blue-500/30'
                            : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                        }`}
                      >
                        {isLessonCompleted ? (
                          <CheckCircle size={14} className="text-green-400 flex-shrink-0" />
                        ) : (
                          <Circle size={14} className="text-gray-600 flex-shrink-0" />
                        )}
                        <span className="truncate">{lesson.title}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
