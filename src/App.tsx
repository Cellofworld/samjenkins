import { useState, useEffect } from 'react';
import { courseModules, Module, Lesson } from './data/courses';
import Sidebar from './components/Sidebar';
import LessonView from './components/LessonView';
import WelcomePage from './components/WelcomePage';
import { Menu, X } from 'lucide-react';

function App() {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    const saved = localStorage.getItem('jenkins-completed-lessons');
    return saved ? JSON.parse(saved) : [];
  });
  const [showPractice, setShowPractice] = useState<number | null>(null);
  const [showSolution, setShowSolution] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem('jenkins-completed-lessons', JSON.stringify(completedLessons));
  }, [completedLessons]);

  const handleSelectLesson = (module: Module, lesson: Lesson) => {
    setSelectedModule(module);
    setSelectedLesson(lesson);
    setShowPractice(null);
    setShowSolution(null);
    setSidebarOpen(false);
  };

  const handleCompleteLesson = (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };

  const handleNextLesson = () => {
    if (!selectedModule || !selectedLesson) return;
    
    const lessonIndex = selectedModule.lessons.findIndex(l => l.id === selectedLesson.id);
    
    if (lessonIndex < selectedModule.lessons.length - 1) {
      handleSelectLesson(selectedModule, selectedModule.lessons[lessonIndex + 1]);
    } else {
      const moduleIndex = courseModules.findIndex(m => m.id === selectedModule.id);
      if (moduleIndex < courseModules.length - 1) {
        const nextModule = courseModules[moduleIndex + 1];
        handleSelectLesson(nextModule, nextModule.lessons[0]);
      }
    }
  };

  const handlePrevLesson = () => {
    if (!selectedModule || !selectedLesson) return;
    
    const lessonIndex = selectedModule.lessons.findIndex(l => l.id === selectedLesson.id);
    
    if (lessonIndex > 0) {
      handleSelectLesson(selectedModule, selectedModule.lessons[lessonIndex - 1]);
    } else {
      const moduleIndex = courseModules.findIndex(m => m.id === selectedModule.id);
      if (moduleIndex > 0) {
        const prevModule = courseModules[moduleIndex - 1];
        handleSelectLesson(prevModule, prevModule.lessons[prevModule.lessons.length - 1]);
      }
    }
  };

  const totalLessons = courseModules.reduce((acc, m) => acc + m.lessons.length, 0);
  const progress = Math.round((completedLessons.length / totalLessons) * 100);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg border border-slate-200 shadow-sm"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar
          modules={courseModules}
          selectedModule={selectedModule}
          selectedLesson={selectedLesson}
          completedLessons={completedLessons}
          onSelectLesson={handleSelectLesson}
          progress={progress}
          totalLessons={totalLessons}
        />
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 lg:ml-0 min-h-screen">
        {selectedLesson && selectedModule ? (
          <LessonView
            module={selectedModule}
            lesson={selectedLesson}
            isCompleted={completedLessons.includes(selectedLesson.id)}
            onComplete={() => handleCompleteLesson(selectedLesson.id)}
            onNext={handleNextLesson}
            onPrev={handlePrevLesson}
            showPractice={showPractice}
            setShowPractice={setShowPractice}
            showSolution={showSolution}
            setShowSolution={setShowSolution}
          />
        ) : (
          <WelcomePage
            modules={courseModules}
            progress={progress}
            completedLessons={completedLessons.length}
            totalLessons={totalLessons}
            onStart={() => {
              const firstModule = courseModules[0];
              handleSelectLesson(firstModule, firstModule.lessons[0]);
            }}
          />
        )}
      </main>
    </div>
  );
}

export default App;
