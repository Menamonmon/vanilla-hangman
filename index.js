(() => {
  function selectWord(words, diff = 1) {
    if (diff > 3 || diff < 1) {
      throw new Error("Invalid Difficulty Value");
    }
    let diffList = words[diff - 1];
    let randIndex = Math.floor(Math.random() * diffList.length);
    console.log(randIndex);
    let chosenWord = diffList[randIndex];
    diffList.splice(randIndex, 1);
    return chosenWord;
  }

  function clearChildren(element) {
    element.childNodes.forEach((d) => {
      element.removeChild(d);
    });
  }

  function makeCharEl(char, hidden = false) {
    if (char.length > 1) {
      throw new Error("Invalid Char length");
    }
    let element = document.createElement("div")
    element.className = "char";
    let subDiv = document.createElement("div");
    subDiv.textContent = char;
    element.appendChild(subDiv);
    if (hidden) {
      element.className += " char-hidden";
    }
    element.unhide = () => {
      element.className = "char";
    };
    return element;
  }

  function loadWord(wordList, diff, wordDiv) {
    clearChildren(wordDiv);
    let cword = selectWord(wordList, diff);
    console.log(cword);
    for (let i in cword) {
      wordDiv.appendChild(makeCharEl(cword.charAt(i), true));
    }
    return cword;
  }

  function updateDiff(clickedBtn, diffBtns) {
    diffBtns.forEach((button) => {
      button.className = "diff-btn";
    });
    clickedBtn.className += " current-diff";
    if (currentDiff == parseInt(clickedBtn.textContent)) {
      return false;
    }
    else {
      currentDiff = parseInt(clickedBtn.textContent);
      return true;
    }
  }

  function checkLetter(letterDiv, chosenWord, checkedLetters, imgElement) {
    if (gameOver) return;
    let char = letterDiv.textContent.trim().toLowerCase();
    if (checkedLetters.includes(char)) return;
    letterDiv.className += " used-letter";
    if (!chosenWord.includes(char)) {
      if (falseGuesses == 5) {
        gameOver = true;
        showLoss();
      }
      imgElement.src = `img/${++falseGuesses}.png`;
      return;
    }
    let charDivs = document.querySelectorAll('.word-container > .char');
    for (let charDiv of charDivs) {
      if (charDiv.textContent == char) {
        console.log(`char ${char} should be unhidden for the word`);
        charDiv.unhide();
      }
    }
    checkedLetters.push(char);
  }

  function showLoss() {
    console.log("You Lost");
  }

  function showWinning() {
    console.log("You Won");
  }

  let words = `about, above, abuse, accept, accident, accuse, across, activist, actor, administration, admit, adult, advertise, advise, affect, afraid, after, again, against, agency, aggression, agree, agriculture, force, airplane, airport, album, alcohol, alive, almost, alone, along, already, although, always, ambassador, amend, ammunition, among, amount, anarchy, ancestor, ancient, anger, animal, anniversary, announce, another, answer, apologize, appeal, appear, appoint, approve, archeology, argue, around, arrest, arrive, artillery, assist, astronaut, astronomy, asylum, atmosphere, attach, attack, attempt, attend, attention, automobile, autumn, available, average, avoid, awake, award, balance, balloon, ballot, barrier, battle, beauty, because, become, before, begin, behavior, behind, believe, belong, below, betray, better, between, biology, black, blame, bleed, blind, block, blood, border, borrow, bottle, bottom, boycott, brain, brave, bread, break, breathe, bridge, brief, bright, bring, broadcast, brother, brown, budget, build, building, bullet, burst, business, cabinet, camera, campaign, cancel, cancer, candidate, capital, capture, career, careful, carry, catch, cause, ceasefire, celebrate, center, century, ceremony, chairman, champion, chance, change, charge, chase, cheat, cheer, chemicals, chemistry, chief, child, children, choose, circle, citizen, civilian, civil, rights, claim, clash, class, clean, clear, clergy, climate, climb, clock, close, cloth, clothes, cloud, coalition, coast, coffee, collapse, collect, college, colony, color, combine, command, comment, committee, common, communicate, community, company, compare, compete, complete, complex, compromise, computer, concern, condemn, condition, conference, confirm, conflict, congratulate, Congress, connect, conservative, consider, constitution, contact, contain, container, continent, continue, control, convention, cooperate, correct, corruption, cotton, count, country, court, cover, crash, create, creature, credit, crime, criminal, crisis, criticize, crops, cross, crowd, crush, culture, curfew, current, custom, customs, damage, dance, danger, daughter, debate, decide, declare, decrease, defeat, defend, deficit, define, degree, delay, delegate, demand, democracy, demonstrate, denounce, depend, deplore, deploy, depression, describe, desert, design, desire, destroy, detail, detain, develop, device, dictator, different, difficult, dinner, diplomat, direct, direction, disappear, disarm, disaster, discover, discrimination, discuss, disease, dismiss, dispute, dissident, distance, divide, doctor, document, dollar, donate, double, dream, drink, drive, drown, during, early, earth, earthquake, ecology, economy, education, effect, effort, either, elect, electricity, embassy, embryo, emergency, emotion, employ, empty, enemy, energy, enforce, engine, engineer, enjoy, enough, enter, environment, equal, equipment, escape, especially, establish, estimate, ethnic, evaporate, event, every, evidence, exact, examine, example, excellent, except, exchange, excuse, execute, exercise, exile, exist, expand, expect, expel, experience, experiment, expert, explain, explode, explore, export, express, extend, extra, extraordinary, extreme, extremist, factory, false, family, famous, father, favorite, federal, female, fence, fertile, field, fierce, fight, final, financial, finish, fireworks, first, float, flood, floor, flower, fluid, follow, force, foreign, forest, forget, forgive, former, forward, freedom, freeze, fresh, friend, frighten, front, fruit, funeral, future, gather, general, generation, genocide, gentle, glass, goods, govern, government, grain, grass, great, green, grind, ground, group, guarantee, guard, guerrilla, guide, guilty, happen, happy, harvest, headquarters, health, heavy, helicopter, hijack, history, holiday, honest, honor, horrible, horse, hospital, hostage, hostile, hotel, house, however, human, humor, hunger, hurry, husband, identify, ignore, illegal, imagine, immediate, immigrant, import, important, improve, incident, incite, include, increase, independent, individual, industry, infect, inflation, influence, inform, information, inject, injure, innocent, insane, insect, inspect, instead, instrument, insult, intelligence, intelligent, intense, interest, interfere, international, Internet, intervene, invade, invent, invest, investigate, invite, involve, island, issue, jewel, joint, judge, justice, kidnap, knife, knowledge, labor, laboratory, language, large, laugh, launch, learn, leave, legal, legislature, letter, level, liberal, light, lightning, limit, liquid, listen, literature, little, local, lonely, loyal, machine, magazine, major, majority, manufacture, march, market, marry, material, mathematics, matter, mayor, measure, media, medicine, member, memorial, memory, mental, message, metal, method, microscope, middle, militant, military, militia, mineral, minister, minor, minority, minute, missile, missing, mistake, model, moderate, modern, money, month, moral, morning, mother, motion, mountain, mourn, movement, movie, murder, music, mystery, narrow, nation, native, natural, nature, necessary, negotiate, neighbor, neither, neutral, never, night, noise, nominate, normal, north, nothing, nowhere, nuclear, number, object, observe, occupy, ocean, offensive, offer, office, officer, official, often, operate, opinion, oppose, opposite, oppress, orbit, order, organize, other, overthrow, paint, paper, parachute, parade, pardon, parent, parliament, partner, party, passenger, passport, patient, peace, people, percent, perfect, perform, period, permanent, permit, person, persuade, physical, physics, picture, piece, pilot, place, planet, plant, plastic, please, plenty, point, poison, police, policy, politics, pollute, popular, population, position, possess, possible, postpone, poverty, power, praise, predict, pregnant, present, president, press, pressure, prevent, price, prison, private, prize, probably, problem, process, produce, profession, professor, profit, program, progress, project, promise, propaganda, property, propose, protect, protest, prove, provide, public, publication, publish, punish, purchase, purpose, quality, question, quick, quiet, radar, radiation, radio, railroad, raise, reach, react, ready, realistic, reason, reasonable, rebel, receive, recent, recession, recognize, record, recover, reduce, reform, refugee, refuse, register, regret, reject, relations, release, religion, remain, remains, remember, remove, repair, repeat, report, represent, repress, request, require, rescue, research, resign, resist, resolution, resource, respect, responsible, restaurant, restrain, restrict, result, retire, return, revolt, right, river, rocket, rough, round, rubber, rural, sabotage, sacrifice, sailor, satellite, satisfy, school, science, search, season, second, secret, security, seeking, seize, Senate, sense, sentence, separate, series, serious, serve, service, settle, several, severe, shake, shape, share, sharp, sheep, shell, shelter, shine, shock, shoot, short, should, shout, shrink, sickness, signal, silence, silver, similar, simple, since, single, sister, situation, skeleton, skill, slave, sleep, slide, small, smash, smell, smoke, smooth, social, soldier, solid, solve, sound, south, space, speak, special, speech, speed, spend, spill, spirit, split, sport, spread, spring, square, stand, start, starve, state, station, statue, steal, steam, steel, stick, still, stone, store, storm, story, stove, straight, strange, street, stretch, strike, strong, structure, struggle, study, stupid, subject, submarine, substance, substitute, subversion, succeed, sudden, suffer, sugar, suggest, suicide, summer, supervise, supply, support, suppose, suppress, surface, surplus, surprise, surrender, surround, survive, suspect, suspend, swallow, swear, sweet, sympathy, system, target, taste, teach, technical, technology, telephone, telescope, television, temperature, temporary, tense, terrible, territory, terror, terrorist, thank, theater, theory, there, these, thick, thing, think, third, threaten, through, throw, tired, today, together, tomorrow, tonight, torture, total, touch, toward, trade, tradition, traffic, tragic, train, transport, transportation, travel, treason, treasure, treat, treatment, treaty, trial, tribe, trick, troops, trouble, truce, truck, trust, under, understand, unite, universe, university, unless, until, urgent, usual, vacation, vaccine, valley, value, vegetable, vehicle, version, victim, victory, video, village, violate, violence, visit, voice, volcano, volunteer, wages, waste, watch, water, wealth, weapon, weather, weigh, welcome, wheat, wheel, where, whether, which, while, white, whole, willing, window, winter, withdraw, without, witness, woman, wonder, wonderful, world, worry, worse, worth, wound, wreck, wreckage, write, wrong, yellow, yesterday, young`;

  words = words.split(", ").sort((a, b) => {
    if (a.length > b.length) return 1;
    else if (b.length > a.length) return -1;
    else return 0;
  });
  let newWords = [];
  let max = 0;
  let currentWord = "";
  for (let i in words) {
    currentWord = words[i];
    if (currentWord.length > max) {
      max = currentWord.length;
      newWords.push([words[i]]);
    } else {
      newWords[newWords.length - 1].push(currentWord);
    }
  }
  words = [
    newWords[0].concat(newWords[1]).concat(newWords[2]),
    newWords[3].concat(newWords[4]).concat(newWords[5]),
    newWords[6].concat(newWords[7]).concat(newWords[8]).concat(newWords[9]),
  ]

  let currentDiff = 1;
  let diffBtns = document.querySelectorAll(".diff-btn");
  let letterBtns = document.querySelectorAll(".letter");
  let wordDiv = document.querySelector('.word-container');
  let hangmanImg = document.querySelector('#hang-pic');
  let cWord = loadWord(words, currentDiff, wordDiv);
  let checkedLetters = [];
  let wordSolved = false;
  let falseGuesses = 0;
  let gameOver = false;

  diffBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (updateDiff(btn, diffBtns)) {
        cWord = loadWord(words, currentDiff, wordDiv);
      }
    });
  });

  letterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      checkLetter(btn, cWord, checkedLetters, hangmanImg);
    })
  });


  diffBtns[0].className += " current-diff";

})();
