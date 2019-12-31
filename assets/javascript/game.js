document.onkeypress = function(event) {
  hangman.userKey = event.key;
  hangman.letterInWord = false;
  hangman.keyUsed = false;
  hangman.letterCheck();
};

var hangman = {
  words: [
    "Daenerys Targaryen",
    "Jon Snow",
    "Tyrion Lannister",
    "Bran Stark",
    "Sansa Stark",
    "Arya Stark",
    "Cersei Lannister",
    "Jaime Lannister",
    "Khal Drago",
    "Joffrey Baratheon",
    "Theon Greyjoy",
    "Samwell Tarly",
    "Brienne of Tarth",
    "Ramsay Bolton",
    "Podrick Payne",
    "Davos Seaworth",
    "Jorah Mormont",
    "Petyr Baelish"
  ],
  wins: 0,
  answerArray: [],
  comparisonArray: [],
  usedKeys: [],
  incorrect: [],
  guesses: 10,
  keyUsed: false,
  letterInWord: false,
  userKey: "",
  word: "",
  startLogic: function() {
    this.word = this.words[Math.floor(Math.random() * this.words.length)];
    for (var i = 0; i < this.word.length; i++) {
      this.answerArray[i] = "_";
      this.comparisonArray.push(this.word[i].toLowerCase());
      document.getElementById("current-word").innerHTML = this.answerArray.join(
        " "
      );
    }
  },

  letterCheck: function() {
    for (let j = 0; j < this.comparisonArray.length; j++) {
      if (this.comparisonArray[j] === this.userKey) {
        this.letterInWord = true;
      }
    }
    this.usedKeyCheck();
  },

  usedKeyCheck: function() {
    for (let i = 0; i < this.usedKeys.length; i++) {
      if (this.usedKeys[i] === this.userKey) {
        this.keyUsed = true;
      }
    }
    this.mainLogic();
  },

  mainLogic: function() {
    document.getElementById("start").innerHTML = "";
    document.getElementById(
      "guesses-left"
    ).innerHTML = `guesses left: ${this.guesses}`;
    if (this.letterInWord === true && this.keyUsed === false) {
      for (let j = 0; j < this.comparisonArray.length; j++) {
        if (this.comparisonArray[j] === this.userKey)
          this.answerArray[j] = this.userKey;
        document.getElementById(
          "current-word"
        ).innerHTML = this.answerArray.join(" ");
      }
      this.usedKeys.push(this.userKey);
    } else if (this.letterInWord === false && this.keyUsed === false) {
      this.incorrect.push(this.userKey);
      this.guesses--;
      this.usedKeys.push(this.userKey);
      document.getElementById(
        "chosen-already"
      ).innerHTML = `Incorrect letters: ${this.incorrect.join(" ")}`;
    } else {
      document.getElementById(
        "chosen-already"
      ).innerHTML = `You've chosen ${this.userKey} already`;
    }
    this.winLoss();
  },

  winLoss: function() {
    // Record win if player guesses correctly
    if (
      JSON.stringify(this.comparisonArray) === JSON.stringify(this.answerArray)
    ) {
      this.wins++;
      document.getElementById("wins").innerHTML = `Wins: ${this.wins}`;
      document.getElementById("win-reveal").innerHTML = this.word;
      document.getElementById("already-guessed").innerHTML =
        "Great Guess! Press any key to play again";
      this.gameReset();
    }
    // Reset game upon loss.
    else if (this.guesses === 0) {
      document.getElementById("already-guessed").innerHTML =
        "You Lost, press a key to play again";
      this.gameReset();
    }
  },

  gameReset: function() {
    this.guesses = 10;
    this.answerArray = [];
    this.usedKeys = [];
    this.comparisonArray = [];
    this.incorrect = [];
    document.getElementById("current-word").innerHTML = "";
    document.getElementById("guesses-left").innerHTML = "";
    document.getElementById("chosen-already").innerHTML = "";
    document.onkeypress = function() {
      document.getElementById("win-reveal").innerHTML = "";
      document.getElementById(
        "guesses-left"
      ).innerHTML = `guesses left: ${hangman.guesses}`;
      document.getElementById("already-guessed").innerHTML = "";
      hangman.startLogic();
    };
  }
};

hangman.startLogic();