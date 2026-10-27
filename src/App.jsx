import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { TopicSelection } from './components/TopicSelection';
import { QuizActive } from './components/QuizActive';
import { QuizResult } from './components/QuizResult';
import { topics } from './data/topics';

export function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'quiz' | 'result'
  const [activeTopic, setActiveTopic] = useState(topics[0]);
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [quizConfig, setQuizConfig] = useState({
    timerMinutes: 20,
    questionCount: 50,
    shuffle: true,
    difficulty: 'basic',
  });
  const [quizResult, setQuizResult] = useState(null);
  const [bestScore, setBestScore] = useState(null);

  // Load best score from localStorage on initial render
  useEffect(() => {
    try {
      const saved = localStorage.getItem('prepmaster_prepositions_best');
      if (saved !== null) {
        setBestScore(Number(saved));
      }
    } catch (e) {
      // LocalStorage access fallback
    }
  }, []);

  // Shuffle helper (Fisher-Yates)
  const shuffleArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // Launch quiz handler
  const handleStartQuiz = ({ topic, timerMinutes, questionCount, shuffle, difficulty = 'basic' }) => {
    setActiveTopic(topic);
    setQuizConfig({ timerMinutes, questionCount, shuffle, difficulty });

    let questionsPool = [...topic.questions];
    if (difficulty && difficulty !== 'all') {
      questionsPool = questionsPool.filter(q => q.difficulty === difficulty || q.level === difficulty);
    }
    if (shuffle) {
      questionsPool = shuffleArray(questionsPool);
    }
    const finalCount = Math.min(questionCount, questionsPool.length);
    const selectedQuestions = questionsPool.slice(0, finalCount);
    setActiveQuestions(selectedQuestions);
    setQuizResult(null);
    setCurrentView('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // When user completes or finishes quiz
  const handleCompleteQuiz = (answers, timeSpent) => {
    const total = activeQuestions.length;
    const correct = Object.values(answers).filter(a => a.isCorrect).length;
    const percentage = Math.round((correct / total) * 100);

    // Update best score in localStorage if higher
    if (bestScore === null || percentage > bestScore) {
      setBestScore(percentage);
      try {
        localStorage.setItem('prepmaster_prepositions_best', String(percentage));
      } catch (e) {}
    }

    setQuizResult({
      questions: activeQuestions,
      answers,
      timeSpent,
      timeLimitSeconds: quizConfig.timerMinutes * 60,
      isTimeout: false,
      topicTitle: activeTopic.title,
      difficulty: quizConfig.difficulty,
    });
    setCurrentView('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // When timer runs out
  const handleTimeUp = (answers, timeLimitSeconds) => {
    const total = activeQuestions.length;
    const correct = Object.values(answers).filter(a => a.isCorrect).length;
    const percentage = Math.round((correct / total) * 100);

    if (bestScore === null || percentage > bestScore) {
      setBestScore(percentage);
      try {
        localStorage.setItem('prepmaster_prepositions_best', String(percentage));
      } catch (e) {}
    }

    setQuizResult({
      questions: activeQuestions,
      answers,
      timeSpent: timeLimitSeconds,
      timeLimitSeconds,
      isTimeout: true,
      topicTitle: activeTopic.title,
      difficulty: quizConfig.difficulty,
    });
    setCurrentView('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Return to landing page
  const handleGoHome = () => {
    setCurrentView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Retake quiz with same configuration
  const handleRetakeQuiz = () => {
    handleStartQuiz({
      topic: activeTopic,
      timerMinutes: quizConfig.timerMinutes,
      questionCount: quizConfig.questionCount,
      shuffle: quizConfig.shuffle,
      difficulty: quizConfig.difficulty,
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Navigation Header */}
      <Navbar 
        currentView={currentView}
        onGoHome={handleGoHome}
        bestScore={bestScore}
        currentTopicTitle={activeTopic?.title}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {currentView === 'landing' && (
          <TopicSelection
            topics={topics}
            onStartQuiz={handleStartQuiz}
            bestScore={bestScore}
          />
        )}

        {currentView === 'quiz' && activeQuestions.length > 0 && (
          <QuizActive
            questions={activeQuestions}
            timeLimitSeconds={quizConfig.timerMinutes * 60}
            onCompleteQuiz={handleCompleteQuiz}
            onTimeUp={handleTimeUp}
            onExitQuiz={handleGoHome}
            topicTitle={activeTopic.title}
            difficulty={quizConfig.difficulty}
          />
        )}

        {currentView === 'result' && quizResult && (
          <QuizResult
            questions={quizResult.questions}
            answers={quizResult.answers}
            timeSpent={quizResult.timeSpent}
            timeLimitSeconds={quizResult.timeLimitSeconds}
            isTimeout={quizResult.isTimeout}
            topicTitle={quizResult.topicTitle}
            difficulty={quizResult.difficulty}
            onRetakeQuiz={handleRetakeQuiz}
            onGoHome={handleGoHome}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            PrepMaster &copy; {new Date().getFullYear()} &mdash; English Grammar & Prepositions CSE Exam Prep
          </div>
          <div className="text-slate-400">
            50 Questions &bull; Timed &bull; Instant Feedback &bull; Comprehensive Analytics
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
