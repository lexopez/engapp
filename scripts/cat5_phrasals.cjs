// scripts/cat5_phrasals.cjs
// 100 Curated Hard & Everyday Questions on Phrasal Prepositional Verbs
// IDs 901 - 1000

function makeQ(id, question, correct, distractors, explanation) {
  const targetPos = id % 4;
  const filtered = distractors.filter(d => d.toLowerCase() !== correct.toLowerCase()).slice(0, 3);
  while (filtered.length < 3) {
    const pool = ["in", "on", "at", "by", "for", "with", "to", "from", "of", "about", "up", "down"];
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
    category: "Phrasal Prepositional Verbs"
  };
}

const phrasalItems = [
  // 901-950
  [901, "I simply refuse to put up _____ his disrespectful and condescending attitude any longer.", "with", ["for", "to", "at"], "'Put up with' is a multi-word phrasal verb meaning to tolerate, endure, or bear patiently."],
  [902, "It is arrogant and snobbish to look down _____ colleagues who did not attend elite universities.", "on", ["at", "to", "with"], "'Look down on' (or 'upon') means to consider oneself superior to someone else."],
  [903, "We are all looking forward _____ welcoming you to our annual research symposium in Boston.", "to", ["for", "with", "at"], "'Look forward to' is followed by a noun or gerund (looking forward to welcoming), never a base verb."],
  [904, "Half the engineering team came down _____ a nasty viral flu right before the product release.", "with", ["from", "of", "to"], "'Come down with' means to become sick or contract a contagious illness."],
  [905, "The emergency generator shut off unexpectedly when it ran out _____ diesel fuel.", "of", ["from", "with", "off"], "'Run out of' means to completely deplete or exhaust the available supply of something."],
  [906, "This weekend, I desperately need to catch up _____ three weeks of unread professional correspondence.", "on", ["with", "to", "at"], "'Catch up on' means to do backlogged work that one did not have time to do earlier."],
  [907, "Doctors strongly advise heart patients to cut down _____ sodium, saturated fats, and processed meats.", "on", ["from", "with", "in"], "'Cut down on' means to reduce the quantity or consumption of something."],
  [908, "If our primary cloud provider experiences an outage, our systems will automatically fall back _____ local backup servers.", "on", ["to", "with", "in"], "'Fall back on' means to turn to a reserve or secondary plan when the main plan fails."],
  [909, "A true friend is always willing to stand up _____ you when others speak ill behind your back.", "for", ["to", "with", "against"], "'Stand up for' means to defend, support, or advocate for someone or something."],
  [910, "While hiking through rattlesnake country, you must always look out _____ hidden coils under rocks.", "for", ["to", "at", "with"], "'Look out for' means to be vigilant, alert, and watchful for potential hazards or people."],
  [911, "The corporate embezzler believed he could get away _____ falsifying shipping receipts indefinitely.", "with", ["from", "by", "for"], "'Get away with' means to escape blame, reprimand, or punishment for a wrongful act."],
  [912, "Senior executives must eventually face up _____ the reality that the legacy product is obsolete.", "to", ["with", "for", "against"], "'Face up to' means to confront, acknowledge, and accept an unpleasant or difficult reality."],
  [913, "The newly appointed administrative director decided to do away _____ tedious paper approval forms.", "with", ["from", "of", "to"], "'Do away with' means to abolish, eliminate, or discard an outdated rule, system, or object."],
  [914, "After spending an hour chit-chatting about sports, the partners finally got down _____ business.", "to", ["with", "on", "for"], "'Get down to' means to begin giving serious, focused attention or effort to a task."],
  [915, "Do you generally get along well _____ your new cubicle neighbor at the office?", "with", ["to", "for", "at"], "'Get along with' (or 'get on with') means to have a friendly, smooth relationship with someone."],
  [916, "The research team spent months trying to come up _____ an efficient method for carbon capture.", "with", ["to", "for", "on"], "'Come up with' means to invent, conceive, or produce an idea, solution, or sum of money."],
  [917, "No amount of belated apologies can ever make up _____ the profound emotional hurt caused.", "for", ["to", "with", "in"], "'Make up for' means to compensate for, atone for, or counterbalance an injury or shortcoming."],
  [918, "In the dead of winter, the irresponsible tenant walked out _____ his roommate, leaving unpaid rent.", "on", ["with", "to", "from"], "'Walk out on' someone means to suddenly abandon, desert, or leave them in a lurch."],
  [919, "During the security audit, forensic analysts zeroed in _____ the suspicious overseas IP address.", "on", ["to", "at", "with"], "'Zero in on' means to direct all one's attention, aim, or scrutiny precisely upon a target."],
  [920, "Before your job interview in Paris, you should definitely brush up _____ your conversational French.", "on", ["with", "in", "to"], "'Brush up on' means to refresh or practice one's knowledge of a previously learned skill."],
  [921, "The prospective buyer backed out _____ the real estate contract forty-eight hours before closing.", "of", ["from", "with", "off"], "'Back out of' means to withdraw from an agreement, contract, or promise."],
  [922, "Federal tax investigators began to bear down _____ companies that concealed offshore profits.", "on", ["to", "with", "over"], "'Bear down on' means to exert intense pressure on, or approach menacingly toward someone."],
  [923, "My supervisor called unexpectedly this morning to check up _____ my progress on the quarterly audit.", "on", ["with", "to", "for"], "'Check up on' means to investigate or monitor the condition, progress, or loyalty of someone."],
  [924, "The city police department announced plans to clamp down _____ reckless drag racing on suburban streets.", "on", ["to", "with", "against"], "'Clamp down on' means to take strict, punitive measures to suppress illegal or undesirable activity."],
  [925, "He made the difficult decision to drop out _____ medical school to pursue a career in software.", "of", ["from", "off", "away"], "'Drop out of' means to quit, withdraw from, or abandon a course of study or race."],
  [926, "A reliable contractor always follows through _____ every commitment specified in the contract.", "on", ["with", "to", "for"], "'Follow through on' (or 'with') means to complete an initiative, promise, or responsibility."],
  [927, "The veteran baseball player held out _____ a five-year contract extension before reporting to camp.", "for", ["to", "with", "on"], "'Hold out for' means to wait stubbornly and refuse to settle until one receives what is demanded."],
  [928, "It can be exhausting trying to keep up _____ the frantic pace of modern tech industry changes.", "with", ["to", "on", "for"], "'Keep up with' means to maintain the same pace as, or stay informed alongside developments."],
  [929, "The highly anticipated movie sequel failed to live up _____ the astronomical expectations of critics.", "to", ["with", "for", "at"], "'Live up to' means to fulfill, match, or reach an expected standard or reputation."],
  [930, "Before visiting the historic Roman ruins, she read up _____ ancient classical architecture.", "on", ["with", "about", "to"], "'Read up on' means to research and learn about a topic by reading books or articles."],
  [931, "Thousands of high school seniors signed up _____ the national scholarship competition.", "for", ["to", "with", "in"], "'Sign up for' means to commit oneself or register for an activity, contest, or course."],
  [932, "A good mentor never talks down _____ interns; she explains complex procedures with patience.", "to", ["at", "with", "for"], "'Talk down to' someone means to speak in a condescending, patronizing, or superior manner."],
  [933, "Her family tried their best to talk her out _____ investing her life savings in the risky startup.", "of", ["from", "off", "away"], "'Talk someone out of' followed by a gerund means to persuade someone not to do something."],
  [934, "The gifted rookie walked away _____ the top three prizes at the national science fair.", "with", ["from", "to", "by"], "'Walk away with' an award means to win or capture it effortlessly and decisively."],
  [935, "The committee members gradually warmed up _____ the proposal after seeing the pilot test data.", "to", ["with", "for", "towards"], "'Warm up to' an idea or person means to become friendlier, more receptive, or enthusiastic."],
  [936, "The chief medical officer was asked to weigh in _____ the controversy regarding new mask mandates.", "on", ["to", "with", "about"], "'Weigh in on' means to give an opinion, assessment, or input in a discussion or debate."],
  [937, "If you aren't careful with your credit card spending, you will wind up _____ crushing debt.", "with", ["in", "to", "for"], "'Wind up with' means to end up possessing or stuck with an undesirable outcome."],
  [938, "With final exams just three weeks away, it is time to knuckle down _____ serious studying.", "to", ["with", "on", "for"], "'Knuckle down to' means to begin applying oneself intensely, vigorously, and seriously to work."],
  [939, "Make sure you tune in _____ tomorrow night's live television broadcast of the debate.", "to", ["at", "on", "with"], "'Tune in to' means to set a radio or television receiver to a station, or pay close attention."],
  [940, "Under severe stress, the exhausted manager lashed out _____ innocent junior staff members.", "at", ["to", "on", "against"], "'Lash out at' means to attack someone suddenly and violently, either verbally or physically."],
  [941, "The young replacement violinist did not measure up _____ the virtuosity of the orchestra's former master.", "to", ["with", "for", "at"], "'Measure up to' means to meet or fulfill required standards, expectations, or levels of quality."],
  [942, "Ultimately, the complex geopolitical conflict boils down _____ competition over fresh water rights.", "to", ["with", "for", "into"], "'Boil down to' means to be summarized as or reduced to the fundamental, essential element."],
  [943, "The mentor created an internship program to bridge the gap _____ academic study and industry practice.", "between", ["among", "with", "from"], "'Bridge the gap between' means to connect or reduce the distance between two distinct domains."],
  [944, "After reviewing fifty applications, the committee narrowed the candidates down _____ three finalists.", "to", ["with", "for", "into"], "'Narrow down to' means to reduce a large list of options to a small, manageable number."],
  [945, "The detective decided to play along _____ the suspect's story until more forensic proof was found.", "with", ["to", "for", "on"], "'Play along with' means to pretend to cooperate or agree with someone temporarily."],
  [946, "I cannot in good conscience go along _____ a plan that knowingly deceives our customers.", "with", ["to", "for", "on"], "'Go along with' means to agree with, support, or consent to a decision or opinion."],
  [947, "The diplomatic delegates stayed up late into the night to iron out minor differences _____ the draft treaty.", "in", ["on", "with", "at"], "'Iron out differences in' means to resolve or smooth out minor disputes or problems."],
  [948, "The central bank had to step in to bail the struggling regional lender out _____ insolvency.", "of", ["from", "with", "off"], "'Bail someone out of' means to rescue someone from financial crisis or serious difficulty."],
  [949, "Despite intense public controversy, the administration decided to carry on _____ the planned reforms.", "with", ["to", "for", "in"], "'Carry on with' means to continue doing something despite obstacles, interruptions, or opposition."],
  [950, "The newly hired teacher struggled to get her message across _____ the restless sixth-grade class.", "to", ["with", "at", "for"], "'Get across to' means to communicate an idea clearly and successfully to someone."]
];

// 951-1000
const morePhrasalItems = [
  [951, "We must look back _____ historical economic depressions to understand our current challenges.", "on", ["at", "to", "with"], "'Look back on' (or 'upon') means to reflect upon or remember the past."],
  [952, "Don't let a bad morning stand in the way _____ achieving your lifelong ambitions.", "of", ["to", "with", "for"], "'Stand in the way of' means to obstruct or impede progress."],
  [953, "The team had to fall back _____ emergency procedures when the main network router melted.", "on", ["to", "with", "in"], "'Fall back on' means to turn to a reserve or alternative."],
  [954, "She was thrilled to catch up _____ all the family news after spending two years overseas.", "on", ["with", "to", "for"], "'Catch up on' indicates learning or doing what has been missed."],
  [955, "I will not put up _____ insubordinate behavior in my classroom.", "with", ["for", "to", "at"], "'Put up with' means to tolerate or endure."],
  [956, "The CEO was accused of looking down _____ blue-collar factory employees.", "on", ["at", "to", "with"], "'Look down on' indicates snobbish superiority."],
  [957, "The school children are looking forward _____ the summer holidays with immense excitement.", "to", ["for", "with", "at"], "'Look forward to' takes a noun or gerund."],
  [958, "He woke up with chills and realized he had come down _____ the seasonal flu.", "with", ["from", "of", "to"], "'Come down with' denotes contracting an illness."],
  [959, "The bakery ran out _____ sourdough loaves before ten o'clock in the morning.", "of", ["from", "with", "off"], "'Run out of' means to exhaust supplies."],
  [960, "The doctor instructed the patient to cut back _____ caffeinated beverages.", "on", ["from", "with", "in"], "'Cut back on' means to reduce consumption."],
  [961, "Always have the moral courage to stand up _____ what is right and just.", "for", ["to", "with", "against"], "'Stand up for' means to defend or advocate."],
  [962, "When driving through national parks, look out _____ wild elk crossing the road.", "for", ["to", "at", "with"], "'Look out for' means to watch watchfully for hazards."],
  [963, "Did the shoplifter really think she could get away _____ taking the leather jacket?", "with", ["from", "by", "for"], "'Get away with' means to escape punishment."],
  [964, "It is time we faced up _____ our collective responsibility for climate action.", "to", ["with", "for", "against"], "'Face up to' means to confront a difficult reality."],
  [965, "The parliament voted to do away _____ outdated feudal property rights.", "with", ["from", "of", "to"], "'Do away with' means to abolish or get rid of."],
  [966, "Let us skip the pleasantries and get right down _____ the contract negotiation.", "to", ["with", "on", "for"], "'Get down to' means to focus seriously on a task."],
  [967, "Do you manage to get along _____ your mother-in-law when she visits?", "with", ["to", "for", "at"], "'Get along with' means having an amicable relationship."],
  [968, "Who managed to come up _____ this brilliant marketing slogan for our campaign?", "with", ["to", "for", "on"], "'Come up with' means to invent or formulate an idea."],
  [969, "The hotel offered complimentary spa vouchers to make up _____ the noisy construction outside.", "for", ["to", "with", "in"], "'Make up for' means to compensate for an annoyance."],
  [970, "The lead guitarist walked out _____ the band forty-five minutes before the concert began.", "on", ["with", "to", "from"], "'Walk out on' means to desert or abandon."],
  [971, "The telescope zeroed in _____ the faint light of a newly discovered supernova.", "on", ["to", "at", "with"], "'Zero in on' means focusing precisely on an object."],
  [972, "I need to brush up _____ my basic Italian grammar before traveling to Florence next month.", "on", ["with", "in", "to"], "'Brush up on' means to refresh one's skills."],
  [973, "It was too late for the investor to back out _____ the binding commercial acquisition.", "of", ["from", "with", "off"], "'Back out of' means withdrawing from an agreement."],
  [974, "Competitors began to bear down _____ the market leader with aggressive pricing discounts.", "on", ["to", "with", "over"], "'Bear down on' means exerting heavy pressure."],
  [975, "The nurse stops by every two hours to check up _____ post-operative patients.", "on", ["with", "to", "for"], "'Check up on' means monitoring someone's state."],
  [976, "Authorities must clamp down _____ counterfeit pharmaceutical trafficking immediately.", "on", ["to", "with", "against"], "'Clamp down on' means to take strict punitive measures."],
  [977, "The athlete was devastated when injury forced him to drop out _____ the Olympic marathon.", "of", ["from", "off", "away"], "'Drop out of' means withdrawing from a race or program."],
  [978, "Great leaders always follow through _____ their campaign promises once elected.", "on", ["with", "to", "for"], "'Follow through on' means keeping a promise."],
  [979, "The union decided to hold out _____ better medical benefits rather than settling early.", "for", ["to", "with", "on"], "'Hold out for' means waiting stubbornly for demands to be met."],
  [980, "She ran as fast as she could, but she could not keep up _____ the lead bicyclist.", "with", ["to", "on", "for"], "'Keep up with' means maintaining equal pace."],
  [981, "The performance of the luxury vehicle did not live up _____ its multi-million-dollar price tag.", "to", ["with", "for", "at"], "'Live up to' means meeting expected standards."],
  [982, "Before investing in biotechnology shares, read up _____ gene-editing clinical trials.", "on", ["with", "about", "to"], "'Read up on' means researching thoroughly."],
  [983, "Hundreds of eager students signed up _____ the introductory python workshop.", "for", ["to", "with", "in"], "'Sign up for' means registering for a course or activity."],
  [984, "The condescending professor was reprimanded for talking down _____ his teaching assistants.", "to", ["at", "with", "for"], "'Talk down to' means speaking condescendingly."],
  [985, "She tried to talk her brother out _____ quitting his stable accounting job.", "of", ["from", "off", "away"], "'Talk out of' means dissuading someone."],
  [986, "The young gymnast walked away _____ four gold medals at the international meet.", "with", ["from", "to", "by"], "'Walk away with' means winning easily."],
  [987, "The board gradually warmed up _____ the idea of allowing employees to work remotely forever.", "to", ["with", "for", "towards"], "'Warm up to' means becoming favorable to an idea."],
  [988, "Several economists were invited to weigh in _____ the government's proposed stimulus package.", "on", ["to", "with", "about"], "'Weigh in on' means sharing an opinion in debate."],
  [989, "If you don't save for retirement early, you might wind up _____ very little financial security.", "with", ["in", "to", "for"], "'Wind up with' means to end up having."],
  [990, "Stop procrastinating on social media and knuckle down _____ finishing your master's thesis.", "to", ["with", "on", "for"], "'Knuckle down to' means to begin working earnestly."],
  [991, "Millions of classical music lovers tune in _____ the Vienna Philharmonic's New Year's concert.", "to", ["at", "on", "with"], "'Tune in to' means to listen or watch a broadcast."],
  [992, "Under heavy questioning, the witness lashed out _____ the persistent defense attorney.", "at", ["to", "on", "against"], "'Lash out at' means attacking verbally in anger."],
  [993, "The applicant's qualifications simply did not measure up _____ the rigorous standards of NASA.", "to", ["with", "for", "at"], "'Measure up to' means meeting high criteria."],
  [994, "The argument between the partners boils down _____ a fundamental lack of mutual trust.", "to", ["with", "for", "into"], "'Boil down to' means summarizing the essential reason."],
  [995, "We need innovative mentoring programs to bridge the gap _____ school and employment.", "between", ["among", "with", "from"], "'Bridge the gap between' connects two sectors."],
  [996, "The search committee narrowed down the candidates _____ two exceptional scholars.", "to", ["with", "for", "into"], "'Narrow down to' reduces options to a final few."],
  [997, "The undercover officer played along _____ the thieves until backup units surrounded the building.", "with", ["to", "for", "on"], "'Play along with' means pretending to cooperate."],
  [998, "The minority shareholders refused to go along _____ the proposed hostile takeover.", "with", ["to", "for", "on"], "'Go along with' means agreeing to support."],
  [999, "The legal teams will meet tomorrow morning to iron out the remaining disputes _____ the contract.", "in", ["on", "with", "at"], "'Iron out in' means resolving differences."],
  [1000, "The government had to step in with emergency funds to bail the airline out _____ bankruptcy.", "of", ["from", "with", "off"], "'Bail out of' means rescuing someone from disaster or debt."]
];

const allCat5Raw = [...phrasalItems, ...morePhrasalItems];
const cat5Questions = allCat5Raw.map(it => makeQ(it[0], it[1], it[2], it[3], it[4]));
console.log(`Category 5 loaded: ${cat5Questions.length} questions.`);

module.exports = cat5Questions;
