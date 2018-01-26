//main game logic
// get a random word from the array
// Inform User game has begun
// Show the empty letters ( _ _ _ _ ) and guesses, etc.
// prompt for a letter
// If enough guesses left, then prompt for new letter
// Valid input
// Tell user they did not guess a letter
// Tell user they already guessed that letter
// Remove the entry from the list of possible inputs
// Check for the letter in the word
// If the letter is in the word, update the letter object
// Add to correct letters list
// Show the empty letters ( _ _ _ _ ) and guesses, etc.
 // Test if the user has won
 // Not a win yet, so ask for another input and decrement guesses
  // If not enough guesses left, then user losses
  // Create a new game object using the constructor and begin playing

var inquirer = require('inquirer');
var guessWordList = require('./Hangman.js');
var checkForLetter = require('./Word.js');
var lettersToDisplay = require('./Letter.js');

var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var lettersAlreadyGuessed = [];
var lettersCorrectlyGuessed = [];
var displayHangman;

var game = {
	wordBank : guessWordList,
	guessesRemaining : 10,
	currentWord : null,

	startGame : function(){
		this.guessesRemaining = 10;
		var j = Math.floor(Math.random() * this.wordBank.length);
		this.currentWord = this.wordBank[j];
		console.log("I'm thinking about a planet. Guess which one it is.")
		displayHangman = new lettersToDisplay(this.currentWord);
		displayHangman.parseDisplay();
		console.log('Guesses Left: ' + game.guessesRemaining);
		keepPromptingUser();		

	}

};

function keepPromptingUser(){
	console.log('');
	if(game.guessesRemaining > 0){
		inquirer.prompt([
		{
			type: "value",
			name: "letter",
			message: "Guess a letter: "
		}
	]).then(function(userInput){
		var inputLetter = userInput.letter.toLowerCase();
		if(alphabet.indexOf(inputLetter) == -1){
			console.log(inputLetter + " is not a letter.");
			console.log("Guesses Left: " + game.guessesRemaining);
			console.log("Letters already guessed: " + lettersCorrectlyGuessed)
			keepPromptingUser();			
		}
		else if(alphabet.indexOf(inputLetter) != -1 && lettersAlreadyGuessed.indexOf(inputLetter) != -1){

	
			console.log("You already guessed " + inputLetter);
			console.log("Guesses Left: " + game.guessesRemaining);
			console.log("Letters already guessed: " + lettersCorrectlyGuessed)
			keepPromptingUser();

		}
		else {
			lettersAlreadyGuessed.push(inputLetter);
			var letterInWord = checkForLetter(inputLetter, game.currentWord);
			if(letterInWord){
				lettersCorrectlyGuessed.push(inputLetter);
				displayHangman = new lettersToDisplay(game.currentWord, lettersCorrectlyGuessed);
				displayHangman.parseDisplay();
				if(displayHangman.winner){
					console.log("You Win!");
					return;
				}
				else{
					console.log("Guesses Left: " + game.guessesRemaining);
					console.log("Letters already guessed: " + lettersCorrectlyGuessed)
					keepPromptingUser();

				}
			}

				else{
					game.guessesRemaining--;
					displayHangman.parseDisplay()
					console.log('Guesses Left: ' + game.guessesRemaining);
          			console.log('Letters already guessed: ' + lettersAlreadyGuessed);
          			keepPromptingUser();
				}

		}
	});
	
}

else{
	console.log("You lost! The correct word was " + game.currentWord + ".");
}
}

game.startGame();