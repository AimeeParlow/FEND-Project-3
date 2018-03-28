/*
 * variables
 */

//variables for game base...
let myDeck = document.querySelector('.deck');
let myCards = myDeck.querySelectorAll('.card');
let cardList = [...myCards];
let moves = document.getElementById('moves');
const restartButton = document.getElementById('reset');
let openedCard = [];
let animationFinished = true;


//variables for counting number...
let matchedCount = 0;
let clickedCount = 0;
let failedCount = 0;

//variables for time count...
let timeArea = document.getElementsByTagName('time')[0];
let timer;
let time;
let count = 0;
let firstClick = false;

//variables for result area...
let resultArea = document.getElementById('result-area');
let resultContent = document.getElementById('result-content');
let resultCloseButton = document.getElementsByClassName('close')[0];
let resultText = document.getElementById('result-text');
let clickedScore = document.getElementById('clicked-score');
let timeScore = document.getElementById('time-score');
let starScore = document.getElementById('star-score');//new parent
let starArea = document.getElementById('star-rank');//old parent
let gameBoard = document.getElementById('game');
let playAgainButton = document.getElementById('play-again-button');

/*
 * functions
 */

//load the page and start the game...
$(document).ready(function() {
	setNewCards();
});

//reset button to reload the page...
restartButton.addEventListener('click', reset);

function reset() {
	location.reload();
}

//click a card and start counting time but it works only one time...
$(myCards).click(function() {
	if (firstClick == false) {
	timeCount();
	firstClick = true;
	}
});

//time count...
function timeCount() {
	count++;
	let sec = count;
	let min = 0;
	let hour = 0;

	if (sec > 60){ min++; };
	if (min > 60){ hour++; };
	if (sec < 10){ sec = '0' + sec };
	if (min < 10){ min = '0' + min };
	if (hour < 10){ hour = '0' + hour };
	
	time = hour + ":" + min + ":" + sec;
	
	timeArea.textContent = time;
	timer = setTimeout('timeCount()', 1000);
}

/*
 * main actions
 */

//card Shuffle (shuffle function from http://stackoverflow.com/a/2450976)
function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

//to set new cards as default...
function setNewCards() {
	cardList = shuffle(cardList);
	for (let i = 0; i < cardList.length; i++) {
		cardList[i].classList.remove('match', 'open', 'show');
		cardList[i].addEventListener('click', turnCard);
		myDeck.appendChild(cardList[i]);
	}
}

//card actions after clicking it...
function turnCard(){
	if (this.classList.contains('open')) { //to avoid double click on the opened card...
	
	} else {
		if (animationFinished == false) { //to avoid to click on the third card before finishing matchCheck...
		} else {
			this.classList.add('open', 'show');
			clickedCount ++;
			moves.textContent = clickedCount;
			openedCard.push(this);
			if (openedCard.length === 2) {
				animationFinished = false; 
				matchCheck();　
			} //once the second card was turned, call matchCheck...
		};
	};
}

//to check if two opened cards are matched...
function matchCheck() {
	if (openedCard[0].lastElementChild.classList.item(1) === openedCard[1].lastElementChild.classList.item(1)){
		openedCard[0].classList.add('match');
		openedCard[1].classList.add('match');
		matchedCount++;
		openedCard = []; //to clear the openedCard array...
		animationFinished = true;
		
		if (matchedCount == 8) {
		setTimeout(function(){gameWon()},400); //you won...
		}
	} else {
		failedCount ++;
		stars();
		setTimeout(function() {turnBack()},500); //to delay time to turn the card...
	}
}

//not-matched cards will be turned back to hide...
function turnBack() {
	openedCard[0].classList.remove('open', 'show');
	openedCard[1].classList.remove('open', 'show');
	openedCard = [];
	animationFinished = true;
}

//loosing stars...
function stars() {
	if(failedCount == 4){
	$('.star:last').remove();
	} else if(failedCount == 8){
	$('.star:last').remove();
	} else if(failedCount == 12){
	$('.star:last').remove();
	setTimeout(function(){gameFailed()},400);
	}
}

//once the player lost 3 stars, game is over and call failedResult... 
function gameFailed() {
	clearTimeout(timer);
	failedResult();
	resultArea.style.display = 'block';
}

//appear the modal window to show failed result...
function failedResult() {
	resultCloseButton.style.display = 'block';
	resultText.innerHTML = "<b>GAME OVER!</b>";
	clickedScore.textContent = clickedCount + " Moves";
	timeScore.textContent = "Time " + time;
}

//to close the modal window by clicking x button and reload...
resultCloseButton.onclick = function() {
	resultArea.style.display = 'none';
	reset();
}

//to close the modal window by clicking anywhere outside of the modal and reload...
window.onclick = function(event) {
	if (event.target == resultArea) {
		resultArea.style.display = 'none';
		reset();
	};
}

//to show winner's result...modal window reforming to as plain page...
function gameWon() {
	gameBoard.style.display = 'none';
	resultArea.style.display = 'block';
	playAgainButton.style.display = 'block';
	resultContent.style.backgroundColor = '#ffe6ff';
	resultArea.style.backgroundColor = 'rgba(0,0,0,0)';
	resultText.innerHTML = "<b>YOU WON!</b>";
	starScore.style.display = 'flex';
	clickedScore.textContent = clickedCount + " Moves";
	timeScore.textContent = "Time: " + time;
	playAgainButton.addEventListener('click', reset);
	starCount();
}

//to show each rest star...
function starCount() {
	while(starArea.childNodes.length > 0) {
		starScore.appendChild(starArea.childNodes[0]);
	}
}

//end of the code...