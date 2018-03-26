const myDeck = document.querySelector(".deck");
let myCards = myDeck.querySelectorAll(".card");
let cardList = [...myCards];
let timeArea = document.getElementsByTagName('time')[0];
let moves = document.getElementById('moves');
let openedCard = [];
let matchedCount = 0;
let clickedCount = 0;
let failedCount = 0;
const restartButton = document.getElementById("reset");


/*
 * action
 */

$(document).ready(function() {
	setNewCards();
});

$(myCards).click(function() {
	if (firstClick == false){
	timeCount();
	firstClick = true;
	}	
});

/*
 * timer
 */

 //variables for timer...
let timer;
let time;
let count = 0;
let firstClick = false;

//time count...
function timeCount(){
	count++;
	let sec = count;
	let min = 0;
	let hour = 0;

	if(sec > 60){
		min++;
	}
	if(min > 60){
		hour++;
	}
	
	if(sec < 10){ sec = "0" + sec };
	if(min < 10){ min = "0" + min };	
	if(hour < 10){ hour = "0" + hour };
	
	time = hour + ":" + min + ":" + sec;
	
	timeArea.textContent = time;
	timer = setTimeout("timeCount()", 1000);
}


/*
 * Restart button
 */

restartButton.addEventListener("click", reset);

function reset(){
	location.reload();
}



/*
 * shuffle
 */
 
// Shuffle function from http://stackoverflow.com/a/2450976
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

/*
 * to set new cards and to play game...
 */
 
//to set new cards as default...
function setNewCards(){
	cardList = shuffle(cardList);
	for (let i = 0; i < cardList.length; i++) {
		cardList[i].classList.remove('match', 'open', 'show');
		cardList[i].addEventListener("click", turnCard);
		myDeck.appendChild(cardList[i]);
	}
}

//card actions after clicking it...
function turnCard() {
	/*if (this.classList.contains('open')){}
	
	else {
		*/
		this.classList.add('open', 'show');
		clickedCount ++;
		console.log("clickedCount " + clickedCount);//to check the count number...will be deleted before submission
		moves.textContent = clickedCount;
		openedCard.push(this);


		if (openedCard.length === 2) {//once the second card was turned, call matchCheck...
			matchCheck();　
		}
	//}	
}

//to check if two opened cards are matched...
function matchCheck(){
	if(openedCard[0].lastElementChild.classList.item(1) === openedCard[1].lastElementChild.classList.item(1)){
		openedCard[0].classList.add('match');
		openedCard[1].classList.add('match');

		matchedCount++;
		console.log("yeah!!!!  " + "matchedCount " + matchedCount); //to check the count number...will be deleted before submission
		openedCard = [];
		
		if (matchedCount <8){
			console.log("matchedCount <8");
			}
		else{
			gameClear();
		}
		
	}
	
	else {
		console.log("Not match...");
		failedCount ++;
		console.log("failedCount!!!!  " + failedCount); //to check the count number...will be deleted before submission
		stars();
		setTimeout(function(){turnBack()},300);
	}
}

//cards not matched and turn back to hide...
function turnBack(){ 
		openedCard[0].classList.remove('open', 'show');
		openedCard[1].classList.remove('open', 'show');
		openedCard = [];
}


//loosing stars 
function stars(){
	if (failedCount == 1){
	$('.star:last').remove();
	}
	else if  (failedCount == 2){
	$('.star:last').remove();
	}
	else if  (failedCount == 3){
	gameFailed();
	}	
}

// variables for result area...
let resultArea = document.getElementById('result-area');
let resultContent = document.getElementById('result-content');
let resultCloseButton = document.getElementsByClassName('close')[0];
let resultText = document.getElementById('result-text');
let clickedScore = document.getElementById('clicked-score');
let timeScore = document.getElementById('time-score');
let starScore = document.getElementById('star-score');
let starArea = document.getElementById('star-rank');
let gameBoard = document.getElementById('game');
let playAgainButton = document.getElementById('play-again-button');


// When the player lost the 3 stars, game is over and call failedResult... 
function gameFailed() {
	clearTimeout(timer);
	failedResult();
	resultArea.style.display = "block";
}

//to show the failed scoreboard...
function failedResult(){
	resultCloseButton.style.display = "block";
	resultText.innerHTML = "<b>GAME OVER!!!</b>";
	clickedScore.textContent = clickedCount + " Moves";
	timeScore.textContent = "Time " + time;	
}

//to close the modal window by clicking x button...
resultCloseButton.onclick = function() {
    resultArea.style.display = "none";
	reset();
}

//to close the modal window by clicking anywhere outside of the modal...
window.onclick = function(event) {
    if (event.target == resultArea) {
		resultArea.style.display = "none";
		reset();
    }
}

//to show cleared score...
function gameClear(){
		gameBoard.style.display = "none";
		resultArea.style.display = "block";
		playAgainButton.style.display = "block";
		resultArea.style.padding = "250px";
		resultContent.style.height = "300px";
		resultContent.style.width = "400px";
		resultContent.style.padding = "80px 20px 0 20px";
		resultArea.style.backgroundColor = "rgba(0,0,0,0)";
		resultText.innerHTML = "<b>YOU WON!!!</b>";
		starScore.textContent = starArea;
		starScore.style.display = "block";
		clickedScore.textContent = clickedCount + " Moves";
		timeScore.textContent = "Time: " + time;
		playAgainButton.addEventListener("click", reset);
				
	}





/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */