(() => {
  function selectWord(words, diff = 1) {
    // this function selects a random word from the words array given a difficutly value between 1 - 3 
    if (diff > 3 || diff < 1) {
      throw new Error("Invalid Difficulty Value");
    }
    let diffList = words[diff - 1];
    let randIndex = Math.floor(Math.random() * diffList.length);
    let chosenWord = diffList[randIndex];
    return chosenWord;
  }

  function saveName(nameField, header, submitBtn) {
    // this function would be used by the name field in the header and the submit button for it

    // it captures the name, addes it to the header and then deletes the nameField and the submitBtn
    let name = nameField.value.trim();
    if (name == '') {
      return;
    }
    submitBtn.remove();
    nameField.remove();
    header.textContent += ` ${name}`;
  }

  function makeCharEl(char, hidden = false) {
    // this funtion constructs a char div that has the appropirate styling for a char element
    // it also gives the char and additional function unide which would show the char div by changing its class name
    // it accepts the argument hidden which determines whether the char div would be hidden be defualt
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
    // this function clears the div where the chars of the mystery word are located 
    // , selects a word and displays its chars in a hidden state 
    // and then it returns the selected word.
    wordDiv.innerHTML = '';
    let cword = selectWord(wordList, diff);
    console.log(cword);
    for (let i in cword) {
      wordDiv.appendChild(makeCharEl(cword.charAt(i), true));
    }
    return cword;
  }

  function updateDiff(clickedBtn, diffBtns) {
    // a function that updates the difficulty level in the sript and
    // highlights the chosen difficulty value
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

  function checkLetter(letterDiv, chosenWord, imgElement) {
    if (gameOver) return;
    if (letterDiv.className.includes("used-letter")) return;
    let char = letterDiv.textContent.trim().toLowerCase();
    // if (checkedLetters.includes(char)) return;
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
        charDiv.unhide();
      }
    }
    // checkedLetters.push(char);
    if (checkWord(charDivs, chosenWord, words)) showWinning();
  }

  function showLoss() {
    // a function that displays a message for the player that he had lost and
    // shows the restrart button for restarting the game

    let lossHeader = document.querySelector('.wl-header');
    let restartBtn = document.querySelector(".restart-btn");
    lossHeader.textContent = 'You lost. Press the button above to take another try for a different word.';
    lossHeader.className = "wl-header lose";
    revealWord(document.querySelectorAll(".char"));
    restartBtn.className = "restart-btn";
    restartBtn.textContent = "Restart";
    restartBtn.onclick = () => {
      location.reload();
      restartBtn.className += " restart-btn-hidden";
    };
  }

  function showWinning() {
    // this function displays the winning message for the player for guessing the word correctly 
    // and displays the next button that will change the cWord var to the next word.

    let winningHeader = document.querySelector('.wl-header');
    let restartBtn = document.querySelector(".restart-btn");
    winningHeader.textContent = 'You Won. Press the next button above for the next word.';
    winningHeader.className = "wl-header win";
    restartBtn.className = "restart-btn";
    restartBtn.textContent = "Next Word";
    restartBtn.onclick = () => {
      cWord = loadWord(words, currentDiff, wordDiv);
      resetLetters(letterBtns, hangmanImg, winningHeader);
      restartBtn.className += " restart-btn-hidden";
    };
  }

  function checkWord(divs, word, wordList) {
    // checks if any of the chars are still hidden (not solved by the player)

    for (let div of divs) {
      if (div.className.endsWith("hidden")) {
        return false;
      }
    }

    // and then deletes the word that has been solved from the list of words
    let index;
    for (let grp of wordList) {
      index = grp.indexOf(word);
      if (index >= 0) {
        grp.splice(index, 1);
        return true;
      }
    }
    return false;
  }

  function revealWord(charArr) {
    // reveals the chars of the word given the array of divs that have the chars
    for (let char of charArr) {
      char.className = 'char';
    }
  }

  function bindKeysToLetters(lettersArray, mImg) {
    // a function that adds events listeners for all of the characters keystrokes
    // so that they have the same effect as pressing the button for their corresponding letters on the screen
    let body = document.body;
    for (let i = 65; i < 91; i++) {
      body.addEventListener('keyup', (e) => {
        if (e.keyCode == i || e.keyCode == i + 32) {
          checkLetter(lettersArray[i - 65], cWord, mImg);
        }
      })
    }
  }

  // processing the words string 
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

  // important object pointers and state variables
  let currentDiff = 1;
  let diffBtns = document.querySelectorAll(".diff-btn");
  let letterBtns = document.querySelectorAll(".letter");
  let wordDiv = document.querySelector('.word-container');
  let hangmanImg = document.querySelector('#hang-pic');
  let nameField = document.querySelector("#name");
  let nameFieldBtn = document.querySelector("#name-btn")
  let nameHeader = document.querySelector(".header > h3");
  let cWord = loadWord(words, currentDiff, wordDiv);
  // let checkedLetters = [];
  let falseGuesses = 0;
  let gameOver = false;

  function resetLetters(btnsArray, mistakesImg, wlHeader) {
    // checkedLetters.splice(0, checkedLetters.length); // empties the array of the clicked button
    
    // updaing the class name for all the letters to its defualt (reactivating them)
    // and binging them to a function with the updated word cWord and the checkedLetters 
    btnsArray.forEach((btn) => {
      btn.className = 'letter';
      btn.onclick = () => {
        checkLetter(btn, cWord, hangmanImg);
      }
    });

    // reseting the image and the flase guesses counter
    mistakesImg.src = 'img/0.png';
    falseGuesses = 0;
    // resetting the binding fucntion for each of the keys
    bindKeysToLetters(btnsArray, mistakesImg);

    // if a winning / losing header is passed in then it would be hidden be restoring its defualt class wl-header
    if (wlHeader != undefined) {
      wlHeader.className = "wl-header"; 
    }
  }

  // initializiation

  // adding evnetlisteners for diffuclty buttons 
  diffBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (updateDiff(btn, diffBtns)) {
        // if the difficulty level changes change the current word based on difficulty
        cWord = loadWord(words, currentDiff, wordDiv);
        resetLetters(letterBtns, hangmanImg); // resets the buttons because the word is updated.
      }
    });
  });


  // initializing and adding eventlistenrs for the letter buttons
  resetLetters(letterBtns, hangmanImg);

  // setting the difficulty to its defualt value of 1
  diffBtns[0].className += " current-diff";

  // adding event listerners for the input field and the button for sumitting the name of the player
  nameField.addEventListener("keyup", (e) => {
    if (e.keyCode == 13) {
      saveName(nameField, nameHeader, nameFieldBtn);
    }
  });
  nameFieldBtn.addEventListener('click', () => saveName(nameField, nameHeader, nameFieldBtn));

})();
