// scripts/cat4_distinctions.cjs
// 100 Curated Hard & Everyday Questions on Tricky Distinctions & Confusing Pairs
// IDs 801 - 900

function makeQ(id, question, correct, distractors, explanation) {
  const targetPos = id % 4;
  const filtered = distractors.filter(d => d.toLowerCase() !== correct.toLowerCase()).slice(0, 3);
  while (filtered.length < 3) {
    const pool = ["in", "on", "at", "by", "for", "with", "to", "from", "of", "about", "into", "through"];
    for (const p of pool) {
      if (p.toLowerCase() !== correct.toLowerCase() && !filtered.includes(p)) {
        filtered.push(p);
        if (filtered.length === 3) break;
      }
    }
  }
  filtered.splice(targetPos, 0, correct);
  return {
    id,
    question,
    options: filtered,
    correctIndex: targetPos,
    explanation,
    category: "Tricky Distinctions & Confusing Pairs"
  };
}

const distinctionItems = [
  // 801-850
  [801, "The morning commuter train departed at 8:05 sharp, exactly _____ time according to the schedule.", "on", ["in", "at", "by"], "'On time' means punctual according to an official timetable. 'In time' means with enough time to spare."],
  [802, "We ran through the terminal and boarded the plane just _____ time before the gate doors closed.", "in", ["on", "at", "by"], "'In time' means before it is too late or with time to spare before a deadline."],
  [803, "_____ the end of the thrilling movie, the detective revealed the true mastermind.", "At", ["In", "On", "By"], "'At the end' refers to the specific physical or temporal point where something concludes."],
  [804, "They argued for three weeks, but _____ the end, they compromised and signed the lease.", "in", ["at", "on", "by"], "'In the end' is an idiom meaning finally, after a long process, or all things considered."],
  [805, "The autopsy confirmed that the patient died _____ a sudden massive coronary heart attack.", "of", ["from", "with", "by"], "In standard English, one 'dies of' an internal disease or natural illness, but 'dies from' an external cause or injury."],
  [806, "Tragically, three soldiers died _____ severe blood loss resulting from shrapnel wounds.", "from", ["of", "by", "with"], "One 'dies from' external factors, wounds, exposure, starvation, or indirect causes."],
  [807, "I completely agree _____ your assessment of the market downturn; your analysis is spot on.", "with", ["to", "on", "about"], "We 'agree with' a person or an opinion."],
  [808, "The union representatives finally agreed _____ the revised terms of the severance package.", "to", ["with", "on", "about"], "We 'agree to' a proposal, contract, terms, or recommendation."],
  [809, "After days of debate, the city council could not agree _____ a suitable location for the new landfill.", "on", ["with", "to", "for"], "A collective group 'agrees on' (or 'about') a topic or decision to be resolved."],
  [810, "How does modern digital photography differ _____ traditional analog chemical film?", "from", ["with", "to", "than"], "When expressing dissimilarity or contrast between items, use 'differ from'."],
  [811, "I must respectfully differ _____ you regarding the timing of our product release.", "with", ["from", "to", "against"], "When one person disagrees with another person's view, they 'differ with' them."],
  [812, "Poets often compare human life _____ a fleeting river that flows continuously to the sea.", "to", ["with", "than", "from"], "'Compare to' is used when likening or analogizing two fundamentally dissimilar things."],
  [813, "If you compare our quarterly earnings _____ those of our closest competitor, we are far ahead.", "with", ["to", "than", "against"], "'Compare with' is used when examining similarities and differences between two comparable items."],
  [814, "Why are you so angry _____ your assistant? It was an honest typographical mistake.", "with", ["about", "on", "to"], "We are 'angry with' (or 'angry at') a person when directing frustration at them."],
  [815, "Citizens are rightfully angry _____ the municipal council's sudden decision to raise water fees.", "about", ["with", "to", "towards"], "We are 'angry about' (or 'angry at') a situation, decision, or event."],
  [816, "Our international flight will arrive _____ London Heathrow early tomorrow morning.", "in", ["at", "on", "to"], "We 'arrive in' large cities, countries, or regions, but 'arrive at' specific buildings, stations, or airports."],
  [817, "What time does your train arrive _____ Grand Central Station in New York?", "at", ["in", "on", "to"], "We 'arrive at' a specific point, building, airport, or station."],
  [818, "Following the severe car accident, she was kept _____ hospital for three days of observation.", "in", ["at", "on", "by"], "In British/standard English, being 'in hospital' means admitted as a patient. 'At the hospital' means visiting."],
  [819, "I am currently _____ the hospital visiting my colleague who had surgery this morning.", "at", ["in", "on", "by"], "Being 'at the hospital' indicates physical presence as a visitor, not being hospitalized as a patient."],
  [820, "At age fourteen, most teenagers in the country are still enrolled _____ school.", "at", ["in", "on", "with"], "Being 'at school' denotes attending educational sessions as a student."],
  [821, "There is a cozy reading armchair tucked neatly _____ the far corner of the living room.", "in", ["on", "at", "by"], "We say 'in the corner' of an enclosed room or 3D interior."],
  [822, "Meet me _____ the corner of 5th Avenue and 42nd Street right outside the coffee shop.", "on", ["in", "at", "by"], "We say 'on the corner' (or 'at the corner') of intersecting outdoor streets."],
  [823, "The faithful dog sat quietly _____ its master's chair throughout the evening.", "beside", ["besides", "except", "along"], "'Beside' means next to or by the side of. 'Besides' means in addition to or apart from."],
  [824, "_____ his monthly salary, the software architect receives annual stock bonuses.", "Besides", ["Beside", "Apart", "Next to"], "'Besides' means in addition to or furthermore. 'Beside' means physically next to."],
  [825, "The negotiations are taking place exclusively _____ the United States and Canada.", "between", ["among", "amid", "with"], "'Between' is used when distinguishing individual, distinct entities or two parties."],
  [826, "The lottery winnings were divided equally _____ the seven lucky factory workers.", "among", ["between", "amid", "with"], "'Among' is used when dividing between three or more collective members of an undivided group."],
  [827, "A sudden flash of lightning illuminated the sky _____ the torrential thunder and wind.", "amid", ["among", "between", "within"], "'Amid' (or 'amidst') is used with uncountable nouns indicating chaos, noise, storm, or confusion."],
  [828, "All project deliverables must be uploaded _____ 5:00 PM on Friday afternoon.", "by", ["until", "since", "for"], "'By' specifies a deadline (not later than that time). 'Until' indicates an action continuing up to that point."],
  [829, "The university library will remain open _____ midnight for students studying for finals.", "until", ["by", "since", "for"], "'Until' (or 'till') marks the continuation of an ongoing state up to a specified end point."],
  [830, "The guest speaker delivered an inspiring lecture that lasted _____ two full hours.", "for", ["during", "while", "since"], "'For' expresses a duration of time (for two hours). 'During' is used with a noun event (during the speech)."],
  [831, "Several audience members fell asleep _____ the excessively long academic presentation.", "during", ["for", "while", "since"], "'During' indicates when an event took place within a named period or occasion."],
  [832, "The elderly pirate was completely blind _____ his left eye due to a sword wound.", "in", ["to", "with", "of"], "A person is literally 'blind in' an eye, but figuratively 'blind to' someone's faults."],
  [833, "She was so infatuated that she was blind _____ all her partner's glaring dishonesties.", "to", ["in", "with", "of"], "Metaphorically, one is 'blind to' reality, faults, or flaws."],
  [834, "It broke his heart to part _____ his beloved childhood home when moving abroad.", "with", ["from", "to", "away"], "We 'part with' a possession or treasured object, but 'part from' a person."],
  [835, "She wept tears of grief when she had to part _____ her lifelong friend at the train station.", "from", ["with", "to", "away"], "We 'part from' a human companion."],
  [836, "A humble Buddhist monk strives to live _____ simple spiritual principles rather than wealth.", "by", ["on", "with", "in"], "We 'live by' moral principles or rules, but 'live on' money or a food diet."],
  [837, "Can a family of four comfortably live _____ three thousand dollars a month in this city?", "on", ["by", "with", "in"], "'Live on' indicates the financial resources or food that sustains someone."],
  [838, "The pediatric dentist was remarkably good _____ young, nervous children.", "with", ["at", "to", "for"], "'Good with' people indicates having interpersonal patience, empathy, or skill."],
  [839, "Our lead data engineer is exceptionally good _____ optimizing relational database queries.", "at", ["with", "in", "for"], "'Good at' denotes proficiency or technical skill in performing an activity."],
  [840, "Eating a rainbow of fresh organic vegetables every day is exceptionally good _____ your gut microbiome.", "for", ["to", "at", "with"], "'Good for' indicates health-promoting or beneficial."],
  [841, "The generous elderly lady was always remarkably good _____ the stray animals in her neighborhood.", "to", ["with", "at", "for"], "'Good to' someone means being kind, compassionate, and benevolent toward them."],
  [842, "Are you already familiar _____ the revised procedures for international business travel?", "with", ["to", "about", "for"], "A person is 'familiar with' a subject (having knowledge of it)."],
  [843, "His voice sounded vaguely familiar _____ me, though I could not place where we had met.", "to", ["with", "about", "for"], "A sound, face, or topic is 'familiar to' an observer (recognized by them)."],
  [844, "This herbal broth has a distinct taste _____ wild mountain rosemary and garlic.", "of", ["for", "to", "with"], "'Taste of' refers to the actual sensory flavor perceived."],
  [845, "Growing up in Vienna gave him an enduring taste _____ classical orchestral symphonies.", "for", ["of", "to", "with"], "'Taste for' means a liking, appreciation, or appetite for an aesthetic or experience."],
  [846, "How much did the dental surgeon charge you _____ extracting your impacted wisdom tooth?", "for", ["with", "to", "on"], "We 'charge someone for' a service or item provided."],
  [847, "The grand jury formally charged the city mayor _____ accepting bribes from real estate developers.", "with", ["for", "of", "to"], "One is 'charged with' a crime or criminal offense."],
  [848, "The serial number on the invoice corresponds _____ the barcode on the shipping crate.", "to", ["with", "for", "at"], "'Correspond to' means to match, equal, or be equivalent to."],
  [849, "For thirty years, the two botanists corresponded regularly _____ each other by handwritten letter.", "with", ["to", "for", "at"], "'Correspond with' means to exchange letters or messages with someone."],
  [850, "The university chancellor will confer a prestigious lifetime honor _____ the Nobel laureate.", "on", ["with", "to", "for"], "We 'confer an honor on/upon' someone, but 'confer with' colleagues (consult)."]
];

// 851-900
const moreDistinctionItems = [
  [851, "Before submitting the bid, the project manager conferred _____ her senior engineers.", "with", ["on", "to", "about"], "'Confer with' means to consult or deliberate with other individuals."],
  [852, "Both sovereign nations agreed to enter _____ a formal mutual defense pact.", "into", ["in", "to", "onto"], "We 'enter into' an agreement, contract, or negotiation (figurative entry)."],
  [853, "The doctor asked the patient to enter _____ the examination room and take a seat.", "into", ["in", "to", ""], "When referring to physical entry into a room, 'enter' is transitive without preposition: 'enter the room'."],
  [854, "Let's gather in the conference room to discuss _____ the new marketing strategy.", "", ["about", "on", "over"], "The verb 'discuss' is transitive and takes a direct object with NO preposition ('discuss the strategy', never 'discuss about')."],
  [855, "The keynote speaker wanted to emphasize _____ the vital importance of early childhood literacy.", "", ["on", "upon", "about"], "The verb 'emphasize' takes a direct object with NO preposition ('emphasize a point', not 'emphasize on')."],
  [856, "The investigative board placed strong emphasis _____ following flight checklist protocols.", "on", ["upon", "in", "to"], "The noun 'emphasis' takes the preposition 'on' ('put emphasis on something')."],
  [857, "The parliamentary standing committee comprises _____ twelve elected representatives.", "", ["of", "from", "with"], "In active voice, 'comprise' takes a direct object with NO 'of' ('comprises twelve members'). 'Composed of' uses 'of'."],
  [858, "Water is fundamentally composed _____ two hydrogen atoms and one oxygen atom.", "of", ["from", "by", "with"], "'Composed of' is the standard passive phrasing for chemical or physical makeup."],
  [859, "The energetic little boy closely resembles _____ his maternal grandfather in both smile and wit.", "", ["to", "with", "after"], "The verb 'resemble' is transitive and takes NO preposition ('he resembles his grandfather')."],
  [860, "The frightened cat leapt startled off the couch and dashed straight _____ the open closet.", "into", ["in", "to", "onto"], "'Into' indicates dynamic movement from outside to inside a 3D enclosure."],
  [861, "The kitten climbed up the curtains and jumped delicately _____ the high fireplace mantle.", "onto", ["on", "to", "into"], "'Onto' indicates movement ending upon an elevated surface."],
  [862, "The adventurous backpackers hiked straight _____ the dense bamboo jungle for three hours.", "through", ["across", "along", "over"], "'Through' indicates movement inside a 3-dimensional volume like a forest, tunnel, or crowd."],
  [863, "The marathon runners sprinted _____ the wide suspension bridge toward the finish line.", "across", ["through", "along", "into"], "'Across' indicates movement from one side to the other over a flat surface or bridge."],
  [864, "We spent a tranquil Sunday afternoon walking slowly _____ the scenic canal towpath.", "along", ["across", "through", "over"], "'Along' means moving in a line following the path or edge of something."],
  [865, "The submarine descended to an operational depth three hundred meters _____ sea level.", "below", ["under", "underneath", "down"], "'Below' is standard for points on a vertical scale or measurement relative to a benchmark (sea level)."],
  [866, "The dog was hiding quietly _____ the kitchen dining table during the thunderstorm.", "under", ["below", "beneath", "down"], "'Under' indicates being directly beneath a physical covering or object."],
  [867, "Such dishonest, underhanded behavior is completely _____ the dignity of this court.", "beneath", ["under", "below", "down"], "'Beneath' is used idiomatically to describe actions unworthy of or lowering one's dignity."],
  [868, "A flock of migratory Canadian geese flew directly _____ our cabin heading south.", "over", ["above", "up", "across"], "'Over' indicates movement directly across and above something."],
  [869, "The remote alpine weather station sits at an elevation high _____ the cloud line.", "above", ["over", "up", "on"], "'Above' is standard when expressing higher position on a vertical altitude scale."],
  [870, "I have been living in this coastal town _____ 2018.", "since", ["for", "from", "in"], "'Since' marks a specific starting point in time extending up to the present."],
  [871, "She has worked as an emergency room physician _____ twelve consecutive years.", "for", ["since", "during", "in"], "'For' expresses the total duration of an ongoing period."],
  [872, "The furious customer lost his temper and shouted angrily _____ the store cashier.", "at", ["to", "with", "on"], "'Shout at' conveys hostility, reprimand, or anger directed at a person."],
  [873, "Because the wind was roaring, the sailor had to shout _____ his deckmate to be heard.", "to", ["at", "with", "on"], "'Shout to' someone indicates projecting one's voice loudly so a distant person can hear."],
  [874, "The angry protester threw a heavy cobblestone _____ the riot police barrier.", "at", ["to", "towards", "on"], "'Throw at' someone or something indicates aiming aggressively to hit or damage them."],
  [875, "The quarterback threw the football cleanly _____ the sprinting wide receiver.", "to", ["at", "towards", "with"], "'Throw to' indicates passing an object for the other person to catch."],
  [876, "Parents are naturally anxious _____ their child's recovery following major surgery.", "about", ["for", "with", "of"], "'Anxious about' indicates feeling worried, fearful, or nervous regarding an outcome."],
  [877, "After years of brutal war, the civilian population was desperately anxious _____ peace.", "for", ["about", "with", "to"], "'Anxious for' is a formal expression meaning eagerly and intensely desirous of something."],
  [878, "A good pediatrician must be endlessly patient _____ young children who are terrified of needles.", "with", ["of", "to", "for"], "'Patient with' indicates demonstrating calm forbearance toward people."],
  [879, "Would it be convenient _____ you to reschedule our meeting to Friday afternoon?", "for", ["to", "with", "at"], "'Convenient for' is standard when referring to a person's schedule or ease."],
  [880, "The prize money was divided equally _____ the three co-inventors of the patent.", "among", ["between", "within", "amid"], "'Among' is used for collective division among three or more recipients."],
  [881, "Last night, I had a vivid and terrifying dream _____ falling from an endless cliff.", "about", ["of", "with", "in"], "We say 'dream about' when referring to mental images experienced while asleep."],
  [882, "As a child, she always dreamed _____ becoming an astronaut and walking on Mars.", "of", ["about", "for", "with"], "We say 'dream of' when referring to a lifelong aspiration, vision, or daydream."],
  [883, "I have not heard _____ my brother in three weeks because he is hiking in the Yukon.", "from", ["of", "about", "with"], "'Hear from' means to receive a letter, phone call, or message from someone."],
  [884, "Have you ever heard _____ an obscure nineteenth-century poet named Thomas Lovell Beddoes?", "of", ["from", "about", "with"], "'Hear of' means to be aware of the existence of someone or something."],
  [885, "Have you heard _____ the new government grant for residential solar roof installations?", "about", ["of", "from", "with"], "'Hear about' means to receive detailed information or news regarding an event or topic."],
  [886, "Could you please look _____ my pet cat while I am away on vacation for the weekend?", "after", ["for", "into", "at"], "'Look after' is a phrasal verb meaning to take care of or attend to someone or something."],
  [887, "Detectives are continuing to look _____ the suspicious circumstances of the warehouse fire.", "into", ["after", "for", "at"], "'Look into' means to investigate or examine thoroughly."],
  [888, "I have been looking _____ my reading glasses everywhere, but I cannot locate them.", "for", ["after", "into", "at"], "'Look for' means to search for something lost."],
  [889, "This sturdy farmhouse dining table is made completely _____ solid heartwood oak.", "of", ["from", "with", "by"], "'Made of' is used when the basic material has not undergone fundamental chemical alteration."],
  [890, "Traditional red wine is made _____ fermented dark grape juice and natural yeasts.", "from", ["of", "with", "by"], "'Made from' is used when raw materials undergo chemical transformation into a new substance."],
  [891, "The gourmet chocolate chip cookies were made _____ European butter and organic vanilla.", "with", ["of", "from", "by"], "'Made with' highlights specific key ingredients used in a culinary preparation."],
  [892, "The cat jumped startled _____ the kitchen counter when the blender roared to life.", "off", ["out of", "from", "away"], "'Off' denotes movement away and down from a surface."],
  [893, "The panicked passengers evacuated hurriedly _____ the smoke-filled train cabin.", "out of", ["off", "from", "away"], "'Out of' denotes movement from an interior enclosure to the exterior."],
  [894, "The angry customer pointed an accusatory finger directly _____ the nervous shopkeeper.", "at", ["to", "towards", "on"], "'Point at' indicates directing a finger, weapon, or gaze directly at a target."],
  [895, "Economists point _____ historically low unemployment as an indicator of recovery.", "to", ["at", "towards", "on"], "'Point to' indicates citing something as evidence, reason, or a trend."],
  [896, "Please remind me _____ call the dentist on Tuesday morning to book an appointment.", "to", ["of", "about", "for"], "'Remind to do' followed by an infinitive prompts someone to execute an action."],
  [897, "That antique oak roll-top desk reminds me strongly _____ my late grandfather's study.", "of", ["about", "with", "to"], "'Remind someone of something' means to bring back a nostalgic memory or comparison."],
  [898, "Reckless and aggressive driving will inevitably result _____ catastrophic collisions.", "in", ["from", "to", "with"], "'Result in' denotes producing or causing a direct outcome."],
  [899, "Chronic back pain often results _____ improper lumbar posture while sitting at a desk.", "from", ["in", "to", "with"], "'Result from' indicates originating or being caused by a root factor."],
  [900, "She had to choose _____ accepting the job offer in London or staying in Edinburgh.", "between", ["among", "from", "with"], "'Between' is mandatory when distinguishing between two specific alternatives."]
];

const allCat4Raw = [...distinctionItems, ...moreDistinctionItems];
const cat4Questions = allCat4Raw.map(it => makeQ(it[0], it[1], it[2], it[3], it[4]));
console.log(`Category 4 loaded: ${cat4Questions.length} questions.`);

module.exports = cat4Questions;
