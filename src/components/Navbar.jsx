import React from 'react';
import { IconBrain, IconTrophy, IconArrowLeft } from './Icons';

export const Navbar = ({ currentView, onGoHome, bestScore, currentTopicTitle }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {currentView !== 'landing' && (
            <button
              onClick={onGoHome}
              className="p-2 -ml-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors flex items-center gap-1.5 text-sm font-medium"
              title="Return to Topics"
            >
              <IconArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Topics</span>
            </button>
          )}

          <div 
            onClick={currentView !== 'landing' ? onGoHome : undefined}
            className={`flex items-center gap-2.5 ${currentView !== 'landing' ? 'cursor-pointer' : ''}`}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 ring-1 ring-white/20">
              <IconBrain className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-white via-indigo-100 to-indigo-300 bg-clip-text text-transparent">
                PrepMaster
              </span>
              <span className="hidden md:inline-block ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                CSE Grammar Series
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {bestScore !== null && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-medium">
              <IconTrophy className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Best:</span>
              <span className="font-bold">{bestScore}%</span>
            </div>
          )}

          {currentView === 'quiz' && (
            <div className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold tracking-wide">
              {currentTopicTitle || 'Quiz In Progress'}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
