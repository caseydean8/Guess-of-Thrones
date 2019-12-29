// Start with global variables

// Object

// The properties of a const variable can change. That’s because the entire object is not immutable. It just can’t be reassigned entirely.

const hangman = {
  words: [
    "daenerys targaryen",
    "jon snow",
    "tyrion lannister",
    "bran stark",
    "sansa stark",
    "arya stark",
    "cersei lannister",
    "jaime lannister",
    "khal drago",
    "joffrey baratheon",
    "theon greyjoy",
    "samwell tarly",
    "brienne of tarth",
    "ramsay bolton",
    "podrick payne",
    "davos seaworth",
    "jorah mormont",
    "petyr Baelish"
  ],
  wins: 0,
  answerArray: [],
  comparisonArray: [],
  usedKeys: [],
  guesses: 10,
  keyUsed: false,
  letterInword: false,
  startLogic: function() {
    word = this.words[Math.floor(Math.random() * this.words.length)];
    console.log(word);
    for (var i = 0; i < word.length; i++) {
      this.answerArray[i] = "_";
      this.comparisonArray.push(word[i]);
      document.getElementById("current-word").innerHTML = this.answerArray.join(
        " "
      );
    }
    console.log(this.answerArray);
    console.log(this.comparisonArray);
  },
  gameReset: function() {
    document.getElementById("current-word").innerHTML = word;
    this.guesses = 10;
    document.getElementById("guesses-left").innerHTML = this.guesses;
    this.usedKeys = [];
    this.comparisonArray = [];
    document.getElementById("chosen-already").innerHTML = "";
    hangman.startLogic();
  }
};

document.onkeypress = function(event) {
  const userKey = event.key;
  console.log(hangman.usedKeys);
  // hangman.keyUsed = false;
  // hangman.letterInword = false;
  for (let j = 0; j < word.length; j++) {
    if (word[j] === userKey) {
      hangman.letterInWord = true;
      console.log(`letter in word? : ${hangman.letterInword}`);
    }
  }
  console.log(`letter in word? : ${hangman.letterInword}`);
  console.log(`key used before loop?: ${hangman.keyUsed}`);

  for (let i = 0; i < hangman.usedKeys.length; i++) {
    if (hangman.usedKeys[i] === userKey) {
      hangman.keyUsed = true;
      console.log(`key used?: ${hangman.keyUsed}`);
    }
  }

  // If letterInWord is true, create letter in current-word . . .
  if (hangman.letterInWord && hangman.keyUsed === false) {
    for (let j = 0; j < word.length; j++) {
      if (word[j] === userKey)
        // . . . at correct index
        hangman.answerArray[j] = userKey;
      document.getElementById(
        "current-word"
      ).innerHTML = hangman.answerArray.join(" ");
    }
    hangman.usedKeys.push(userKey);
    console.log(hangman.usedKeys);
  } else if (hangman.letterInWord === false && hangman.keyUsed === false) {
    document.getElementById("already-guessed").innerHTML += `${userKey} `;
    hangman.guesses--;
    console.log(hangman.guesses);
    document.getElementById("guesses-left").innerHTML = hangman.guesses;
    hangman.usedKeys.push(userKey);
    document.getElementById("chosen-already").innerHTML = "Incorrect letters:";
    console.log(hangman.usedKeys);
  } else {
    document.getElementById(
      "chosen-already"
    ).innerHTML = `You've chosen ${userKey} already`;
  }

  // Record win if player guesses correctly
  if (
    JSON.stringify(hangman.comparisonArray) ===
    JSON.stringify(hangman.answerArray)
  ) {
    hangman.wins++;
    document.getElementById("wins").innerHTML = hangman.wins;
    document.getElementById("already-guessed").innerHTML =
      "Great Guess! Press any key to play again";
    hangman.gameReset();
  }

  // Reset game upon loss.
  else if (hangman.guesses === 0) {
    document.getElementById("already-guessed").innerHTML =
      "You Lost, press a key to play again";
    hangman.gameReset();
  }
};

// Function calls
// hangman.startLogic();
