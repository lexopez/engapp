import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  IconTrophy, 
  IconCheckCircle, 
  IconXCircle, 
  IconClock, 
  IconRotateCcw, 
  IconArrowLeft, 
  IconAlertTriangle,
  IconSparkles,
  IconBrain
} from './Icons';

export const QuizResult = ({ 
  questions, 
  answers, 
  timeSpent, 
  timeLimitSeconds, 
  isTimeout, 
  topicTitle,
  difficulty,
  onRetakeQuiz, 
  onGoHome 
}) => {
  const [filter, setFilter] = useState('all'); // 'all' | 'mistakes' | 'correct' | 'unanswered'

  // Calculations
  const totalQuestions = questions.length;
  let correctCount = 0;
  let mistakesCount = 0;
  let unansweredCount = 0;

  questions.forEach((q, idx) => {
    const ans = answers[idx];
    if (!ans) {
      unansweredCount++;
    } else if (ans.isCorrect) {
      correctCount++;
    } else {
      mistakesCount++;
    }
  });

  const percentage = Math.round((correctCount / totalQuestions) * 100);

  // Trigger confetti if high score and completed
  useEffect(() => {
    if (percentage >= 70) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // Confetti fallback
      }
    }
  }, [percentage]);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remSecs = secs % 60;
    return `${mins}m ${remSecs}s`;
  };

  // Performance rating
  const getRating = () => {
    if (percentage >= 90) return { title: 'Preposition Master!', desc: 'Outstanding precision across all preposition categories.', color: 'text-emerald-400', badgeBg: 'bg-emerald-500/20 border-emerald-500/30' };
    if (percentage >= 75) return { title: 'Great Proficiency!', desc: 'Strong grammatical foundation with minor exceptions.', color: 'text-indigo-400', badgeBg: 'bg-indigo-500/20 border-indigo-500/30' };
    if (percentage >= 50) return { title: 'Good Effort!', desc: 'Solid grasp, but dependent prepositions need focused review.', color: 'text-amber-400', badgeBg: 'bg-amber-500/20 border-amber-500/30' };
    return { title: 'Keep Practicing!', desc: 'Prepositions are tricky idioms. Review your mistakes below and try again!', color: 'text-rose-400', badgeBg: 'bg-rose-500/20 border-rose-500/30' };
  };

  const rating = getRating();

  // Filtered review list
  const filteredQuestions = questions.map((q, idx) => {
    const ans = answers[idx];
    const status = !ans ? 'unanswered' : ans.isCorrect ? 'correct' : 'mistake';
    return { q, idx, ans, status };
  }).filter(item => {
    if (filter === 'all') return true;
    if (filter === 'mistakes') return item.status === 'mistake';
    if (filter === 'correct') return item.status === 'correct';
    if (filter === 'unanswered') return item.status === 'unanswered';
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Timeout Alert Banner (if timer expired) */}
      {isTimeout && (
        <div className="mb-8 p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-amber-200 flex items-start gap-3 shadow-lg">
          <IconAlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
          <div>
            <div className="font-bold text-sm sm:text-base text-amber-300">
              Time Expired! Quiz Auto-Submitted
            </div>
            <p className="text-xs sm:text-sm text-amber-200/80 mt-0.5">
              The {Math.round(timeLimitSeconds / 60)}-minute timer ended. Your answers were evaluated up to the cutoff, with unanswered questions recorded below.
            </p>
          </div>
        </div>
      )}

      {/* Main Score Hero Card */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-10 shadow-2xl backdrop-blur-xl mb-8 relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center max-w-lg mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-4 border bg-indigo-500/10 text-indigo-400 border-indigo-500/20">
            <IconBrain className="w-3.5 h-3.5" />
            <span>{topicTitle || 'Prepositions'} Complete</span>
            {difficulty && (
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                difficulty === 'basic' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
                difficulty === 'intermediate' ? 'bg-sky-500/20 text-sky-300 border-sky-500/30' :
                difficulty === 'hard' ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' :
                'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
              }`}>
                {difficulty === 'basic' ? '🌱 Basic' :
                 difficulty === 'intermediate' ? '⚡ Intermediate' :
                 difficulty === 'hard' ? '🔥 Hard' : '✨ All Levels'}
              </span>
            )}
          </div>

          {/* Big Score Percentage Display */}
          <div className="flex items-center justify-center my-4">
            <div className="relative flex items-center justify-center w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-slate-950 border-4 border-slate-800 shadow-inner">
              <div className="text-center">
                <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                  {percentage}%
                </span>
                <span className="block text-xs uppercase tracking-wider text-slate-400 font-bold mt-1">
                  Overall Score
                </span>
              </div>
            </div>
          </div>

          {/* Performance Badge */}
          <div className={`inline-block px-4 py-1.5 rounded-full border text-sm font-bold ${rating.badgeBg} ${rating.color} mb-2`}>
            {rating.title}
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            {rating.desc}
          </p>
        </div>

        {/* 4 Key Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-8 border-t border-slate-800">
          {/* Correct Answers */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
            <div className="flex items-center justify-center gap-1.5 text-emerald-400 text-xs font-semibold mb-1">
              <IconCheckCircle className="w-4 h-4" />
              <span>Correct</span>
            </div>
            <div className="text-2xl font-bold text-white">{correctCount}</div>
            <div className="text-[11px] text-slate-400">of {totalQuestions} questions</div>
          </div>

          {/* Mistakes */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
            <div className="flex items-center justify-center gap-1.5 text-rose-400 text-xs font-semibold mb-1">
              <IconXCircle className="w-4 h-4" />
              <span>Mistakes</span>
            </div>
            <div className="text-2xl font-bold text-white">{mistakesCount}</div>
            <div className="text-[11px] text-slate-400">incorrect choices</div>
          </div>

          {/* Unanswered */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
            <div className="flex items-center justify-center gap-1.5 text-amber-400 text-xs font-semibold mb-1">
              <IconAlertTriangle className="w-4 h-4" />
              <span>Unanswered</span>
            </div>
            <div className="text-2xl font-bold text-white">{unansweredCount}</div>
            <div className="text-[11px] text-slate-400">missed or timed out</div>
          </div>

          {/* Time Taken */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
            <div className="flex items-center justify-center gap-1.5 text-indigo-400 text-xs font-semibold mb-1">
              <IconClock className="w-4 h-4" />
              <span>Duration</span>
            </div>
            <div className="text-2xl font-bold text-white">{formatTime(timeSpent)}</div>
            <div className="text-[11px] text-slate-400">
              {isTimeout ? 'Hit time limit' : 'Finished early'}
            </div>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <button
            type="button"
            onClick={onRetakeQuiz}
            className="flex-1 py-3 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <IconRotateCcw className="w-4 h-4" />
            <span>Retake Quiz</span>
          </button>

          <button
            type="button"
            onClick={onGoHome}
            className="py-3 px-6 rounded-xl font-bold text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <IconArrowLeft className="w-4 h-4" />
            <span>Choose Another Topic</span>
          </button>
        </div>
      </div>

      {/* Detailed Question Review Section */}
      <div className="mt-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl font-bold text-white">
              Detailed Question Review
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Review every answer choice and study the detailed grammar rule
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
            {[
              { id: 'all', label: `All (${totalQuestions})` },
              { id: 'mistakes', label: `Mistakes (${mistakesCount})` },
              { id: 'correct', label: `Correct (${correctCount})` },
              { id: 'unanswered', label: `Unanswered (${unansweredCount})` },
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  filter === tab.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Questions List */}
        {filteredQuestions.length === 0 ? (
          <div className="text-center py-12 rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-400 text-sm">
            No questions match this filter.
          </div>
        ) : (
          <div className="space-y-4">
            {filteredQuestions.map(({ q, idx, ans, status }) => {
              const userPick = ans !== undefined ? q.options[ans.selectedIndex] : null;
              const correctOption = q.options[q.correctIndex];

              return (
                <div 
                  key={q.id}
                  className={`rounded-2xl border p-5 sm:p-6 transition-all ${
                    status === 'correct'
                      ? 'bg-slate-900/60 border-slate-800 hover:border-emerald-500/30'
                      : status === 'mistake'
                        ? 'bg-rose-950/10 border-rose-500/30 hover:border-rose-500/50'
                        : 'bg-amber-950/10 border-amber-500/30'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300">
                        #{idx + 1}
                      </span>
                      {q.category && (
                        <span className="text-[11px] font-medium text-slate-400">
                          {q.category}
                        </span>
                      )}
                      {(q.difficulty || q.level) && (
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                          (q.difficulty || q.level) === 'basic' ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' :
                          (q.difficulty || q.level) === 'intermediate' ? 'bg-sky-500/10 text-sky-300 border-sky-500/30' :
                          'bg-purple-500/10 text-purple-300 border-purple-500/30'
                        }`}>
                          {(q.difficulty || q.level) === 'basic' ? '🌱 Basic' :
                           (q.difficulty || q.level) === 'intermediate' ? '⚡ Intermediate' : '🔥 Hard'}
                        </span>
                      )}
                    </div>

                    {status === 'correct' && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                        <IconCheckCircle className="w-3.5 h-3.5" />
                        <span>Correct</span>
                      </span>
                    )}
                    {status === 'mistake' && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/20">
                        <IconXCircle className="w-3.5 h-3.5" />
                        <span>Incorrect</span>
                      </span>
                    )}
                    {status === 'unanswered' && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                        <IconAlertTriangle className="w-3.5 h-3.5" />
                        <span>Unanswered</span>
                      </span>
                    )}
                  </div>

                  <h4 className="text-base sm:text-lg font-semibold text-white mb-4">
                    {q.question}
                  </h4>

                  {/* Answers Comparison */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-xs sm:text-sm">
                    <div className={`p-3 rounded-xl border ${
                      status === 'correct' 
                        ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200' 
                        : status === 'mistake' 
                          ? 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                        Your Pick
                      </div>
                      <div className="font-semibold text-sm">
                        {userPick !== null ? userPick : 'None (Skipped or Timed Out)'}
                      </div>
                    </div>

                    <div className="p-3 rounded-xl border bg-emerald-950/20 border-emerald-500/30 text-emerald-200">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                        Correct Answer
                      </div>
                      <div className="font-semibold text-sm text-emerald-300">
                        {correctOption}
                      </div>
                    </div>
                  </div>

                  {/* Explanation Note */}
                  <div className="rounded-xl bg-slate-950/50 border border-slate-800/80 p-3.5 text-xs text-slate-300">
                    <strong className="text-indigo-300">Rule Explanation: </strong>
                    <span>{q.explanation}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
