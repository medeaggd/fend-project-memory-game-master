/*
 * Create a list that holds all of your cards
 */
const cardList = [
     "fa-bomb", "fa-flask", "fa-fort-awesome", "fa-gamepad",
     "fa-heart", "fa-rebel", "fa-rocket", "fa-star",
     "fa-bomb", "fa-flask", "fa-fort-awesome", "fa-gamepad",
     "fa-heart", "fa-rebel", "fa-rocket", "fa-star"
]; // Creates array with all of my cards (listed twice so that they have pairs)
const deck = document.getElementById('deck'); // Targets the ul list that will hold cards
const newBoard = document.getElementsByClass('restart').firstChild; // Targets the New Board/reset button
let openedCards = []; // Creates an open array for cards to be placed to compare matches
let moveCount = 0; // Creates a running counter for moves made in the game
let matchCount = 0; //Creates a running counter for matches made in the game
let trueCardArr = []; // Creates array to hold generated html text

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Readies the game to start when the page is loaded
window.onload = function() {
 	startGame();
};

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
};

// Create each card
function createCardList(card) {
     return `<li class="card"><i class="fa ${card}"></i></li>`;
};

// Put the shuffled, created cards onto the board
function createGameBoard() {
     // ForEach method called on trueCardArr adds each card into the deck, returning the entire deck at the end
	trueCardArr.forEach(function(card) {
          return deck.innerHTML += card;
     });
	return deck;
};

// Initial load of cards after page loads
function startGame() {
     cardList.forEach(function(card) {
          trueCardArr.push(createCardList(card));
     });
     shuffle(trueCardArr);
	createGameBoard();
	// Initialize clock
};

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

 // Base listener function on deck to flip cards and check matches
 deck.addEventListener('click', function(evt) {
      let clickedCard = evt.target;
      if (clickedCard.classList.contains('card') && !clickedCard.classList.contains('match') && openedCards.length < 2) {
           toggleCardDisplay(clickedCard);
           openedCards.push(clickedCard);
                if (openedCards.length === 2) {
                     checkMatch();
                }
           //Adds 1 to the move counter each time a card is clicked
 		moveCount += 1;
      }
 });

 // For non-matches, clears classes from opened cards and resets the array
function clearOpened(openedCards) {
     for (let open of openedCards) {
		open.classList.toggle('open');
		open.classList.toggle('show');
          openedCards = [];
	}
};

// Check for match by comparing the src attribute of the 2 active cards
function checkMatch(clickedCard) {
     if (openedCards[0].classList === openedCards[1].classList) {
          makeMatch(openedCards);
     } else {
          clearOpened(openedCards);
     };
};

// Adds the match class to 2 cards if they have matched, checks for all cards matched
function makeMatch(openedCards) {
	openedCards[1].classList.add('match');
	openedCards[0].classList.add('match');
     matchCount += 1;
	if (matchCount === 8) {
		//end game: stop timer, pop-up with stats
	};
};

// Resets the board when the "New Board" button is clicked
newBoard.addEventListener('click', function() {
    //TODO: Add an if statement with listeners to prompt user if they really want to restart game.
    openedCards = [];
    startGame();
});
