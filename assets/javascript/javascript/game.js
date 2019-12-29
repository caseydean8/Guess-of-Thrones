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
    document.getElementById("chosen-already").innerHTML = " ";
    document.getElementById("already-guessed").innerHTML = " ";
    document.onkeypress = function() {
      hangman.startLogic();
    };
  },
  letterCheck: function() {
    for (let j = 0; j < this.word.length; j++) {
      if (this.word[j] === this.userKey) {
        console.log(word[j]);
        this.letterInWord = true;
      }
    }
    console.log(`letter in word? : ${this.letterInWord}`);
  }
};

const keyReady = () => {
  document.onkeypress = function(event) {
    hangman.userKey = event.key;
    hangman.letterInWord = false;
    hangman.keyUsed = false;
    console.log(hangman.word);
    console.log(hangman.userKey);

    for (let i = 0; i < hangman.word.length; i++) {
      if (hangman.word[i] === hangman.userKey) {
        hangman.letterInWord = true;
        console.log(`letter in word? : ${hangman.letterInWord}`);
        console.log(hangman.word[i]);
      }
    }
    // };

    // function yourButt(){
    for (let i = 0; i < hangman.usedKeys.length; i++) {
      if (hangman.usedKeys[i] === hangman.userKey) {
        hangman.keyUsed = true;
        console.log(`key used?: ${hangman.keyUsed}`);
      }
    }

    // If letterInWord is true, create letter in current-word . . .
    if (hangman.letterInWord === true && hangman.keyUsed === false) {
      console.log(hangman.letterInword);
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
      console.log(hangman.guesses);
      document.getElementById("guesses-left").innerHTML = hangman.guesses;
      hangman.usedKeys.push(hangman.userKey);
      document.getElementById("chosen-already").innerHTML =
        "Incorrect letters:";
    } else {
      document.getElementById(
        "chosen-already"
      ).innerHTML = `You've chosen ${hangman.userKey} already`;
    }

    console.log(hangman.usedKeys);
    console.log(`letter ${hangman.userKey} in word? : ${hangman.letterInword}`);
    console.log(`key ${hangman.userKey} used?: ${hangman.keyUsed}`);

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
};
// Function calls
// hangman.startLogic();
