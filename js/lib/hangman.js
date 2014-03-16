var countRemain;
var guessRemain;
var guessed = new Array();

var HANG = {
	saveBlock: function(block) {
		localStorage.setItem("main_block", block);
		
		countRemain = this.getBlock().length;
		guessRemain = 10;
		
		var splitBlock = block.split('');
		
		for (x in splitBlock) {
			if (splitBlock[x] != ' ') {
				$("#words").append("<c class='word-letter'>" + splitBlock[x] + "</c>");
			} else {
				$("#words").append("&nbsp; &nbsp;");
			}
		}
	},
	
	getBlock: function() {
		return localStorage.getItem("main_block").split(' ').join('').toLowerCase().split('');
	},
	
	getWords: function() {
		return localStorage.getItem("main_block").split(' ');
	},
	
	getGuess: function() {
		var myGuess = prompt("What letter do you guess?").toLowerCase();
		
		var currentBlock = this.getBlock();
		
		//Loop through each letter and if there is a match change the color
		
		$.each($(".word-letter"), function() {
			if ($(this).html().toLowerCase() === myGuess) {
				$(this).addClass("word-active");
			}
		});
		
		if (currentBlock.indexOf(myGuess) >= 0) {
			guessed.push(myGuess);
			var numInstances = 0;
			for (var i = 0; i <= currentBlock.length; i++) {
				if (currentBlock[i] === myGuess) {
					numInstances++;
					countRemain--;
				}
			}
			
			alert("Great guess!");
			
			if (countRemain > 0 && guessRemain > 0) {
				var checkContinue = confirm("Do you want to guess again?");
				
				if (checkContinue) {
					HANG.getGuess();
				} else {
					return;
				}
			} else if (countRemain > 0 && guessRemain === 0) {
				alert("No more guesses! You lose! :(");
			} else if (countRemain === 0 && guessRemain > 0) {
				alert("You win! It was " + localStorage.getItem("main_block"));
			}
			
		} else {
			if (guessed.indexOf(myGuess) >= 0) {
				alert("You already guessed that letter...");
				this.getGuess();
			} else {
				guessed.push(myGuess);
				
				guessRemain--;
				
				$("#guess-count").html(guessRemain); //CHANGE THIS
				
				$("#guessed-words").append("<myletter>" + myGuess + "</myletter>");
				
				if (guessRemain === 0) {
					alert("No more guesses! You lose! :(");
				} else {
					alert("Sorry... You guessed wrong.");
					this.getGuess();
				}
			}			
		}
	}
};