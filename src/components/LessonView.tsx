import { Module, Lesson } from '../data/courses';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  Eye,
  EyeOff,
  BookOpen,
  Code,
  Target,
  Key,
  Copy,
  Check,
} from 'lucide-react';
import { useState } from 'react';

interface LessonViewProps {
  module: Module;
  lesson: Lesson;
  isCompleted: boolean;
  onComplete: () => void;
  onNext: () => void;
  onPrev: () => void;
  showPractice: number | null;
  setShowPractice: (index: number | null) => void;
  showSolution: number | null;
  setShowSolution: (index: number | null) => void;
}

export default function LessonView({
  module,
  lesson,
  isCompleted,
  onComplete,
  onNext,
  onPrev,
  showPractice,
  setShowPractice,
  showSolution,
  setShowSolution,
}: LessonViewProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string, key: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(key);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <span>{module.icon}</span>
        <span>{module.title}</span>
        <span>/</span>
        <span className="text-gray-300">{lesson.title}</span>
      </div>

      {/* Title */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{lesson.title}</h1>
        <p className="text-gray-400 text-lg">{lesson.description}</p>
      </div>

      {/* Theory Section */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
            <BookOpen size={18} className="text-blue-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-200">Теория</h2>
        </div>

        <div className="space-y-4">
          {lesson.theory.map((paragraph, index) => (
            <div
              key={index}
              className="p-4 bg-gray-900/50 border border-gray-800 rounded-xl text-gray-300 leading-relaxed"
            >
              {paragraph}
            </div>
          ))}
        </div>
      </section>

      {/* Code Examples */}
      {lesson.codeExamples.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <Code size={18} className="text-purple-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-200">Примеры кода</h2>
          </div>

          <div className="space-y-6">
            {lesson.codeExamples.map((example, index) => (
              <div key={index} className="rounded-xl overflow-hidden border border-gray-800">
                <div className="flex items-center justify-between px-4 py-3 bg-gray-800/80 border-b border-gray-700">
                  <span className="text-sm font-medium text-gray-300">{example.title}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 bg-gray-700 rounded text-gray-400 font-mono">
                      {example.language}
                    </span>
                    <button
                      onClick={() => handleCopy(example.code, `example-${index}`)}
                      className="p-1.5 hover:bg-gray-700 rounded transition-colors"
                      title="Копировать код"
                    >
                      {copiedCode === `example-${index}` ? (
                        <Check size={14} className="text-green-400" />
                      ) : (
                        <Copy size={14} className="text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <SyntaxHighlighter
                    language={example.language === 'text' ? 'plaintext' : example.language}
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      padding: '1rem',
                      background: '#1a1a2e',
                      fontSize: '0.875rem',
                      lineHeight: '1.6',
                    }}
                    wrapLongLines={false}
                  >
                    {example.code}
                  </SyntaxHighlighter>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Practice Section */}
      {lesson.practice.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center">
              <Target size={18} className="text-green-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-200">Практика</h2>
          </div>

          <div className="space-y-4">
            {lesson.practice.map((practice, index) => (
              <div key={index} className="rounded-xl border border-gray-800 overflow-hidden">
                {/* Task */}
                <div className="p-5 bg-gray-900/50">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 text-sm font-bold">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-medium text-gray-200 mb-2">Задание</h3>
                      <p className="text-gray-300">{practice.task}</p>
                    </div>
                  </div>
                </div>

                {/* Hint & Solution toggle */}
                <div className="border-t border-gray-800">
                  <div className="flex">
                    <button
                      onClick={() => setShowPractice(showPractice === index ? null : index)}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
                        showPractice === index
                          ? 'bg-yellow-500/10 text-yellow-300'
                          : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                      }`}
                    >
                      {showPractice === index ? (
                        <EyeOff size={16} />
                      ) : (
                        <Lightbulb size={16} />
                      )}
                      {showPractice === index ? 'Скрыть подсказку' : 'Показать подсказку'}
                    </button>
                    <button
                      onClick={() => setShowSolution(showSolution === index ? null : index)}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium border-l border-gray-800 transition-colors ${
                        showSolution === index
                          ? 'bg-blue-500/10 text-blue-300'
                          : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                      }`}
                    >
                      {showSolution === index ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                      {showSolution === index ? 'Скрыть решение' : 'Показать решение'}
                    </button>
                  </div>

                  {showPractice === index && (
                    <div className="p-4 bg-yellow-500/5 border-t border-yellow-500/20">
                      <div className="flex items-start gap-2">
                        <Lightbulb size={16} className="text-yellow-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-yellow-200/80">{practice.hint}</p>
                      </div>
                    </div>
                  )}

                  {showSolution === index && (
                    <div className="border-t border-blue-500/20">
                      <div className="overflow-x-auto">
                        <SyntaxHighlighter
                          language="groovy"
                          style={vscDarkPlus}
                          customStyle={{
                            margin: 0,
                            padding: '1rem',
                            background: '#0d1117',
                            fontSize: '0.8rem',
                            lineHeight: '1.5',
                          }}
                          wrapLongLines={false}
                        >
                          {practice.solution}
                        </SyntaxHighlighter>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Key Points */}
      {lesson.keyPoints.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-orange-500/10 rounded-lg flex items-center justify-center">
              <Key size={18} className="text-orange-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-200">Ключевые моменты</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {lesson.keyPoints.map((point, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 bg-gray-900/50 border border-gray-800 rounded-lg"
              >
                <span className="flex-shrink-0 w-5 h-5 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-400 text-xs font-bold mt-0.5">
                  {index + 1}
                </span>
                <span className="text-sm text-gray-300">{point}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-gray-800">
        <button
          onClick={onPrev}
          className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-gray-200 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <ChevronLeft size={18} />
          <span className="hidden sm:inline">Назад</span>
        </button>

        <div className="flex items-center gap-3">
          {!isCompleted ? (
            <button
              onClick={onComplete}
              className="flex items-center gap-2 px-5 py-2.5 bg-green-500/10 border border-green-500/30 text-green-300 hover:bg-green-500/20 rounded-lg transition-colors font-medium text-sm"
            >
              <CheckCircle size={16} />
              Завершить урок
            </button>
          ) : (
            <div className="flex items-center gap-2 px-4 py-2 text-green-400">
              <CheckCircle size={18} />
              <span className="text-sm font-medium">Урок пройден</span>
            </div>
          )}
        </div>

        <button
          onClick={onNext}
          className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-gray-200 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <span className="hidden sm:inline">Далее</span>
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
