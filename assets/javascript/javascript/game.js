
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
    "petyr baelish"
  ],
  wins: 0,
  answerArray: [],
  comparisonArray: [],
  usedKeys: [],
  guesses: 10,
  keyUsed: false,
  letterInWord: false,
  userKey: "",
  word: "",
  startLogic: function() {
    this.word = this.words[Math.floor(Math.random() * this.words.length)];
    console.log(this.word);
    for (var i = 0; i < this.word.length; i++) {
      this.answerArray[i] = "_";
      this.comparisonArray.push(this.word[i]);
      document.getElementById("current-word").innerHTML = this.answerArray.join(
        " "
      );
    }
    keyReady();
  },
  gameReset: function() {
    this.guesses = 10;
    this.answerArray = [];
    this.usedKeys = [];
    this.comparisonArray = [];
    document.getElementById("current-word").innerHTML = this.word;
    document.getElementById("guesses-left").innerHTML = this.guesses;
    document.getElementById("chosen-already").innerHTML = " ";
    document.onkeypress = function() {
      document.getElementById("already-guessed").innerHTML = " ";
      hangman.startLogic();
    };
  },
  letterCheck: function() {
    for (let j = 0; j < this.word.length; j++) {
      if (this.word[j] === this.userKey) {
        this.letterInWord = true;
      }
    }
    this.usedKeyCheck();
  },
  usedKeyCheck: function() {
    for (let i = 0; i < hangman.usedKeys.length; i++) {
      if (hangman.usedKeys[i] === hangman.userKey) {
        hangman.keyUsed = true;
      }
    }
    this.mainLogic();
  },
  mainLogic: function() {
    if (hangman.letterInWord === true && hangman.keyUsed === false) {
      for (let j = 0; j < hangman.word.length; j++) {
        if (hangman.word[j] === hangman.userKey)
          // . . . at correct index
          hangman.answerArray[j] = hangman.userKey;
        document.getElementById(
          "current-word"
        ).innerHTML = hangman.answerArray.join(" ");
      }
      hangman.usedKeys.push(hangman.userKey);
    } else if (hangman.letterInWord === false && hangman.keyUsed === false) {
      document.getElementById(
        "already-guessed"
      ).innerHTML += `${hangman.userKey} `;
      hangman.guesses--;
      document.getElementById("guesses-left").innerHTML = hangman.guesses;
      hangman.usedKeys.push(hangman.userKey);
      document.getElementById("chosen-already").innerHTML =
        "Incorrect letters:";
    } else {
      document.getElementById(
        "chosen-already"
      ).innerHTML = `You've chosen ${hangman.userKey} already`;
    }
    this.winLoss();
  },
  winLoss: function() {
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
  }
};

const keyReady = () => {
  document.onkeypress = function(event) {
    hangman.userKey = event.key;
    hangman.letterInWord = false;
    hangman.keyUsed = false;
    hangman.letterCheck();
  };
};