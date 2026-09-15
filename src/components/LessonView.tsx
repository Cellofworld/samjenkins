import { Module, Lesson } from '../data/courses';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
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
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <span>{module.icon}</span>
        <span>{module.title}</span>
        <span>/</span>
        <span className="text-slate-700">{lesson.title}</span>
      </div>

      {/* Title */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">{lesson.title}</h1>
        <p className="text-slate-600 text-lg">{lesson.description}</p>
      </div>

      {/* Theory Section */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
            <BookOpen size={18} className="text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Теория</h2>
        </div>

        <div className="space-y-4">
          {lesson.theory.map((paragraph, index) => (
            <div
              key={index}
              className="p-4 bg-white border border-slate-200 rounded-xl text-slate-700 leading-relaxed shadow-sm"
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
            <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
              <Code size={18} className="text-purple-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Примеры кода</h2>
          </div>

          <div className="space-y-6">
            {lesson.codeExamples.map((example, index) => (
              <div key={index} className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between px-4 py-3 bg-slate-100 border-b border-slate-200">
                  <span className="text-sm font-medium text-slate-700">{example.title}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 bg-white rounded text-slate-600 font-mono border border-slate-200">
                      {example.language}
                    </span>
                    <button
                      onClick={() => handleCopy(example.code, `example-${index}`)}
                      className="p-1.5 hover:bg-white rounded transition-colors"
                      title="Копировать код"
                    >
                      {copiedCode === `example-${index}` ? (
                        <Check size={14} className="text-green-600" />
                      ) : (
                        <Copy size={14} className="text-slate-500" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <SyntaxHighlighter
                    language={example.language === 'text' ? 'plaintext' : example.language}
                    style={oneLight}
                    customStyle={{
                      margin: 0,
                      padding: '1rem',
                      background: '#fafafa',
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
            <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
              <Target size={18} className="text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Практика</h2>
          </div>

          <div className="space-y-4">
            {lesson.practice.map((practice, index) => (
              <div key={index} className="rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                {/* Task */}
                <div className="p-5 bg-white">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-700 text-sm font-bold">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-medium text-slate-800 mb-2">Задание</h3>
                      <p className="text-slate-700">{practice.task}</p>
                    </div>
                  </div>
                </div>

                {/* Hint & Solution toggle */}
                <div className="border-t border-slate-200">
                  <div className="flex">
                    <button
                      onClick={() => setShowPractice(showPractice === index ? null : index)}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
                        showPractice === index
                          ? 'bg-yellow-50 text-yellow-700'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
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
                      className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium border-l border-slate-200 transition-colors ${
                        showSolution === index
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
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
                    <div className="p-4 bg-yellow-50 border-t border-yellow-200">
                      <div className="flex items-start gap-2">
                        <Lightbulb size={16} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-yellow-800">{practice.hint}</p>
                      </div>
                    </div>
                  )}

                  {showSolution === index && (
                    <div className="border-t border-blue-200">
                      <div className="overflow-x-auto">
                        <SyntaxHighlighter
                          language="groovy"
                          style={oneLight}
                          customStyle={{
                            margin: 0,
                            padding: '1rem',
                            background: '#fafafa',
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
            <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
              <Key size={18} className="text-orange-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Ключевые моменты</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {lesson.keyPoints.map((point, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 bg-white border border-slate-200 rounded-lg shadow-sm"
              >
                <span className="flex-shrink-0 w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center text-orange-700 text-xs font-bold mt-0.5">
                  {index + 1}
                </span>
                <span className="text-sm text-slate-700">{point}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-slate-200">
        <button
          onClick={onPrev}
          className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ChevronLeft size={18} />
          <span className="hidden sm:inline">Назад</span>
        </button>

        <div className="flex items-center gap-3">
          {!isCompleted ? (
            <button
              onClick={onComplete}
              className="flex items-center gap-2 px-5 py-2.5 bg-green-50 border border-green-200 text-green-700 hover:bg-green-100 rounded-lg transition-colors font-medium text-sm"
            >
              <CheckCircle size={16} />
              Завершить урок
            </button>
          ) : (
            <div className="flex items-center gap-2 px-4 py-2 text-green-700">
              <CheckCircle size={18} />
              <span className="text-sm font-medium">Урок пройден</span>
            </div>
          )}
        </div>

        <button
          onClick={onNext}
          className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <span className="hidden sm:inline">Далее</span>
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
