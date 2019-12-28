// Start with global variables

const words = [
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
];

// let answerArray = [];

// Object

// The properties of a const variable can change. That’s because the entire object is not immutable. It just can’t be reassigned entirely.

var hangman = {
  wins: 0,
  answerArray: [],
  comparisonArray: [],
  usedKeys: [],
  guesses: 10,
  keyUsed: false,
  letterInword: false,
  startLogic: function() {
    word = words[Math.floor(Math.random() * words.length)];
    console.log(word);
    for (var i = 0; i < word.length; i++) {
      hangman.answerArray[i] = "_";
      hangman.comparisonArray.push(word[i]);
      document.getElementById(
        "current-word"
      ).innerHTML = hangman.answerArray.join(" ");
    }
    console.log(hangman.answerArray);
    console.log(hangman.comparisonArray);
  }
};

document.onkeypress = function(event) {
  const userKey = event.key;

  // keyUsed variable introduced to alert player if a key has been previously pressed
  // let keyUsed = false;

  // If the letter in the word generated is equal to the players keypress then set variable letterInWord to true.
  // let letterInWord = false;

  for (let j = 0; j < word.length; j++) {
    if (word[j] === userKey) {
      letterInWord = true;
    }
  }

  for (let i = 0; i < hangman.usedKeys.length; i++) {
    if (hangman.usedKeys[i] === userKey) {
      keyUsed = true;
    }
  }

  // If letterInWord is true, create letter in current-word . . .
  if (letterInWord && hangman.keyUsed === false) {
    for (let j = 0; j < word.length; j++) {
      if (word[j] === userKey)
        // . . . at correct index
        hangman.answerArray[j] = userKey;
      document.getElementById("current-word").innerHTML = hangman.answerArray.join(" ");
    }
    hangman.usedKeys.push(userKey);
  } else if (letterInWord === false && keyUsed === false) {
    document.getElementById("already-guessed").innerHTML += `${userKey} `;
    guesses--;
    document.getElementById("guesses-left").innerHTML = guesses;
    usedKeys.push(userKey);
    document.getElementById("chosen-already").innerHTML = "Incorrect letters:";
  } else {
    document.getElementById(
      "chosen-already"
    ).innerHTML = `You've chosen ${userKey} already`;
  }

  // Record win if player guesses correctly
  if (JSON.stringify(hangman.comparisonArray) === JSON.stringify(hangman.answerArray)) {
    wins++;
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("already-guessed").innerHTML =
      "Great Guess! Press any key to play again";
    gameReset();
  }

  // Reset game upon loss.
  else if (hangman.guesses === 0) {
    document.getElementById("already-guessed").innerHTML =
      "You Lost, press a key to play again";
    gameReset();
  }
};

// Function calls
hangman.startLogic();
