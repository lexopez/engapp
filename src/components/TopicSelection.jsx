import React, { useState } from 'react';
import {
  IconCompass,
  IconScale,
  IconClock,
  IconBook,
  IconChevronRight,
  IconSparkles,
  IconFlame,
  IconTrophy,
  IconCheckCircle
} from './Icons';

export const TopicSelection = ({
  topics,
  onStartQuiz,
  bestScore,
  quizHistory
}) => {
  const [selectedTopicId, setSelectedTopicId] = useState('prepositions');
  const [selectedDifficulty, setSelectedDifficulty] = useState('basic'); // 'basic' | 'intermediate' | 'hard' | 'all'
  const [timerMinutes, setTimerMinutes] = useState(20);
  const [questionCount, setQuestionCount] = useState(50);
  const [shuffleQuestions, setShuffleQuestions] = useState(true);

  const selectedTopic = topics.find(t => t.id === selectedTopicId) || topics[0];

  // Filter available pool by chosen difficulty
  const availablePool = selectedTopic.questions.filter(q => {
    if (selectedDifficulty === 'all') return true;
    return q.difficulty === selectedDifficulty || q.level === selectedDifficulty;
  });

  const basicCount = selectedTopic.questions.filter(q => q.difficulty === 'basic' || q.level === 'basic').length;
  const intermediateCount = selectedTopic.questions.filter(q => q.difficulty === 'intermediate' || q.level === 'intermediate').length;
  const hardCount = selectedTopic.questions.filter(q => q.difficulty === 'hard' || q.level === 'hard').length;

  const difficultyLevels = [
    {
      id: 'basic',
      label: 'Basic',
      icon: '🌱',
      badge: `${basicCount} Qs`,
      tagline: 'Foundations',
      desc: 'All core time, place, movement, manner & everyday collocations',
      activeColor: 'border-emerald-500 bg-emerald-950/40 text-emerald-300 ring-1 ring-emerald-500/40',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
    },
    {
      id: 'intermediate',
      label: 'Intermediate',
      icon: '⚡',
      badge: `${intermediateCount} Qs`,
      tagline: 'Proficiency',
      desc: 'Dependent prepositions, confusing distinctions & phrasal verbs',
      activeColor: 'border-sky-500 bg-sky-950/40 text-sky-300 ring-1 ring-sky-500/40',
      badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/30'
    },
    {
      id: 'hard',
      label: 'Hard',
      icon: '🔥',
      badge: `${hardCount} Qs`,
      tagline: 'CSE Exam Level',
      desc: 'Advanced collocations, formal Latinate verbs & tricky idioms',
      activeColor: 'border-purple-500 bg-purple-950/40 text-purple-300 ring-1 ring-purple-500/40',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30'
    },
    {
      id: 'all',
      label: 'All Levels',
      icon: '✨',
      badge: `${selectedTopic.questions.length} Qs`,
      tagline: 'Mixed Mastery',
      desc: 'Comprehensive practice spanning all three difficulty levels',
      activeColor: 'border-indigo-500 bg-indigo-950/40 text-indigo-300 ring-1 ring-indigo-500/40',
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
    }
  ];

  const getTopicIcon = (iconName) => {
    switch (iconName) {
      case 'compass': return <IconCompass className="w-6 h-6" />;
      case 'scale': return <IconScale className="w-6 h-6" />;
      case 'clock': return <IconClock className="w-6 h-6" />;
      case 'book': return <IconBook className="w-6 h-6" />;
      default: return <IconCompass className="w-6 h-6" />;
    }
  };

  const handleLaunch = () => {
    if (!selectedTopic.active) return;
    const finalQuestionCount = Math.min(Number(questionCount), availablePool.length);
    onStartQuiz({
      topic: selectedTopic,
      timerMinutes: Number(timerMinutes),
      questionCount: finalQuestionCount,
      shuffle: shuffleQuestions,
      difficulty: selectedDifficulty
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs sm:text-sm font-semibold mb-4">
          <IconSparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
          <span>Interactive CSE English Proficiency Platform</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-5 leading-tight">
          Master English <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Prepositions</span> & Grammar
        </h1>

        <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          Take timed, high-yield practice quizzes with instant answer reveals and in-depth rule explanations. Test your recall under pressure before time runs out!
        </p>

        {/* Feature Pills */}
        <div className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4 text-xs sm:text-sm">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
            <IconCheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Instant Answer Feedback</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
            <IconClock className="w-4 h-4 text-indigo-400" />
            <span>Auto-Submitting Timer</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
            <IconFlame className="w-4 h-4 text-amber-400" />
            <span>1,000 Hard & Everyday Questions</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Topic Selection & Quiz Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Topic List (8 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-2">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>Select Quiz Topic</span>
              <span className="text-xs px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 font-normal">
                {topics.filter(t => t.active).length} Available
              </span>
            </h2>
            <span className="text-xs text-slate-400">Prepositions ready to take</span>
          </div>

          <div className="space-y-4">
            {topics.map((topic) => {
              const isSelected = selectedTopicId === topic.id;
              const isActive = topic.active;

              return (
                <div
                  key={topic.id}
                  onClick={() => isActive && setSelectedTopicId(topic.id)}
                  className={`relative rounded-2xl p-5 sm:p-6 transition-all duration-200 border ${!isActive
                      ? 'bg-slate-900/40 border-slate-800/60 opacity-65 cursor-not-allowed'
                      : isSelected
                        ? 'bg-gradient-to-br from-indigo-950/60 via-slate-900/90 to-slate-900 border-indigo-500/60 shadow-xl shadow-indigo-500/10 ring-1 ring-indigo-500/30 cursor-pointer'
                        : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90 cursor-pointer'
                    }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${isActive
                          ? 'bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/30'
                          : 'bg-slate-800 text-slate-400'
                        }`}>
                        {getTopicIcon(topic.icon)}
                      </div>

                      <div>
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <h3 className="text-base sm:text-lg font-bold text-white">
                            {topic.title}
                          </h3>
                          <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${topic.colorScheme.badgeBg}`}>
                            {topic.badge}
                          </span>
                        </div>
                        <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">
                          {topic.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-2 mt-3.5">
                          {topic.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="text-[11px] px-2.5 py-0.5 rounded-md bg-slate-800/80 text-slate-300 font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="hidden sm:flex items-center self-center text-slate-400">
                      {isActive && (
                        <div className={`p-2 rounded-xl ${isSelected ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-800/50'}`}>
                          <IconChevronRight className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Quiz Settings & Launcher (5 cols) */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 rounded-2xl bg-slate-900/90 border border-slate-800/90 p-6 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-indigo-400">Quiz Settings</span>
                <h3 className="text-lg font-bold text-white mt-0.5">{selectedTopic.title}</h3>
              </div>
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                <IconClock className="w-4 h-4" />
              </div>
            </div>

            <div className="mt-5 space-y-5">
              {/* Difficulty Level Selector */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Difficulty Level
                  </label>
                  <span className="text-xs font-bold text-indigo-400">
                    {availablePool.length} Questions in Pool
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {difficultyLevels.map((lvl) => {
                    const isSelected = selectedDifficulty === lvl.id;
                    return (
                      <button
                        key={lvl.id}
                        type="button"
                        onClick={() => {
                          setSelectedDifficulty(lvl.id);
                          // Ensure question count is valid for selected pool
                          const pool = selectedTopic.questions.filter(q => lvl.id === 'all' || q.difficulty === lvl.id || q.level === lvl.id);
                          if (questionCount > pool.length) {
                            setQuestionCount(Math.min(50, pool.length));
                          }
                        }}
                        className={`p-3 rounded-xl text-left border transition-all relative overflow-hidden group ${isSelected
                            ? `${lvl.activeColor} shadow-md`
                            : 'bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:text-white'
                          }`}
                      >
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <div className="flex items-center gap-1.5">
                            <span className="text-base">{lvl.icon}</span>
                            <span className="text-xs sm:text-sm font-bold text-white">{lvl.label}</span>
                          </div>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${lvl.badgeColor}`}>
                            {lvl.badge}
                          </span>
                        </div>
                        <div className="text-[10px] sm:text-[11px] text-slate-400 line-clamp-1">
                          {lvl.desc}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Question Count Selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Number of Questions
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { count: 15, label: '15 Qs', desc: 'Quick' },
                    { count: 30, label: '30 Qs', desc: 'Standard' },
                    { count: 50, label: '50 Qs', desc: 'Exam Mode' },
                    { count: 100, label: '100 Qs', desc: 'Marathon' },
                    { count: 300, label: '300 Qs', desc: 'Absolute Mastery' },
                  ].map((item) => {
                    const isAvailable = availablePool.length >= item.count;
                    return (
                      <button
                        key={item.count}
                        type="button"
                        disabled={!isAvailable && availablePool.length < 15}
                        onClick={() => setQuestionCount(item.count)}
                        className={`p-2 rounded-xl text-center border transition-all ${questionCount === item.count
                            ? 'bg-indigo-600/20 border-indigo-500 text-white font-semibold ring-1 ring-indigo-500/30'
                            : isAvailable
                              ? 'bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:text-white'
                              : 'bg-slate-900/40 border-slate-800 text-slate-500 cursor-not-allowed opacity-60'
                          }`}
                      >
                        <div className="text-xs sm:text-sm font-bold">{item.label}</div>
                        <div className="text-[9px] sm:text-[10px] text-slate-400">{item.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Countdown Timer Selector */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Timer Limit
                  </label>
                  <span className="text-xs font-bold text-indigo-400">
                    {timerMinutes} Minutes Total
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[10, 20, 35, 60].map((mins) => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => setTimerMinutes(mins)}
                      className={`py-2 px-1 rounded-xl text-center text-xs font-semibold border transition-all ${timerMinutes === mins
                          ? 'bg-indigo-600/20 border-indigo-500 text-white ring-1 ring-indigo-500/30'
                          : 'bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:text-white'
                        }`}
                    >
                      {mins} min
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-slate-400 mt-2">
                  ⚠️ If the timer runs out before you finish, the quiz automatically finishes and computes your score.
                </p>
              </div>

              {/* Shuffle Toggle */}
              <div className="pt-2 border-t border-slate-800/80">
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <span className="text-sm font-medium text-slate-200">Randomize Order</span>
                    <p className="text-xs text-slate-400">Shuffle questions for varied practice</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={shuffleQuestions}
                    onChange={(e) => setShuffleQuestions(e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-800 border-slate-700 cursor-pointer"
                  />
                </label>
              </div>

              {/* Quiz Info Summary Box */}
              <div className="rounded-xl bg-slate-950/60 border border-slate-800 p-3.5 space-y-2 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Topic:</span>
                  <span className="font-semibold text-white">{selectedTopic.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Difficulty Level:</span>
                  <span className={`font-semibold capitalize flex items-center gap-1 ${selectedDifficulty === 'basic' ? 'text-emerald-400' :
                      selectedDifficulty === 'intermediate' ? 'text-sky-400' :
                        selectedDifficulty === 'hard' ? 'text-purple-400' : 'text-indigo-400'
                    }`}>
                    {difficultyLevels.find(d => d.id === selectedDifficulty)?.icon} {difficultyLevels.find(d => d.id === selectedDifficulty)?.label}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Questions:</span>
                  <span className="font-semibold text-white">
                    {Math.min(Number(questionCount), availablePool.length)} of {availablePool.length} available
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Time Allowed:</span>
                  <span className="font-semibold text-white">
                    {timerMinutes} mins ({(timerMinutes * 60 / Math.min(Number(questionCount), availablePool.length)).toFixed(0)}s / Q)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Immediate Feedback:</span>
                  <span className="font-semibold text-emerald-400">Enabled</span>
                </div>
              </div>

              {/* Launch CTA Button */}
              <button
                type="button"
                onClick={handleLaunch}
                className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-600/30 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Start {difficultyLevels.find(d => d.id === selectedDifficulty)?.label || ''} Quiz</span>
                <IconChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Preposition Quick Reference Cards */}
      <div className="mt-16 pt-12 border-t border-slate-800/80">
        <div className="text-center max-w-xl mx-auto mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Preposition Quick Reference Guide
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Review key rules before starting your quiz session
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-5">
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">Time: IN / ON / AT</div>
            <ul className="text-xs text-slate-300 space-y-2">
              <li><strong className="text-white">AT:</strong> Precise time, night, dawn, noon (<em>at 5 PM, at night</em>)</li>
              <li><strong className="text-white">ON:</strong> Days and dates (<em>on Monday, on July 14</em>)</li>
              <li><strong className="text-white">IN:</strong> Months, seasons, years, centuries (<em>in July, in 2024</em>)</li>
            </ul>
          </div>

          <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-5">
            <div className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-2">Place & Movement</div>
            <ul className="text-xs text-slate-300 space-y-2">
              <li><strong className="text-white">INTO:</strong> Movement entering an enclosed space (<em>plunged into the water</em>)</li>
              <li><strong className="text-white">ONTO:</strong> Movement to a surface (<em>jumped onto the table</em>)</li>
              <li><strong className="text-white">THROUGH:</strong> Moving across 3D boundaries (<em>through the forest</em>)</li>
            </ul>
          </div>

          <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-5">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">Tricky Dependent Idioms</div>
            <ul className="text-xs text-slate-300 space-y-2">
              <li><strong className="text-white">Interested in:</strong> Not with or about</li>
              <li><strong className="text-white">Different from:</strong> Standard comparison</li>
              <li><strong className="text-white">In time vs On time:</strong> In time = before late; On time = punctual</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
