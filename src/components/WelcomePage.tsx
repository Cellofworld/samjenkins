import { Module } from '../data/courses';
import { BookOpen, ArrowRight, Trophy, CheckCircle } from 'lucide-react';

interface WelcomePageProps {
  modules: Module[];
  progress: number;
  completedLessons: number;
  totalLessons: number;
  onStart: () => void;
}

export default function WelcomePage({ modules, progress, completedLessons, totalLessons, onStart }: WelcomePageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-sm mb-8">
            <BookOpen size={16} />
            <span>Интерактивный курс от нуля до DevOps</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Jenkins DevOps
            </span>
            <br />
            <span className="text-slate-800">Самоучитель</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Полный курс по Jenkins и CI/CD: от первых шагов до production-ready пайплайнов.
            Теория, практика и реальные сценарии использования.
          </p>

          <button
            onClick={onStart}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-blue-500/25"
          >
            {completedLessons > 0 ? 'Продолжить обучение' : 'Начать обучение'}
            <ArrowRight size={20} />
          </button>

          {/* Stats */}
          {completedLessons > 0 && (
            <div className="mt-8 flex items-center justify-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{progress}%</div>
                <div className="text-xs text-slate-500">Прогресс</div>
              </div>
              <div className="w-px h-10 bg-slate-200" />
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{completedLessons}/{totalLessons}</div>
                <div className="text-xs text-slate-500">Уроков</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modules overview */}
      <div className="px-4 py-12 border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 text-slate-800">Программа курса</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {modules.map((module, index) => (
              <div
                key={module.id}
                className="p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{module.icon}</span>
                  <span className="text-xs text-slate-500 font-mono">Модуль {index + 1}</span>
                </div>
                <h3 className="font-medium text-slate-800 mb-2">{module.title}</h3>
                <p className="text-sm text-slate-600">{module.description}</p>
                <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                  <span>{module.lessons.length} уроков</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="px-4 py-12 border-t border-slate-200 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 text-slate-800">Что вы получите</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white rounded-xl border border-slate-200">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <BookOpen size={24} className="text-blue-600" />
              </div>
              <h3 className="font-medium text-slate-800 mb-2">Подробная теория</h3>
              <p className="text-sm text-slate-600">Каждая концепция объяснена с примерами и аналогиями</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl border border-slate-200">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Trophy size={24} className="text-purple-600" />
              </div>
              <h3 className="font-medium text-slate-800 mb-2">Практические задания</h3>
              <p className="text-sm text-slate-600">Реальные задачи с подсказками и готовыми решениями</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl border border-slate-200">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={24} className="text-green-600" />
              </div>
              <h3 className="font-medium text-slate-800 mb-2">Production-ready</h3>
              <p className="text-sm text-slate-600">Навыки для реальных проектов и DevOps-позиций</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
