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

let timer;
let time;
let count = 0;
let firstClick = false;

//function for the time count...
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
	this.classList.add('open', 'show');
	clickedCount ++;
	console.log("clickedCount " + clickedCount);//to check the count number...will be deleted before submission
	moves.textContent =clickedCount;
	openedCard.push(this);

//when two cards were turned, call function to check their matching...
	if (openedCard.length === 2) {
		matchCheck();　
	}
}	

//to check if two opened cards are matched...
function matchCheck(){
	if(openedCard[0].lastElementChild.classList.item(1) === openedCard[1].lastElementChild.classList.item(1)){
		openedCard[0].classList.add('match');
		openedCard[1].classList.add('match');
		matchedCount ++;
		console.log("yeah!!!!  " + "matchedCount " + matchedCount); //to check the count number...will be deleted before submission
		openedCard = [];
	}
	
	else {
		console.log("Not match...");
		failedCount ++;
		console.log("failedCount!!!!  " + failedCount); //to check the count number...will be deleted before submission
		stars();
		setTimeout(function(){turnBack()},500);
	}
}

//cards not matched and turn back to hide...
function turnBack(){ 
		openedCard[0].classList.remove('open', 'show');
		openedCard[1].classList.remove('open', 'show');
		openedCard = [];
}


//all cards are matched and go to the result page...
/*if (matchedCount = 8) {
	
}
*/

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

// Get the modal
var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var modalCloseButton = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
function gameFailed() {
	clearTimeout(timer);
	failedResult();
	modal.style.display = "block";
	
}

function failedResult(){
	document.getElementById('result-text').innerHTML = "<b>GAME OVER!!!</b>";
	document.getElementById('click-result').textContent = clickedCount + " Moves";
	document.getElementById('time-result').textContent = "Time " + time;
	
}


// When the user clicks on <span> (x), close the modal
modalCloseButton.onclick = function() {
    modal.style.display = "none";
	reset();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
		modal.style.display = "none";
		reset();
    }
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