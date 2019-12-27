// Start with global variables
let guesses;

let correct;

const words = [
  "daenerys targaryen",
  ["jon snow"],
  ["tyrion lannister"],
  ["bran stark"],
  ["sansa stark"],
  ["arya stark"],
  ["cersei lannister"],
  ["jaime lannister"],
  ["khal drago"],
  ["joffrey baratheon"],
  ["theon grewordsyjoy"],
  ["samwell tarly"],
  ["brienne of tarth"],
  ["ramsay bolton"],
  ["podrick payne"],
  ["davos seaworth"],
  ["jorah mormont"],
  ["petyr Baelish"]
];

// Object

// The properties of a const variable can change. That’s because the entire object is not immutable. It just can’t be reassigned entirely.

const hangman = {
  // words: [
  //   "daenerys targaryen",
  //   ["jon snow"],
  //   ["tyrion lannister"],
  //   ["bran stark"],
  //   ["sansa stark"],
  //   ["arya stark"],
  //   ["cersei lannister"],
  //   ["jaime lannister"],
  //   ["khal drago"],
  //   ["joffrey baratheon"],
  //   ["theon grewordsyjoy"],
  //   ["samwell tarly"],
  //   ["brienne of tarth"],
  //   ["ramsay bolton"],
  //   ["podrick payne"],
  //   ["davos seaworth"],
  //   ["jorah mormont"],
  //   ["petyr Baelish"]
  // ],
  wins: 0,
  letterInWord: false,
  answerArray: [],
  startLogic: function() {
    word = words[Math.floor(Math.random() * words.length)];
    guesses = 10;
    correct = 0;
    // arr.forEach(callback(currentValue [, index [, array]])[, thisArg]);
    // vegetables.forEach(vegetable => console.log(`I love ${vegetable}`));
    // word.forEach(i => {
    //   hangman.answerArray[i] = "_";
    //   document.getElementById(
    //     "current-word"
    //   ).innerHTML = hangman.answerArray.join(" ");
    // });
    for (var i = 0; i < word.length; i++) {
      hangman.answerArray[i] = "_";
      document.getElementById("current-word").innerHTML = hangman.answerArray.join(" ");
    }
    console.log(hangman.answerArray);
  }
};

// Function calls
hangman.startLogic();
