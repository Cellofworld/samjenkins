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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-300 text-sm mb-8">
            <BookOpen size={16} />
            <span>Интерактивный курс от нуля до DevOps</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Jenkins DevOps
            </span>
            <br />
            <span className="text-gray-200">Самоучитель</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
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
                <div className="text-2xl font-bold text-blue-400">{progress}%</div>
                <div className="text-xs text-gray-500">Прогресс</div>
              </div>
              <div className="w-px h-10 bg-gray-800" />
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{completedLessons}/{totalLessons}</div>
                <div className="text-xs text-gray-500">Уроков</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modules overview */}
      <div className="px-4 py-12 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-200">Программа курса</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {modules.map((module, index) => (
              <div
                key={module.id}
                className="p-4 bg-gray-900 border border-gray-800 rounded-xl hover:border-gray-700 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{module.icon}</span>
                  <span className="text-xs text-gray-500 font-mono">Модуль {index + 1}</span>
                </div>
                <h3 className="font-medium text-gray-200 mb-2">{module.title}</h3>
                <p className="text-sm text-gray-500">{module.description}</p>
                <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                  <span>{module.lessons.length} уроков</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="px-4 py-12 border-t border-gray-800 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-200">Что вы получите</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <BookOpen size={24} className="text-blue-400" />
              </div>
              <h3 className="font-medium text-gray-200 mb-2">Подробная теория</h3>
              <p className="text-sm text-gray-500">Каждая концепция объяснена с примерами и аналогиями</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Trophy size={24} className="text-purple-400" />
              </div>
              <h3 className="font-medium text-gray-200 mb-2">Практические задания</h3>
              <p className="text-sm text-gray-500">Реальные задачи с подсказками и готовыми решениями</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={24} className="text-green-400" />
              </div>
              <h3 className="font-medium text-gray-200 mb-2">Production-ready</h3>
              <p className="text-sm text-gray-500">Навыки для реальных проектов и DevOps-позиций</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
