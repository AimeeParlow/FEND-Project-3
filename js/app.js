/*
 * Create a list that holds all of your cards
 */

const myDeck = document.querySelector(".deck");
let myCards = myDeck.querySelectorAll(".card");
let cardList = [...myCards];
const timeArea = document.getElementsByTagName('time')[0];
const moves = document.getElementsByClassName('moves');
let openedCard = [];
let clickCount = [];
/*
 * timer
 */

let start = new Date();

// clear to default
let hour = 0;
let min = 0;
let sec = 0;
let now = 0;
let countTime = 0;

function timeCount(){

 now = new Date();
 countTime = parseInt((now.getTime() - start.getTime()) / 1000);
 hour = parseInt(countTime / 3600);
 min = parseInt((countTime / 60) % 60);
 sec = countTime % 60;

 //add 0 to number less than 10
 if(hour < 10) { hour = "0" + hour; }
 if(min < 10) { min = "0" + min; }
 if(sec < 10) { sec = "0" + sec; }

 let time = hour + ':' + min + ':' + sec;

 //to the text field
 timeArea.textContent = time;

 setTimeout("timeCount()", 1000);

}
const restartButton = document.getElementById("reset");
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
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

//to set new position for cards and to clear classes as default

function setNewCards(){
	cardList = shuffle(cardList);
	for (let i = 0; i < cardList.length; i++) {
		cardList[i].classList.remove('match', 'open', 'show');
		cardList[i].addEventListener("click", turnCard);
		myDeck.appendChild(cardList[i]);
	}
}

 //to turn a card by clicking on the card
	function turnCard() {
this.classList.add('open', 'show');
openedCard.push(this);

	if (openedCard.length === 2) {

		matchCheck();　//2枚目を開いたら、マッチしているかチェックする。
		}

}	

//マッチしていたら、classを追加する。していなければ、裏返しにしてcardListを空にする。git git
function matchCheck(){

	console.log("matchCheck!");
	
	if(openedCard[0].lastElementChild.classList.item(1) === openedCard[1].lastElementChild.classList.item(1)){
		openedCard[0].classList.add('match');
		openedCard[1].classList.add('match');
		console.log("yeah!!!!");
	}
	else {
		console.log("Not match...");
	}

 }


/* 使えそうなもの

		openedCard[0].classList.remove('open', 'show');
		openedCard[1].classList.remove('open', 'show');
		
		
		
let openedCard = myDeck.querySelectorAll(".open");
let openedCardList = [...openedCard];
if (openedCardList === 2) {
	console.log ("ok!");
	}else {
		console.log ("ca marche!);
	}
	
	let result = array[2];
	result.add();
	
let openedCardArray[1] = myDeck.querySelectorAll(".open")[0];
let openedCardArray[2] = myDeck.querySelectorAll(".open")[0];
openedCardArray[1];

let openedCard = myDeck.querySelectorAll(".open");
let openedCardArray = [...openedCard];
*/



/*

for (let a = 0; a < ; a++){
let firstCard = openedCard[0];
let secondCard = openedCard[1];

if(firstCard.className === secondCard.className){
		console.log("yeah!!!!");
	}
	else {
		console.log("ok");
	}
	
	
let symbol = this.children;
console.log(symbol);

for (let a = 0; a > 2; a++){
	openedCard[a].classList.remove('open', 'show');

	let firstCard = openedCard[0];
	console.log("firstCard" + firstCard);
	let secondCard = openedCard[1];
	console.log("second" + secondCard);
}
	let openedCardLength = openedCard.length;
	let openedCardArray = openedCard[openedCardLength];
		for (const openedCard of openedCardArray){
	console.log(openedCard[0]);
	console.log(openedCard[1]);	

*/

/*
 * action
 */

$(document).ready(function() {
setNewCards();

});

$(myCards).click(function() {
timeCount();
});





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
