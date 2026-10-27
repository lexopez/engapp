// scripts/assemblePrepositions.cjs
const fs = require('fs');
const path = require('path');

const cat1 = require('./cat1_adjectives.cjs');
const cat2 = require('./cat2_verbs.cjs');
const cat3 = require('./cat3_idioms.cjs');
const cat4 = require('./cat4_distinctions.cjs');
const cat5 = require('./cat5_phrasals.cjs');

console.log(`Cat 1 count: ${cat1.length}`);
console.log(`Cat 2 count: ${cat2.length}`);
console.log(`Cat 3 count: ${cat3.length}`);
console.log(`Cat 4 count: ${cat4.length}`);
console.log(`Cat 5 count: ${cat5.length}`);

const allQuestions = [...cat1, ...cat2, ...cat3, ...cat4, ...cat5];
console.log(`Total assembled questions: ${allQuestions.length}`);

if (allQuestions.length !== 1000) {
  console.error(`ERROR: Expected 1000 questions, got ${allQuestions.length}`);
  process.exit(1);
}

// Verification of every single question
const ids = new Set();
for (let i = 0; i < allQuestions.length; i++) {
  const q = allQuestions[i];
  const expectedId = i + 1;
  q.id = expectedId; // Guarantee sequential 1 to 1000

  if (ids.has(q.id)) {
    console.error(`Duplicate ID found: ${q.id}`);
    process.exit(1);
  }
  ids.add(q.id);

  if (!q.question || typeof q.question !== 'string' || !q.question.includes('_____')) {
    console.error(`Invalid question format at id ${q.id}: "${q.question}"`);
    process.exit(1);
  }

  if (!Array.isArray(q.options) || q.options.length !== 4) {
    console.error(`Options length is not 4 at id ${q.id}:`, q.options);
    process.exit(1);
  }

  if (typeof q.correctIndex !== 'number' || q.correctIndex < 0 || q.correctIndex > 3) {
    console.error(`Invalid correctIndex at id ${q.id}: ${q.correctIndex}`);
    process.exit(1);
  }

  if (!q.explanation || typeof q.explanation !== 'string') {
    console.error(`Invalid explanation at id ${q.id}`);
    process.exit(1);
  }

  if (!q.category || typeof q.category !== 'string') {
    console.error(`Invalid category at id ${q.id}`);
    process.exit(1);
  }
}

console.log("All 1,000 questions passed complete integrity checks!");

// Generate ES module file for src/data/prepositionsQuestions.js
const targetFile = path.resolve(__dirname, '../src/data/prepositionsQuestions.js');
const fileContent = `// 1,000 Curated Hard & Everyday Preposition Questions for Civil Service Exam & Professional English Mastery
// Generated with comprehensive explanations across 5 core categories

export const prepositionsQuestions = ${JSON.stringify(allQuestions, null, 2)};
`;

fs.writeFileSync(targetFile, fileContent, 'utf8');
const stats = fs.statSync(targetFile);
console.log(`Successfully written to ${targetFile}`);
console.log(`File size: ${(stats.size / 1024).toFixed(2)} KB`);
