// scripts/buildPrepositions1000.js
const fs = require('fs');
const path = require('path');

// Helper to shuffle distractors so correct answer isn't always at the same position
function makeQuestion(id, sentence, correct, distractors, explanation, category) {
  // Ensure unique 4 options
  const uniqueDistractors = distractors.filter(d => d.toLowerCase() !== correct.toLowerCase()).slice(0, 3);
  while (uniqueDistractors.length < 3) {
    const fallbacks = ["in", "on", "at", "by", "for", "with", "to", "from", "of", "about", "under", "through"];
    for (const fb of fallbacks) {
      if (fb.toLowerCase() !== correct.toLowerCase() && !uniqueDistractors.includes(fb)) {
        uniqueDistractors.push(fb);
        if (uniqueDistractors.length === 3) break;
      }
    }
  }

  // Deterministic placement based on id so test builds are reproducible
  const targetPos = id % 4;
  const options = [...uniqueDistractors];
  options.splice(targetPos, 0, correct);

  return {
    id,
    question: sentence,
    options,
    correctIndex: targetPos,
    explanation,
    category
  };
}

console.log("Helper defined successfully");
