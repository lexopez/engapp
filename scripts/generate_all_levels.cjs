// scripts/generate_all_levels.cjs
const fs = require('fs');
const path = require('path');
const basicQuestions = require('./generate_basic_prepositions.cjs');

// Helper to create questions
function makeQ(sentence, correct, distractors, explanation, category, difficulty) {
  const uniqueDistractors = distractors.filter(d => d.toLowerCase() !== correct.toLowerCase()).slice(0, 3);
  const fallbacks = ["in", "on", "at", "by", "for", "with", "to", "from", "of", "about", "under", "through", "into", "over", "between"];
  for (const fb of fallbacks) {
    if (uniqueDistractors.length >= 3) break;
    if (fb.toLowerCase() !== correct.toLowerCase() && !uniqueDistractors.includes(fb)) {
      uniqueDistractors.push(fb);
    }
  }

  const options = [...uniqueDistractors];
  let hash = 0;
  for (let i = 0; i < sentence.length; i++) {
    hash = (hash << 5) - hash + sentence.charCodeAt(i);
    hash |= 0;
  }
  const targetPos = Math.abs(hash) % 4;
  options.splice(targetPos, 0, correct);

  return {
    question: sentence,
    options,
    correctIndex: targetPos,
    explanation,
    category,
    difficulty,
    level: difficulty
  };
}

console.log("Helper loaded. Building additional basic questions to reach 300 basic questions...");
