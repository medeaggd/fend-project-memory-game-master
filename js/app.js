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
const stars = document.querySelectorAll('.stars li'); // Targets the list of stars
const moves = document.querySelector('.moves'); // Targets the moves counter
const restart = document.getElementById('restart'); // Targets the reset button
const modalBG = document.querySelector('.modal_background'); // Targets the end-of-game modal background
const modal = document.querySelector('.modal_body'); // Targets the end-of-game modal content box
const close = document.querySelector('.close'); // Targets the modal box's exit button (x)
const statClock = document.querySelector('.stat_clock');
const statMoves = document.querySelector('.stat_moves');
const statStars = document.querySelector('.stat_stars');
let openedCards = []; // Creates an open array for cards to be placed to compare matches
let moveCount = 0; // Creates a running counter for moves made in the game
let matchCount = 0; // Creates a running counter for matches made in the game
let trueCardArr = []; // Creates array to hold generated html text
const clock = document.querySelector('.clock'); // Targets the clock element
let clockTick; // Targets the Interval function ("ticking" of the clock)
let clockOff = true; // Boolean to check if clock is ticking or not
let restartConfirm = false; // Boolean to check if okay to restart game
let minutes = 0, seconds = 0; // Placeholders for time counters

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
     modalBG.style.display = 'none';
     modal.style.display = 'none';
     cardList.forEach(function(card) {
          trueCardArr.push(createCardList(card));
     });
     shuffle(trueCardArr);
	createGameBoard();
     setTimeout(function() {
          checkStart();
     }, 500);
};

// Keeping the clock off until confirmation of game beginning
function checkStart() {
     if (window.confirm(`Are you ready to begin the game?`)) {
          clockOff = false;
          startClock();
     } else {
          alert(`You must start the clock to begin the game!`);
          checkStart();
     };
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

 // Base listener function on deck to flip cards and check matches
 deck.addEventListener('click', function(evt) {
       if (isCardClickable(evt.target) == true) {
           let clickedCard = evt.target;
           toggleCardDisplay(clickedCard);
           openedCards.push(clickedCard);
                 if (openedCards.length === 2) {
                      checkMatch();
                      addMove();
                      checkMoves();
                 };
                 if (matchCount === 8) {
                      clockOff = true;
                      clearInterval(clockTick);
                      setTimeout (function () {
                           modalBG.style.display = 'block';
                           modal.style.display = 'block';
                           endStars();
                           statMoves.innerHTML = moves.innerHTML;
                           statClock.innerHTML = clock.innerHTML;
                     }, 250);
                 };
      };
 });

function toggleCardDisplay(trgt) {
     trgt.classList.toggle('open');
     trgt.classList.toggle('show');
};


// For non-matches, clears classes from opened cards and resets the array
function clearOpened() {
     for (let open of openedCards) {
		open.classList.toggle('open');
          open.classList.toggle('show');
          openedCards = [];
	}
};

// Check for match by comparing the class list of the 2 active cards
function checkMatch() {
     if (openedCards[0].firstElementChild.className === openedCards[1].firstElementChild.className) {
          makeMatch();
          toggledCards = [];
          clearOpened();
	} else {
          setTimeout (function () {
			clearOpened();
		}, 750);
     };
};

// Moved criteria for clicked card into separate function, as the list was getting long.
function isCardClickable(clickedCard) {
	return (
		clickedCard.classList.contains('card') &&
		!clickedCard.classList.contains('match') &&
		!clickedCard.classList.contains('open') &&
		openedCards.length < 2
	);
};

// Adds the match class to 2 cards if they have matched, checks for all cards matched
function makeMatch() {
	openedCards[1].classList.add('match');
	openedCards[0].classList.add('match');
     matchCount++;
};

// Adds 1 to the move counter each time a pair of cards are clicked
function addMove() {
     moveCount++;
     moves.innerHTML = moveCount;
};

function checkMoves() {
     if (moveCount === 16 || moveCount === 24 || moveCount === 30) {
          hideStar();
     };
};

// Hides 1 star at a time
function hideStar() {
     for (star of stars) {
          if (star.style.display !== 'none') {
               star.style.display = 'none';
               break;
          };
     };
};

// Displays all the stars when the game resets
function resetStars() {
     for (star of stars) {
          star.style.display = 'inline';
     };
};

// If statements to determine stars at the end of the game in the modal
function endStars() {
     if (moveCount >= 30) {
          statStars.innerHTML = '0';
     } else if (moveCount >= 24 && moveCount <= 29) {
          statStars.innerHTML = '<li><i class="fa fa-star"></i></li>';
     } else if (moveCount >= 16 && moveCount <= 23) {
          statStars.innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
     } else if (moveCount <= 15) {
          statStars.innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
     };
};

// Function for starting the clock, making time increase by 1s intervals
function startClock() {
     clockTick = setInterval(function() {
          seconds++;
          displayTime();
     }, 1000);
};

// Function to calculate minutes from seconds and display the time counter inside the clock span tag
function displayTime() {
     if (seconds > 59) {
          minutes++;
          seconds = 0;
     };
     if (seconds < 10) {
          clock.innerHTML = `${minutes}:0${seconds}`;
          statClock.innerHTML = `${minutes}:0${seconds}`;
     } else {
          clock.innerHTML = `${minutes}:${seconds}`;
          statClock.innerHTML = `${minutes}:${seconds}`;
     };
};

// 2 Functions to close the end-of-game modal box
close.addEventListener('click', function() {
     modalBG.style.display = 'none';
     modal.style.display = 'none';
});

window.addEventListener('click', function() {
     modalBG.style.display = 'none';
     modal.style.display = 'none';
});

// Resets the board when the Restart arrow is clicked
restart.addEventListener('click', function() {
     clockOff = true;
     restartConfirm = window.confirm('Are you sure you want to restart the game?');
     reset();
});

function reset() {
     if (restartConfirm === true) {
          clearInterval(clockTick);
          resetStars();
          openedCards = [];
          toggledCards = [];
          trueCardArr = [];
          moveCount = 0;
          matchCount = 0;
          deck.innerHTML = '';
          moves.innerHTML = '0';
          seconds = 0;
          minutes = 0;
          startGame();
     } else {
          clockOff = false;
          return;
     };
};
