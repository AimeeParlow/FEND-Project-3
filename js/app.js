/*
 * Create a list that holds all of your cards
 */
const myDeck = document.querySelector(".deck");
let myCards = myDeck.querySelectorAll(".card");
let cardList = [...myCards];
const timeArea = document.getElementsByTagName('time')[0];


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
 
function newCards() {
	
	//to set new position for cards and to clear classes as default
	cardList = shuffle(cardList);
	let shuffledCards = [];
	for (let i=0; i<cardList.length; i++) {
		myDeck.innerHTML='';
		shuffledCards.forEach.call(cardList, function(addNewCard){
			myDeck.appendChild(addNewCard);
	});
	
	cardList[i].classList.remove('match', 'open', 'show');

	//to turn a card by clicking on the card
	function turnCard(){
		let openedCard =[];	
		cardList[i].classList.add('open','show');
	}
		cardList[i].addEventListener("click",turnCard);
	}
	
	//

}

/*
 * action
 */

$(document).ready(function() {
newCards();

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
