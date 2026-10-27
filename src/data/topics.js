import { prepositionsQuestions } from './prepositionsQuestions';

export const topics = [
  {
    id: 'prepositions',
    title: 'Prepositions Mastery',
    description: 'Master English prepositions across 3 dedicated tiers: Basic (time, place & movement), Intermediate (dependent collocations & distinctions), and Hard (Civil Service Exam level idioms & Latinate verbs) with 1,000 comprehensive questions.',
    icon: 'compass',
    badge: '1,000 Questions • 3 Difficulty Levels',
    active: true,
    questionCount: prepositionsQuestions.length,
    defaultTimeMinutes: 20,
    questions: prepositionsQuestions,
    colorScheme: {
      gradient: 'from-indigo-600 via-indigo-500 to-purple-600',
      badgeBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      glow: 'rgba(99, 102, 241, 0.25)',
      cardBorder: 'hover:border-indigo-500/50',
    },
    tags: ['Basic, Intermediate & Hard', 'Time & Place', 'Dependent Prepositions', 'CSE Exam Level', 'Instant Explanations']
  },
  {
    id: 'subject-verb',
    title: 'Subject-Verb Agreement',
    description: 'Singular and plural subject concordance, collective nouns, compound subjects, and inverted structures.',
    icon: 'scale',
    badge: 'Coming Soon',
    active: false,
    questionCount: 40,
    defaultTimeMinutes: 15,
    questions: [],
    colorScheme: {
      gradient: 'from-amber-600 to-orange-600',
      badgeBg: 'bg-amber-500/10 text-amber-300/60 border-amber-500/20',
      glow: 'rgba(245, 158, 11, 0.1)',
      cardBorder: 'hover:border-slate-700',
    },
    tags: ['Syntax', 'Sentence Structure']
  },
  {
    id: 'tenses',
    title: 'Tenses & Conditionals',
    description: 'Past perfect, continuous tenses, future in the past, and zero/first/second/third conditional rules.',
    icon: 'clock',
    badge: 'Coming Soon',
    active: false,
    questionCount: 45,
    defaultTimeMinutes: 20,
    questions: [],
    colorScheme: {
      gradient: 'from-emerald-600 to-teal-600',
      badgeBg: 'bg-emerald-500/10 text-emerald-300/60 border-emerald-500/20',
      glow: 'rgba(16, 185, 129, 0.1)',
      cardBorder: 'hover:border-slate-700',
    },
    tags: ['Verb Forms', 'Advanced Grammar']
  },
  {
    id: 'articles',
    title: 'Articles & Determiners',
    description: 'Definite (the) and indefinite (a/an) articles, zero articles, demonstratives, and quantifiers.',
    icon: 'book',
    badge: 'Coming Soon',
    active: false,
    questionCount: 35,
    defaultTimeMinutes: 15,
    questions: [],
    colorScheme: {
      gradient: 'from-pink-600 to-rose-600',
      badgeBg: 'bg-rose-500/10 text-rose-300/60 border-rose-500/20',
      glow: 'rgba(244, 63, 94, 0.1)',
      cardBorder: 'hover:border-slate-700',
    },
    tags: ['Modifiers', 'Nuanced Usage']
  }
];
