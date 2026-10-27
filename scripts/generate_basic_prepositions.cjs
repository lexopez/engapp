// scripts/generate_basic_prepositions.cjs
// Comprehensive Basic Prepositions dataset covering:
// 1. Prepositions of Time (at, on, in, for, since, during, before, after, until, by)
// 2. Prepositions of Place & Location (in, on, at, under, over, above, below, behind, in front of, next to, between, opposite, near)
// 3. Prepositions of Movement & Direction (to, into, onto, out of, off, through, across, along, towards, past, from, around)
// 4. Prepositions of Manner, Agent & Instrument (by transport, on foot, by agent, with tool, without)
// 5. Basic Dependent Prepositions & Everyday Collocations (good at, interested in, proud of, afraid of, fond of, famous for, wait for, listen to, look at, belong to, arrive at/in, depend on, etc.)

function createQuestion(sentence, correct, distractors, explanation, category) {
  // Ensure 4 unique options
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

  // Shuffle options in a deterministic way for reproducibility
  const options = [...uniqueDistractors];
  const targetPos = Math.abs(sentence.length) % 4;
  options.splice(targetPos, 0, correct);

  return {
    question: sentence,
    options,
    correctIndex: targetPos,
    explanation,
    category,
    difficulty: 'basic',
    level: 'basic'
  };
}

const basicQuestionsData = [
  // --- PREPOSITIONS OF TIME: AT ---
  createQuestion(
    "The morning staff meeting starts promptly _____ 9:00 AM in the conference room.",
    "at", ["on", "in", "by"],
    "Use 'at' for precise clock times (e.g., at 9:00 AM, at 3:30, at noon).",
    "Prepositions of Time"
  ),
  createQuestion(
    "In the fairy tale, Cinderella had to leave the royal ball before the clock struck _____ midnight.",
    "at", ["on", "in", "for"],
    "Use 'at' with specific times of the day like 'at midnight', 'at noon', and 'at dawn'.",
    "Prepositions of Time"
  ),
  createQuestion(
    "Owls, bats, and other nocturnal animals prefer to hunt for food _____ night.",
    "at", ["in", "on", "during"],
    "We say 'at night', whereas we say 'in the morning', 'in the afternoon', and 'in the evening'.",
    "Prepositions of Time"
  ),
  createQuestion(
    "The roosters began crowing loudly right _____ sunrise across the sleepy village.",
    "at", ["in", "on", "with"],
    "Use 'at' for points of the natural day cycle such as 'at dawn', 'at sunrise', and 'at sunset'.",
    "Prepositions of Time"
  ),
  createQuestion(
    "Families across the country traditionally gather around the dinner table _____ Christmas.",
    "at", ["on", "in", "for"],
    "Use 'at' for holiday periods without the word 'Day' (e.g., at Christmas, at Easter, at New Year).",
    "Prepositions of Time"
  ),
  createQuestion(
    "I am currently attending a webinar and cannot take your call _____ the moment.",
    "at", ["in", "on", "by"],
    "'At the moment' (or 'at present') is a standard time expression meaning right now.",
    "Prepositions of Time"
  ),
  createQuestion(
    "In British English, friends frequently meet up for coffee and cinema _____ the weekend.",
    "at", ["in", "to", "by"],
    "'At the weekend' is standard British English, while American English often uses 'on the weekend'.",
    "Prepositions of Time"
  ),
  createQuestion(
    "The school cafeteria gets exceptionally crowded and noisy _____ lunchtime.",
    "at", ["in", "on", "for"],
    "Use 'at' for designated meal times: 'at lunchtime', 'at dinner', 'at breakfast'.",
    "Prepositions of Time"
  ),
  createQuestion(
    "Parents often read bedtime storybooks to their toddlers _____ bedtime.",
    "at", ["in", "on", "with"],
    "Use 'at' with 'at bedtime' to indicate the point in time when one goes to sleep.",
    "Prepositions of Time"
  ),
  createQuestion(
    "Mozart was already composing beautiful musical pieces _____ the age of five.",
    "at", ["in", "on", "by"],
    "Use 'at' to refer to a specific age: 'at the age of...', 'at 18', 'at 65'.",
    "Prepositions of Time"
  ),

  // --- PREPOSITIONS OF TIME: ON ---
  createQuestion(
    "Our team always holds its weekly software design review _____ Monday.",
    "on", ["in", "at", "by"],
    "Use 'on' for specific days of the week (e.g., on Monday, on Wednesdays, on Friday).",
    "Prepositions of Time"
  ),
  createQuestion(
    "In the United States, Independence Day is celebrated annually _____ July 4th.",
    "on", ["in", "at", "for"],
    "Use 'on' for calendar dates that specify a day (e.g., on July 4th, on October 25).",
    "Prepositions of Time"
  ),
  createQuestion(
    "Children wake up early and eagerly unwrap their colorful gifts _____ Christmas Day.",
    "on", ["at", "in", "by"],
    "When a holiday includes the word 'Day' (Christmas Day, New Year's Day), use 'on'.",
    "Prepositions of Time"
  ),
  createQuestion(
    "She received dozens of heartwarming congratulatory messages _____ her eighteenth birthday.",
    "on", ["at", "in", "to"],
    "Use 'on' for specific celebratory days like 'on my birthday' or 'on our anniversary'.",
    "Prepositions of Time"
  ),
  createQuestion(
    "Let's get together for a relaxing pancakes and coffee brunch _____ Sunday morning.",
    "on", ["in", "at", "with"],
    "When a day of the week is combined with a part of the day (Sunday morning, Friday evening), use 'on'.",
    "Prepositions of Time"
  ),
  createQuestion(
    "Most corporate offices remain closed and employees rest _____ weekends in the United States.",
    "on", ["at", "in", "by"],
    "'On weekends' is the standard American English preposition for Saturday and Sunday.",
    "Prepositions of Time"
  ),
  createQuestion(
    "The championship football final will take place _____ a chilly autumn Saturday.",
    "on", ["in", "at", "for"],
    "Use 'on' for any modified or specific calendar day (e.g., on a cold Saturday).",
    "Prepositions of Time"
  ),
  createQuestion(
    "The retail store announced massive promotional discounts _____ Black Friday.",
    "on", ["in", "at", "with"],
    "Use 'on' with named calendar days and shopping holidays like 'on Black Friday'.",
    "Prepositions of Time"
  ),

  // --- PREPOSITIONS OF TIME: IN ---
  createQuestion(
    "The leaves turn vibrant shades of red and gold across North America _____ October.",
    "in", ["on", "at", "by"],
    "Use 'in' for months of the year (e.g., in January, in October, in June).",
    "Prepositions of Time"
  ),
  createQuestion(
    "The first historic manned moon landing took place _____ 1969.",
    "in", ["on", "at", "for"],
    "Use 'in' for calendar years (e.g., in 1969, in 2024, in 1776).",
    "Prepositions of Time"
  ),
  createQuestion(
    "Many families travel north to enjoy skiing and snowboarding _____ winter.",
    "in", ["on", "at", "for"],
    "Use 'in' for seasons of the year (in winter, in summer, in spring, in autumn/fall).",
    "Prepositions of Time"
  ),
  createQuestion(
    "Remarkable advancements in computer technology occurred throughout _____ the 20th century.",
    "in", ["on", "at", "to"],
    "Use 'in' for historical centuries and prolonged eras (in the 20th century, in the Middle Ages).",
    "Prepositions of Time"
  ),
  createQuestion(
    "He usually goes for a brisk three-mile jog around the lake _____ the morning.",
    "in", ["on", "at", "during"],
    "Use 'in' with general parts of the day: 'in the morning', 'in the afternoon', 'in the evening'.",
    "Prepositions of Time"
  ),
  createQuestion(
    "Our family enjoys relaxing on the patio and watching the sunset _____ the evening.",
    "in", ["on", "at", "with"],
    "We say 'in the evening' for the general period after sunset before bedtime.",
    "Prepositions of Time"
  ),
  createQuestion(
    "The departing express train to Chicago will leave the station _____ ten minutes.",
    "in", ["at", "on", "by"],
    "Use 'in' to indicate the amount of time before something happens in the future ('in ten minutes').",
    "Prepositions of Time"
  ),
  createQuestion(
    "The construction crew promised that the new suspension bridge will be finished _____ two years.",
    "in", ["at", "on", "by"],
    "Use 'in' to denote a time span needed to complete an endeavor ('in two years').",
    "Prepositions of Time"
  ),

  // --- PREPOSITIONS OF TIME: FOR vs SINCE ---
  createQuestion(
    "She has been practicing the violin diligently _____ three hours without taking a rest.",
    "for", ["since", "in", "during"],
    "Use 'for' to measure a period of duration (e.g., for three hours, for two days, for five years).",
    "Prepositions of Time"
  ),
  createQuestion(
    "Our family has lived happily in this quiet suburban neighborhood _____ 2015.",
    "since", ["for", "in", "from"],
    "Use 'since' with a specific starting point in time (e.g., since 2015, since Monday, since 8 AM).",
    "Prepositions of Time"
  ),
  createQuestion(
    "Mr. Harrison has worked as an elementary school teacher _____ over twenty-five years.",
    "for", ["since", "in", "during"],
    "'For' is followed by a period or span of time ('for twenty-five years').",
    "Prepositions of Time"
  ),
  createQuestion(
    "I have not heard any updates from my cousin _____ last Wednesday.",
    "since", ["for", "in", "from"],
    "'Since' points back to the starting moment of an action that continues to the present.",
    "Prepositions of Time"
  ),
  createQuestion(
    "The heavy tropical rainstorm continued to pour steadily _____ four consecutive days.",
    "for", ["since", "during", "in"],
    "Use 'for' when expressing the length of time an event or process endures.",
    "Prepositions of Time"
  ),
  createQuestion(
    "She has known her closest childhood best friend _____ primary school.",
    "since", ["for", "from", "in"],
    "Use 'since' with an event or life stage that marks the beginning of an ongoing state.",
    "Prepositions of Time"
  ),

  // --- PREPOSITIONS OF TIME: DURING, BEFORE, AFTER, UNTIL, BY ---
  createQuestion(
    "Audience members are kindly requested to turn off their cellular phones _____ the performance.",
    "during", ["for", "in", "while"],
    "Use 'during' + noun to indicate that something happens within the time span of an event.",
    "Prepositions of Time"
  ),
  createQuestion(
    "Always remember to wash your hands thoroughly with soap and warm water _____ eating your meals.",
    "before", ["after", "during", "since"],
    "'Before' means earlier than or prior to a specific event or action.",
    "Prepositions of Time"
  ),
  createQuestion(
    "The students were so exhausted that they fell asleep immediately _____ the four-hour exam.",
    "after", ["before", "until", "by"],
    "'After' means subsequent to or following the completion of an event.",
    "Prepositions of Time"
  ),
  createQuestion(
    "The local public library will remain open to students and visitors _____ 9:00 PM tonight.",
    "until", ["by", "at", "since"],
    "Use 'until' (or 'till') to show that an action or state continues up to a specified time point.",
    "Prepositions of Time"
  ),
  createQuestion(
    "All research papers and project files must be submitted to the instructor _____ 5:00 PM on Friday.",
    "by", ["until", "for", "in"],
    "Use 'by' to express a deadline, meaning no later than a specific time.",
    "Prepositions of Time"
  ),
  createQuestion(
    "He stayed awake reading his favorite adventure novel _____ 2:00 in the morning.",
    "until", ["by", "since", "during"],
    "'Until' indicates an ongoing activity that terminates at a stated time.",
    "Prepositions of Time"
  ),
  createQuestion(
    "Please make sure you return the rented library books _____ the end of this month.",
    "by", ["until", "for", "to"],
    "'By the end of...' sets a strict deadline before or at which the task must be completed.",
    "Prepositions of Time"
  ),
  createQuestion(
    "Several lightning strikes knocked out power to the city grid _____ the severe midnight thunderstorm.",
    "during", ["for", "while", "since"],
    "Use 'during' before a noun representing a natural event or occurrence ('during the thunderstorm').",
    "Prepositions of Time"
  ),

  // --- PREPOSITIONS OF PLACE: IN ---
  createQuestion(
    "The young children are sitting quietly and coloring drawings _____ the living room.",
    "in", ["on", "at", "to"],
    "Use 'in' for rooms and three-dimensional enclosed spaces (in the living room, in the kitchen).",
    "Prepositions of Place & Location"
  ),
  createQuestion(
    "Please store all these sensitive legal contracts and birth certificates _____ the top drawer.",
    "in", ["on", "at", "to"],
    "Use 'in' for containers, boxes, compartments, and drawers (in the box, in the drawer).",
    "Prepositions of Place & Location"
  ),
  createQuestion(
    "The famous historical landmark Big Ben is situated _____ London, England.",
    "in", ["at", "on", "to"],
    "Use 'in' for cities, towns, regions, and countries (in London, in France, in Tokyo).",
    "Prepositions of Place & Location"
  ),
  createQuestion(
    "Because the subway was closed, we hopped _____ the back of a yellow taxi.",
    "in", ["on", "at", "to"],
    "We say 'in a car' and 'in a taxi' for private personal enclosed vehicles.",
    "Prepositions of Place & Location"
  ),
  createQuestion(
    "The colorful goldfish were swimming peacefully _____ the glass aquarium tank.",
    "in", ["on", "at", "with"],
    "Use 'in' when an object or creature is immersed inside liquid or an enclosed container.",
    "Prepositions of Place & Location"
  ),
  createQuestion(
    "After suffering from a mild concussion, the patient was told to stay _____ bed for two full days.",
    "in", ["on", "at", "to"],
    "We say 'in bed' when lying down under the covers to sleep or recover.",
    "Prepositions of Place & Location"
  ),
  createQuestion(
    "Bright fluffy white clouds were drifting across the sun _____ the clear blue sky.",
    "in", ["on", "at", "over"],
    "The standard idiomatic expression is 'in the sky'.",
    "Prepositions of Place & Location"
  ),
  createQuestion(
    "I saw an inspiring article about renewable solar energy _____ today's morning newspaper.",
    "in", ["on", "at", "with"],
    "We read information 'in the newspaper' or 'in a magazine' (printed pages).",
    "Prepositions of Place & Location"
  ),
  createQuestion(
    "She gazed thoughtfully at her reflection _____ the bathroom mirror.",
    "in", ["on", "at", "to"],
    "One looks at one's reflection 'in the mirror'.",
    "Prepositions of Place & Location"
  ),
  createQuestion(
    "The fresh vegetables and sweet strawberries were harvested directly _____ the garden.",
    "in", ["on", "at", "with"],
    "We say 'in the garden' or 'in the park' for enclosed outdoor plots.",
    "Prepositions of Place & Location"
  ),

  // --- PREPOSITIONS OF PLACE: ON ---
  createQuestion(
    "Please place the hot steaming cup of tea carefully _____ the wooden dining table.",
    "on", ["in", "at", "to"],
    "Use 'on' for objects positioned upon a flat horizontal surface (on the table, on the floor).",
    "Prepositions of Place & Location"
  ),
  createQuestion(
    "The proud parents hung their daughter's framed college diploma _____ the living room wall.",
    "on", ["in", "at", "by"],
    "Use 'on' for objects attached to vertical surfaces (on the wall, on the door).",
    "Prepositions of Place & Location"
  ),
  createQuestion(
    "Our corporate software headquarters is located _____ the seventh floor of the glass tower.",
    "on", ["in", "at", "with"],
    "Use 'on' to designate levels or floors of a multistory building (on the 7th floor, on the ground floor).",
    "Prepositions of Place & Location"
  ),
  createQuestion(
    "Dozens of morning commuters were standing shoulder to shoulder _____ the city transit bus.",
    "on", ["in", "at", "to"],
    "We say 'on the bus', 'on the train', 'on the plane', and 'on a ship' for public transit.",
    "Prepositions of Place & Location"
  ),
  createQuestion(
    "The shipwrecked sailors built a small wooden shelter _____ a deserted tropical island.",
    "on", ["in", "at", "by"],
    "Use 'on' for geographic islands (on an island, on Hawaii, on Manhattan).",
    "Prepositions of Place & Location"
  ),
  createQuestion(
    "When you enter the main lobby, the security registration desk will be _____ your left.",
    "on", ["in", "at", "by"],
    "Use 'on' to specify lateral directions: 'on the left', 'on the right'.",
    "Prepositions of Place & Location"
  ),
  createQuestion(
    "I was delighted to find my favorite homemade pasta dish listed _____ the restaurant's menu.",
    "on", ["in", "at", "with"],
    "Items are listed 'on the menu' or 'on a list'.",
    "Prepositions of Place & Location"
  ),
  createQuestion(
    "The breaking news bulletin was broadcast live _____ national television across the country.",
    "on", ["in", "at", "by"],
    "We say 'on TV', 'on the radio', 'on the phone', and 'on the internet'.",
    "Prepositions of Place & Location"
  ),
  createQuestion(
    "A fine layer of gray dust had settled _____ the glass computer monitor over the weekend.",
    "on", ["in", "at", "to"],
    "Dust or items rest 'on the monitor' or 'on the screen'.",
    "Prepositions of Place & Location"
  ),
  createQuestion(
    "The lazy golden retriever was sleeping soundly _____ the living room rug.",
    "on", ["in", "at", "with"],
    "Use 'on' for items resting on rugs, mats, or carpets.",
    "Prepositions of Place & Location"
  ),

  // --- PREPOSITIONS OF PLACE: AT ---
  createQuestion(
    "The package courier will deliver your signed parcel directly _____ 742 Evergreen Terrace.",
    "at", ["in", "on", "to"],
    "Use 'at' for specific street addresses with building numbers (at 742 Evergreen Terrace).",
    "Prepositions of Place & Location"
  ),
  createQuestion(
    "A nervous commuter was standing alone in the rain _____ the corner bus stop.",
    "at", ["in", "on", "by"],
    "Use 'at' for specific designated points and stops along a route (at the bus stop, at the station).",
    "Prepositions of Place & Location"
  ),
  createQuestion(
    "Someone is knocking loudly _____ the front door; could you please see who it is?",
    "at", ["on", "in", "to"],
    "We say 'at the door' or 'at the gate' to specify the exact focal point.",
    "Prepositions of Place & Location"
  ),
  createQuestion(
    "During severe blizzards, it is safest for families to remain safely _____ home.",
    "at", ["in", "on", "to"],
    "The standard idiomatic expression for one's residence is 'at home'.",
    "Prepositions of Place & Location"
  ),
  createQuestion(
    "Mr. Davies cannot answer your phone call right now because he is busy _____ work.",
    "at", ["in", "on", "by"],
    "Use 'at work' to indicate a person is at their place of employment.",
    "Prepositions of Place & Location"
  ),
  createQuestion(
    "My teenage brother and sister are currently attending their morning classes _____ school.",
    "at", ["in", "on", "to"],
    "Use 'at school' or 'at university' to denote institutional attendance as a student.",
    "Prepositions of Place & Location"
  ),
  createQuestion(
    "Our incoming international flight landed smoothly _____ London Heathrow Airport.",
    "at", ["in", "on", "to"],
    "Use 'at' for transport hubs, airports, stations, and ports (at the airport, at Grand Central).",
    "Prepositions of Place & Location"
  ),
  createQuestion(
    "We had a wonderful time celebrating and catching up with friends _____ the wedding reception.",
    "at", ["in", "on", "with"],
    "Use 'at' for social events and gatherings (at a party, at a concert, at a wedding).",
    "Prepositions of Place & Location"
  ),
  createQuestion(
    "Students should write their full legal name clearly _____ the top of each answer sheet.",
    "at", ["in", "on", "to"],
    "We say 'at the top of the page' and 'at the bottom of the page'.",
    "Prepositions of Place & Location"
  ),
  createQuestion(
    "The vehicle came to a sudden halt _____ the red traffic light at the intersection.",
    "at", ["in", "on", "by"],
    "Use 'at' for traffic markers: 'at the traffic light', 'at the crossroad'.",
    "Prepositions of Place & Location"
  ),

  // --- PREPOSITIONS OF PLACE: UNDER, OVER, ABOVE, BELOW, BEHIND, IN FRONT OF, NEXT TO, BETWEEN, OPPOSITE, NEAR ---
  createQuestion(
    "The terrified kitten scrambled quickly and hid _____ the bed when the vacuum turned on.",
    "under", ["over", "above", "through"],
    "Use 'under' when something is directly beneath or covered by something else.",
    "Prepositions of Place & Location"
  ),
  createQuestion(
    "The athletic show jumper and his black stallion leapt effortlessly _____ the wooden hurdle.",
    "over", ["under", "between", "through"],
    "Use 'over' when moving across and above an obstacle from one side to the other.",
    "Prepositions of Place & Location"
  ),
  createQuestion(
    "A stunning hand-painted oil portrait hangs proudly _____ the brick fireplace mantle.",
    "above", ["under", "through", "across"],
    "Use 'above' when an object is at a higher position than another without touching it.",
    "Prepositions of Place & Location"
  ),
  createQuestion(
    "In the Arctic Circle during midwinter, temperatures routinely drop far _____ zero degrees Celsius.",
    "below", ["under", "behind", "after"],
    "Use 'below' for levels, temperature, and measurements (e.g., below zero, below sea level).",
    "Prepositions of Place & Location"
  ),
  createQuestion(
    "The delivery driver parked his large commercial van safely _____ the warehouse building.",
    "behind", ["between", "above", "under"],
    "'Behind' denotes at the back of or rear side of a person, vehicle, or structure.",
    "Prepositions of Place & Location"
  ),
  createQuestion(
    "The guest lecturer stood confidently _____ the large auditorium audience before speaking.",
    "in front of", ["behind", "between", "next to"],
    "'In front of' means positioned directly ahead of or before someone or something.",
    "Prepositions of Place & Location"
  ),
  createQuestion(
    "She pulled up a wooden chair and sat down directly _____ her best friend in the cafeteria.",
    "beside", ["between", "behind", "under"],
    "'Beside' (synonymous with 'next to') means right by the side of someone or something.",
    "Prepositions of Place & Location"
  ),
  createQuestion(
    "The quiet boutique bookstore is nestled snugly _____ the bakery and the flower shop.",
    "between", ["among", "beside", "behind"],
    "Use 'between' when referring to the space separating two distinct entities.",
    "Prepositions of Place & Location"
  ),
  createQuestion(
    "The central post office is located directly _____ the city hall on the other side of the street.",
    "opposite", ["between", "behind", "under"],
    "'Opposite' means directly facing someone or something across a street, room, or table.",
    "Prepositions of Place & Location"
  ),
  createQuestion(
    "They decided to rent an affordable furnished apartment located _____ the subway station.",
    "near", ["between", "opposite", "above"],
    "'Near' means close to or a short distance away from a place.",
    "Prepositions of Place & Location"
  ),

  // --- PREPOSITIONS OF MOVEMENT & DIRECTION: TO, INTO, ONTO, OUT OF, OFF, THROUGH, ACROSS, ALONG, TOWARDS, PAST, AROUND ---
  createQuestion(
    "Every weekday morning at 7:30 AM, Liam walks briskly _____ school with his backpack.",
    "to", ["in", "at", "into"],
    "Use 'to' to indicate the destination or direction of motion (e.g., go to school, travel to Japan).",
    "Prepositions of Movement & Direction"
  ),
  createQuestion(
    "On a scorching July afternoon, the excited children jumped straight _____ the cool swimming pool.",
    "into", ["onto", "to", "at"],
    "Use 'into' for movement that enters an enclosed three-dimensional volume or liquid.",
    "Prepositions of Movement & Direction"
  ),
  createQuestion(
    "The agile tabby cat leapt gracefully _____ the top of the kitchen refrigerator.",
    "onto", ["into", "to", "in"],
    "Use 'onto' for movement that ends upon a flat surface or upper plane.",
    "Prepositions of Movement & Direction"
  ),
  createQuestion(
    "He pulled his leather wallet and car keys _____ his jacket pocket to pay for lunch.",
    "out of", ["off", "into", "onto"],
    "Use 'out of' to show movement from the interior of something to the outside.",
    "Prepositions of Movement & Direction"
  ),
  createQuestion(
    "Be careful when descending the wooden steps so you do not trip and fall _____ the ladder.",
    "off", ["out of", "under", "into"],
    "Use 'off' when leaving or falling away from a surface, ladder, bicycle, or transit vehicle.",
    "Prepositions of Movement & Direction"
  ),
  createQuestion(
    "The high-speed bullet train traveled smoothly _____ the dark mountain tunnel.",
    "through", ["across", "along", "over"],
    "Use 'through' when moving in a three-dimensional enclosed space from one side/end to the other.",
    "Prepositions of Movement & Direction"
  ),
  createQuestion(
    "The pedestrians looked both ways carefully before walking _____ the busy downtown street.",
    "across", ["through", "along", "into"],
    "Use 'across' for movement from one side of a surface, road, or body of water to the opposite side.",
    "Prepositions of Movement & Direction"
  ),
  createQuestion(
    "Tourists enjoyed taking a peaceful romantic stroll _____ the scenic sandy beach at sunset.",
    "along", ["across", "through", "into"],
    "Use 'along' to describe movement following a linear path (e.g., along the beach, along the river).",
    "Prepositions of Movement & Direction"
  ),
  createQuestion(
    "The frightened toddler spotted her mother across the playground and ran quickly _____ her.",
    "towards", ["into", "onto", "past"],
    "Use 'towards' (or 'toward') to indicate motion in the direction of a person or goal.",
    "Prepositions of Movement & Direction"
  ),
  createQuestion(
    "The commuter express bus drove straight _____ the old town hall without making a scheduled stop.",
    "past", ["through", "across", "along"],
    "Use 'past' when movement goes beyond or passes by a fixed location.",
    "Prepositions of Movement & Direction"
  ),
  createQuestion(
    "The marathon runners completed four full laps _____ the university athletic running track.",
    "around", ["across", "through", "into"],
    "Use 'around' for circular motion or movement encircling a perimeter.",
    "Prepositions of Movement & Direction"
  ),
  createQuestion(
    "The nonstop transatlantic flight travels directly _____ New York to London Heathrow.",
    "from", ["out of", "off", "by"],
    "Use 'from' to designate the starting point or origin of travel (from... to...).",
    "Prepositions of Movement & Direction"
  ),

  // --- PREPOSITIONS OF MANNER, AGENT & INSTRUMENT: BY, WITH, WITHOUT, ON FOOT ---
  createQuestion(
    "My father commutes to his corporate downtown office every morning _____ commuter train.",
    "by", ["with", "in", "on"],
    "Use 'by' followed directly by a noun for modes of transportation (by train, by car, by bus, by plane).",
    "Prepositions of Manner & Instrument"
  ),
  createQuestion(
    "Because the weather was so sunny and mild, she decided to walk to the grocery store _____ foot.",
    "on", ["by", "with", "in"],
    "The fixed idiom for walking is 'on foot', not 'by foot'.",
    "Prepositions of Manner & Instrument"
  ),
  createQuestion(
    "The world-famous masterpiece portrait 'Mona Lisa' was painted _____ Leonardo da Vinci.",
    "by", ["with", "from", "of"],
    "Use 'by' to introduce the agent/creator in a passive voice sentence ('painted by Leonardo da Vinci').",
    "Prepositions of Manner & Instrument"
  ),
  createQuestion(
    "The chef carefully sliced the crusty sourdough bread loaf _____ a sharp serrated knife.",
    "with", ["by", "of", "from"],
    "Use 'with' to indicate the instrument, tool, or utensil used to perform an action.",
    "Prepositions of Manner & Instrument"
  ),
  createQuestion(
    "Please fill out this official government passport renewal form _____ a black or blue ballpoint pen.",
    "with", ["by", "in", "of"],
    "Use 'with' followed by an instrument or tool ('with a pen', 'with a pencil').",
    "Prepositions of Manner & Instrument"
  ),
  createQuestion(
    "You cannot board an international overseas flight _____ a valid passport and boarding pass.",
    "without", ["with", "by", "for"],
    "Use 'without' to express the absence, lack, or exclusion of an essential item.",
    "Prepositions of Manner & Instrument"
  ),
  createQuestion(
    "She prefers to drink her morning black coffee _____ any milk or added refined sugar.",
    "without", ["with", "by", "for"],
    "'Without' indicates omission or absence of ingredients (e.g., coffee without sugar).",
    "Prepositions of Manner & Instrument"
  ),
  createQuestion(
    "The little boy successfully opened the locked treasure chest _____ an antique brass key.",
    "with", ["by", "in", "from"],
    "Use 'with' when referring to an instrument or physical object used to achieve a result.",
    "Prepositions of Manner & Instrument"
  ),

  // --- BASIC DEPENDENT PREPOSITIONS: ADJECTIVES ---
  createQuestion(
    "My older sister has always been exceptionally good _____ solving complex mathematical equations.",
    "at", ["in", "with", "for"],
    "We say someone is 'good at' or 'bad at' a subject, activity, or skill.",
    "Basic Dependent Prepositions"
  ),
  createQuestion(
    "I have always been notoriously bad _____ remembering the names of people I just met.",
    "at", ["with", "in", "for"],
    "'Bad at' is the standard collocation describing poor proficiency in a skill or subject.",
    "Basic Dependent Prepositions"
  ),
  createQuestion(
    "Are you genuinely interested _____ joining our school's competitive debate and mock trial team?",
    "in", ["on", "with", "about"],
    "The adjective 'interested' is always paired with the preposition 'in' ('interested in').",
    "Basic Dependent Prepositions"
  ),
  createQuestion(
    "Many young children are naturally afraid _____ the dark and strange nighttime noises.",
    "of", ["from", "with", "at"],
    "'Afraid of' (along with 'scared of' and 'terrified of') takes the preposition 'of'.",
    "Basic Dependent Prepositions"
  ),
  createQuestion(
    "Her parents were beaming with pride and were extraordinarily proud _____ her university graduation.",
    "of", ["for", "with", "in"],
    "'Proud of' is the standard prepositional collocation expressing satisfaction in an achievement.",
    "Basic Dependent Prepositions"
  ),
  createQuestion(
    "My grandmother is remarkably fond _____ baking homemade cinnamon rolls for the holidays.",
    "of", ["with", "to", "for"],
    "'Fond of' is a common collocation meaning having an affection or liking for something.",
    "Basic Dependent Prepositions"
  ),
  createQuestion(
    "The refrigerator was completely full _____ fresh fruits, green vegetables, and cold beverages.",
    "of", ["with", "in", "by"],
    "The adjective 'full' takes the preposition 'of' ('full of'), whereas 'filled' takes 'with'.",
    "Basic Dependent Prepositions"
  ),
  createQuestion(
    "The Mediterranean country of Italy is internationally famous _____ its delicious cuisine and art.",
    "for", ["of", "with", "to"],
    "'Famous for' is the standard dependent preposition designating what a place or person is celebrated for.",
    "Basic Dependent Prepositions"
  ),
  createQuestion(
    "David has been happily married _____ his high school sweetheart for over twenty years.",
    "to", ["with", "by", "for"],
    "In standard English, one is 'married to' someone, never 'married with'.",
    "Basic Dependent Prepositions"
  ),
  createQuestion(
    "Always remember to be courteous, respectful, and kind _____ elderly citizens and animals.",
    "to", ["with", "for", "at"],
    "Adjectives of behavior toward others ('kind to', 'polite to', 'rude to') take 'to'.",
    "Basic Dependent Prepositions"
  ),
  createQuestion(
    "The elementary students were extremely excited _____ their upcoming field trip to the science museum.",
    "about", ["for", "with", "in"],
    "'Excited about' is the standard dependent adjective phrase for anticipating an event.",
    "Basic Dependent Prepositions"
  ),
  createQuestion(
    "Parents often feel worried _____ their children when they begin driving a car on their own.",
    "about", ["for", "with", "of"],
    "The adjective 'worried' is paired with 'about' ('worried about someone or something').",
    "Basic Dependent Prepositions"
  ),
  createQuestion(
    "British English spelling is noticeably different _____ American English spelling in many words.",
    "from", ["to", "than", "with"],
    "'Different from' is the standard and widely preferred grammatical collocation.",
    "Basic Dependent Prepositions"
  ),
  createQuestion(
    "After working ten consecutive overtime hours, the nurse was thoroughly tired _____ standing on her feet.",
    "of", ["from", "with", "in"],
    "'Tired of' means weary or fed up with a condition or activity.",
    "Basic Dependent Prepositions"
  ),
  createQuestion(
    "The teacher was noticeably angry _____ the noisy students for disrupting the quiet study hall.",
    "with", ["at", "for", "about"],
    "We say 'angry with' (or 'angry at') a person when expressing displeasure.",
    "Basic Dependent Prepositions"
  ),
  createQuestion(
    "The hiring committee was very pleased _____ the candidate's impressive communication skills.",
    "with", ["at", "of", "about"],
    "'Pleased with' means feeling happy or satisfied with a result, person, or performance.",
    "Basic Dependent Prepositions"
  ),
  createQuestion(
    "Please make sure your bags are packed and you are completely ready _____ tomorrow's early flight.",
    "for", ["to", "with", "in"],
    "'Ready for' is the standard collocation meaning prepared for an event or departure.",
    "Basic Dependent Prepositions"
  ),

  // --- BASIC DEPENDENT PREPOSITIONS: VERBS ---
  createQuestion(
    "Please listen carefully _____ the flight attendant as she demonstrates the safety emergency exits.",
    "to", ["at", "with", "for"],
    "The verb 'listen' is always followed by 'to' when specifying what or whom is being heard.",
    "Basic Dependent Prepositions"
  ),
  createQuestion(
    "Turn around and look _____ that spectacular double rainbow stretching across the mountain valley!",
    "at", ["to", "on", "in"],
    "The verb 'look' takes the preposition 'at' when directing sight toward a specific object.",
    "Basic Dependent Prepositions"
  ),
  createQuestion(
    "We had to stand and wait _____ the delayed commuter train in the freezing snowstorm.",
    "for", ["to", "on", "with"],
    "The verb 'wait' takes 'for' when waiting for a person, vehicle, or event ('wait for').",
    "Basic Dependent Prepositions"
  ),
  createQuestion(
    "If you do not comprehend the instructions, please do not hesitate to ask the teacher _____ help.",
    "for", ["to", "about", "with"],
    "Use 'ask for' when requesting an object, assistance, or permission ('ask for help').",
    "Basic Dependent Prepositions"
  ),
  createQuestion(
    "Did you remember to pay _____ the parking ticket before exiting the underground garage?",
    "for", ["to", "with", "in"],
    "The verb 'pay' takes 'for' when specifying the item or service being purchased ('pay for').",
    "Basic Dependent Prepositions"
  ),
  createQuestion(
    "I have spent the past thirty minutes looking _____ my lost house keys everywhere.",
    "for", ["at", "after", "into"],
    "'Look for' is a common phrasal collocation meaning to search for a missing item.",
    "Basic Dependent Prepositions"
  ),
  createQuestion(
    "Does this black leather umbrella belong _____ you, or did someone leave it behind on the bench?",
    "to", ["with", "for", "in"],
    "'Belong to' is the fixed verb phrase meaning to be the property or possession of someone.",
    "Basic Dependent Prepositions"
  ),
  createQuestion(
    "Our international flight is scheduled to arrive _____ London early tomorrow morning.",
    "in", ["at", "to", "on"],
    "We say 'arrive in' for large cities, countries, or regions (e.g., arrive in London, arrive in Japan).",
    "Basic Dependent Prepositions"
  ),
  createQuestion(
    "What exact time does your train arrive _____ the central railway station downtown?",
    "at", ["in", "to", "on"],
    "We say 'arrive at' for specific points, buildings, stations, or airports (arrive at the station).",
    "Basic Dependent Prepositions"
  ),
  createQuestion(
    "What do you honestly think _____ our company's new logo and website design?",
    "of", ["at", "on", "to"],
    "'Think of' (or 'think about') is used when asking for someone's opinion on a topic.",
    "Basic Dependent Prepositions"
  ),
  createQuestion(
    "I need to schedule a private meeting to talk _____ my manager regarding my career advancement.",
    "to", ["with", "at", "for"],
    "We say 'talk to' (or 'talk with') someone when conversing with them.",
    "Basic Dependent Prepositions"
  ),
  createQuestion(
    "Don't forget to write a thank-you letter _____ your grandparents for their birthday gift.",
    "to", ["for", "at", "with"],
    "Use 'write to' someone when sending a letter, email, or message to a recipient.",
    "Basic Dependent Prepositions"
  ),
  createQuestion(
    "Whether we can go on our planned weekend camping hike will depend entirely _____ the weather.",
    "on", ["in", "at", "with"],
    "'Depend on' (or 'depend upon') is a standard collocation; it never takes 'in' or 'at'.",
    "Basic Dependent Prepositions"
  ),
  createQuestion(
    "I completely agree _____ your insightful perspective regarding how to solve this puzzle.",
    "with", ["to", "on", "at"],
    "We say 'agree with' a person when sharing their viewpoint or opinion.",
    "Basic Dependent Prepositions"
  ),
  createQuestion(
    "The friendly store clerk gave a warm smile _____ every customer who walked through the door.",
    "at", ["to", "with", "on"],
    "The verb 'smile' collocate with 'at' ('smile at someone') or 'to' someone.",
    "Basic Dependent Prepositions"
  ),
  createQuestion(
    "It is impolite and hurtful to laugh _____ someone who makes an honest mistake in public.",
    "at", ["to", "with", "on"],
    "'Laugh at' means to mock or find humor in someone's misfortune or blunder.",
    "Basic Dependent Prepositions"
  ),
  createQuestion(
    "Last night, I had an extraordinary dream _____ flying through space among the glowing stars.",
    "about", ["of", "with", "in"],
    "'Dream about' (or 'dream of') is used when describing dreams during sleep or aspirations.",
    "Basic Dependent Prepositions"
  ),
  createQuestion(
    "You should definitely apologize _____ your little brother for accidentally breaking his toy.",
    "to", ["for", "at", "with"],
    "One 'apologizes to' a person, while one 'apologizes for' a mistake or offense.",
    "Basic Dependent Prepositions"
  )
];

console.log(`Generated ${basicQuestionsData.length} core basic questions.`);
module.exports = basicQuestionsData;
