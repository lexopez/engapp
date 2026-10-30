import React, { useState, useEffect, useRef } from 'react';
import { 
  IconClock, 
  IconAlertTriangle, 
  IconCheckCircle, 
  IconXCircle, 
  IconChevronRight, 
  IconChevronLeft, 
  IconPause,
  IconPlay
} from './Icons';

export const QuizActive = ({ 
  questions, 
  timeLimitSeconds, 
  onCompleteQuiz, 
  onTimeUp,
  onExitQuiz,
  topicTitle,
  difficulty
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // answers map: { [questionIndex]: { selectedIndex, isCorrect, answeredAt } }
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(timeLimitSeconds);
  const [isPaused, setIsPaused] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [showNavGrid, setShowNavGrid] = useState(false);

  const timerRef = useRef(null);

  // Countdown timer effect (pauses when isPaused or showExitConfirm is open)
  useEffect(() => {
    if (isPaused || showExitConfirm) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          // Auto submit when time runs out
          setTimeout(() => {
            onTimeUp(answers, timeLimitSeconds);
          }, 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, showExitConfirm, answers, onTimeUp, timeLimitSeconds]);

  // Keyboard shortcut listener ('P' to toggle pause, 'Escape' to resume if paused)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      if (e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        setIsPaused(prev => !prev);
      } else if (e.key === 'Escape' && isPaused) {
        e.preventDefault();
        setIsPaused(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPaused]);

  const currentQ = questions[currentIndex];
  const currentAnswer = answers[currentIndex];
  const isAnswered = currentAnswer !== undefined;

  // Format time MM:SS
  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remSecs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optionIndex) => {
    if (isAnswered || isPaused) return; // Prevent changing once answered or when paused

    const isCorrect = optionIndex === currentQ.correctIndex;
    const newAnswers = {
      ...answers,
      [currentIndex]: {
        selectedIndex: optionIndex,
        isCorrect,
        questionId: currentQ.id,
      }
    };
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Last question - finish quiz
      handleFinish(answers);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleFinish = (finalAnswers = answers) => {
    if (timerRef.current) clearInterval(timerRef.current);
    const timeSpent = timeLimitSeconds - timeLeft;
    onCompleteQuiz(finalAnswers, timeSpent);
  };

  // Stats calculation for live badge
  const answeredCount = Object.keys(answers).length;
  const correctCount = Object.values(answers).filter(a => a.isCorrect).length;
  const mistakesCount = Object.values(answers).filter(a => !a.isCorrect).length;
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  // Time warning states
  const isDangerTime = timeLeft <= 120; // under 2 minutes
  const isCriticalTime = timeLeft <= 30; // under 30 seconds

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Top Header Bar: Topic, Timer & Quick Quit */}
      <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              {topicTitle || 'Prepositions'}
            </span>
            {(difficulty || currentQ.difficulty) && (
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                (difficulty || currentQ.difficulty) === 'basic' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                (difficulty || currentQ.difficulty) === 'intermediate' ? 'bg-sky-500/10 text-sky-400 border-sky-500/30' :
                (difficulty || currentQ.difficulty) === 'hard' ? 'bg-purple-500/10 text-purple-400 border-purple-500/30' :
                'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
              }`}>
                {(difficulty || currentQ.difficulty) === 'basic' ? '🌱 Basic' :
                 (difficulty || currentQ.difficulty) === 'intermediate' ? '⚡ Intermediate' :
                 (difficulty || currentQ.difficulty) === 'hard' ? '🔥 Hard' : '✨ All Levels'}
              </span>
            )}
          </div>
          <h2 className="text-sm sm:text-base font-semibold text-slate-200 mt-0.5">
            Question {currentIndex + 1} of {questions.length}
          </h2>
        </div>

        {/* Live Timer Indicator & Pause / Exit Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div 
            className={`flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-xl border font-mono font-bold text-sm sm:text-base transition-all ${
              isPaused
                ? 'bg-amber-500/15 text-amber-300 border-amber-500/50 shadow-sm shadow-amber-500/20'
                : isCriticalTime 
                  ? 'bg-rose-500/20 text-rose-400 border-rose-500 animate-pulse'
                  : isDangerTime
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    : 'bg-slate-900 border-slate-800 text-slate-200'
            }`}
          >
            {isPaused ? (
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span className="text-[10px] font-sans font-extrabold uppercase tracking-wider text-amber-400">Paused</span>
              </span>
            ) : isDangerTime ? (
              <IconAlertTriangle className="w-4 h-4 text-rose-400 animate-bounce" />
            ) : (
              <IconClock className="w-4 h-4 text-indigo-400" />
            )}
            <span>{formatTime(timeLeft)}</span>
          </div>

          <button
            type="button"
            onClick={() => setIsPaused(prev => !prev)}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              isPaused 
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-600/30 ring-2 ring-emerald-500/30'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-800 hover:border-slate-700'
            }`}
            title={isPaused ? "Resume quiz (or press 'P')" : "Pause timer (or press 'P')"}
          >
            {isPaused ? (
              <>
                <IconPlay className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                <span>Resume</span>
              </>
            ) : (
              <>
                <IconPause className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
                <span>Pause</span>
              </>
            )}
          </button>

          <button
            onClick={() => setShowExitConfirm(true)}
            className="text-xs px-2.5 py-1.5 rounded-xl text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors cursor-pointer"
            title="Exit Quiz"
          >
            Exit
          </button>
        </div>
      </div>

      {/* Progress Bar & Live Tally */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <div className="flex items-center gap-3">
            <span className="text-emerald-400 font-semibold">✓ {correctCount} Correct</span>
            <span className="text-rose-400 font-semibold">✗ {mistakesCount} Mistakes</span>
          </div>
          <span>{answeredCount} / {questions.length} Answered ({progressPercent}%)</span>
        </div>

        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 rounded-full"
            style={{ width: `${((answeredCount) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Question Card */}
      <div className={`rounded-2xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-xl backdrop-blur-sm relative transition-opacity ${
        isPaused ? 'pointer-events-none select-none opacity-40' : ''
      }`}>
        {/* Category & Difficulty Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {currentQ.category && (
            <div className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium">
              {currentQ.category}
            </div>
          )}
          {(currentQ.difficulty || currentQ.level) && (
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
              (currentQ.difficulty || currentQ.level) === 'basic'
                ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                : (currentQ.difficulty || currentQ.level) === 'intermediate'
                ? 'bg-sky-500/10 text-sky-300 border-sky-500/30'
                : 'bg-purple-500/10 text-purple-300 border-purple-500/30'
            }`}>
              {(currentQ.difficulty || currentQ.level) === 'basic' ? '🌱 Basic Level' :
               (currentQ.difficulty || currentQ.level) === 'intermediate' ? '⚡ Intermediate Level' : '🔥 Hard Level'}
            </div>
          )}
        </div>

        {/* Question Prompt */}
        <h3 className="text-xl sm:text-2xl font-bold text-white leading-relaxed mb-6">
          {currentQ.question}
        </h3>

        {/* Answer Options */}
        <div className="space-y-3 sm:space-y-3.5 mb-6">
          {currentQ.options.map((option, idx) => {
            const letter = String.fromCharCode(65 + idx); // A, B, C, D
            const isSelected = currentAnswer?.selectedIndex === idx;
            const isCorrectOption = idx === currentQ.correctIndex;

            let buttonStyle = "bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900 text-slate-200";
            let badgeStyle = "bg-slate-800 text-slate-300";

            if (isAnswered) {
              if (isCorrectOption) {
                // Correct answer glows green
                buttonStyle = "bg-emerald-950/40 border-emerald-500/70 text-emerald-100 ring-1 ring-emerald-500/40";
                badgeStyle = "bg-emerald-600 text-white";
              } else if (isSelected && !isCorrectOption) {
                // User picked wrong answer glows red
                buttonStyle = "bg-rose-950/40 border-rose-500/70 text-rose-100 ring-1 ring-rose-500/40";
                badgeStyle = "bg-rose-600 text-white";
              } else {
                // Other options muted
                buttonStyle = "bg-slate-950/30 border-slate-900 text-slate-500 opacity-60";
                badgeStyle = "bg-slate-900 text-slate-600";
              }
            }

            return (
              <button
                key={idx}
                type="button"
                disabled={isAnswered || isPaused}
                onClick={() => handleSelectOption(idx)}
                className={`w-full p-4 rounded-xl border text-left flex items-center justify-between gap-4 transition-all duration-200 ${buttonStyle} ${
                  !isAnswered && !isPaused ? 'cursor-pointer active:scale-[0.99]' : 'cursor-default'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${badgeStyle}`}>
                    {letter}
                  </span>
                  <span className="text-base sm:text-lg font-medium">{option}</span>
                </div>

                {/* Status icon once answered */}
                {isAnswered && (
                  <div className="shrink-0 flex items-center gap-1.5">
                    {isCorrectOption && (
                      <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                        <IconCheckCircle className="w-4 h-4 text-emerald-400" />
                        <span>Correct Answer</span>
                      </span>
                    )}
                    {isSelected && !isCorrectOption && (
                      <span className="flex items-center gap-1 text-xs font-semibold text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-md border border-rose-500/20">
                        <IconXCircle className="w-4 h-4 text-rose-400" />
                        <span>Your Answer</span>
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Immediate Feedback Box (Displays right after answer is chosen) */}
        {isAnswered && (
          <div className={`p-4 sm:p-5 rounded-xl border mb-6 transition-all animate-fadeIn ${
            currentAnswer.isCorrect 
              ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200' 
              : 'bg-rose-950/20 border-rose-500/30 text-rose-200'
          }`}>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 shrink-0">
                {currentAnswer.isCorrect ? (
                  <IconCheckCircle className="w-5 h-5 text-emerald-400" />
                ) : (
                  <IconXCircle className="w-5 h-5 text-rose-400" />
                )}
              </div>
              <div className="space-y-1">
                <div className="font-bold text-sm">
                  {currentAnswer.isCorrect ? 'Well done! That is correct.' : 'Incorrect! Look at the rule below:'}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  <strong className="text-white">Explanation: </strong>
                  {currentQ.explanation}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation & Action Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border flex items-center gap-1.5 transition-colors ${
                currentIndex === 0 
                  ? 'border-slate-800 text-slate-600 bg-slate-900/50 cursor-not-allowed' 
                  : 'border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer'
              }`}
            >
              <IconChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              type="button"
              onClick={() => setShowNavGrid(!showNavGrid)}
              className="px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Question Grid ({currentIndex + 1}/{questions.length})
            </button>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            {currentIndex === questions.length - 1 ? (
              <button
                type="button"
                onClick={() => handleFinish()}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-600/25 transition-all cursor-pointer"
              >
                Submit & View Results
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  isAnswered 
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-600/30'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                }`}
              >
                <span>{isAnswered ? 'Next Question' : 'Skip / Next'}</span>
                <IconChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Expandable Question Grid Drawer */}
      {showNavGrid && (
        <div className="mt-6 rounded-2xl bg-slate-900/95 border border-slate-800 p-5 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xs uppercase font-bold tracking-wider text-slate-300">
              Quick Question Navigator
            </h4>
            <div className="flex items-center gap-3 text-[11px] text-slate-400">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"/> Correct</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"/> Mistake</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block"/> Unanswered</span>
            </div>
          </div>

          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 max-h-56 overflow-y-auto p-1">
            {questions.map((_, idx) => {
              const ans = answers[idx];
              const isCurrent = idx === currentIndex;

              let cellStyle = "bg-slate-800 text-slate-400 border-slate-700";
              if (ans) {
                if (ans.isCorrect) cellStyle = "bg-emerald-900/60 text-emerald-200 border-emerald-500/50";
                else cellStyle = "bg-rose-900/60 text-rose-200 border-rose-500/50";
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setCurrentIndex(idx);
                    setShowNavGrid(false);
                  }}
                  className={`h-9 rounded-lg text-xs font-bold border transition-all cursor-pointer flex items-center justify-center ${cellStyle} ${
                    isCurrent ? 'ring-2 ring-indigo-400 ring-offset-2 ring-offset-slate-900 font-extrabold' : ''
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Quiz Paused Overlay Modal */}
      {isPaused && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div 
            className="max-w-md w-full rounded-2xl bg-slate-900 border border-amber-500/30 p-6 sm:p-7 shadow-2xl text-center relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background ambient glow */}
            <div className="absolute -top-16 -left-16 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-16 -right-16 w-36 h-36 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="w-14 h-14 mx-auto mb-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
              <IconPause className="w-7 h-7" />
            </div>

            <div className="inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold mb-2">
              Timer is on hold
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
              Quiz Paused
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
              Take a breather! Your timer, selected answers, and question progress are completely safe and preserved.
            </p>

            {/* Quick stats snapshot */}
            <div className="grid grid-cols-3 gap-2.5 mb-6 bg-slate-950/60 p-3 rounded-xl border border-slate-800 text-center">
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">Time Left</div>
                <div className="text-base sm:text-lg font-mono font-bold text-amber-300 flex items-center justify-center gap-1">
                  <IconClock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{formatTime(timeLeft)}</span>
                </div>
              </div>
              <div className="border-x border-slate-800">
                <div className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">Current Q</div>
                <div className="text-base sm:text-lg font-bold text-slate-200">
                  {currentIndex + 1} <span className="text-xs text-slate-500 font-normal">/ {questions.length}</span>
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">Answered</div>
                <div className="text-base sm:text-lg font-bold text-emerald-400">
                  {answeredCount} <span className="text-xs text-slate-500 font-normal">/ {questions.length}</span>
                </div>
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsPaused(false);
              }}
              className="w-full py-3 px-5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer mb-3 active:scale-[0.99]"
            >
              <IconPlay className="w-4 h-4" />
              <span>Resume Quiz</span>
              <span className="text-[10px] font-mono bg-emerald-800/60 px-1.5 py-0.5 rounded text-emerald-200">
                Press P
              </span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsPaused(false);
                  setShowNavGrid(true);
                }}
                className="flex-1 py-2 px-3 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer border border-slate-700"
              >
                Question Grid
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowExitConfirm(true);
                }}
                className="py-2 px-3.5 rounded-xl text-xs font-semibold bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition-colors cursor-pointer"
              >
                Exit Quiz
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Exit Confirmation Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-4">
              <IconAlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Leave Current Quiz?</h3>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              Are you sure you want to exit? You can either submit your progress now to compute your current score or abandon the quiz session.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => handleFinish()}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors cursor-pointer"
              >
                Submit Current Answers
              </button>
              <button
                type="button"
                onClick={onExitQuiz}
                className="py-2.5 px-4 rounded-xl text-xs font-bold bg-rose-600/20 text-rose-300 hover:bg-rose-600/30 border border-rose-500/30 transition-colors cursor-pointer"
              >
                Discard Quiz
              </button>
              <button
                type="button"
                onClick={() => setShowExitConfirm(false)}
                className="py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors cursor-pointer"
              >
                Continue Quiz
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
