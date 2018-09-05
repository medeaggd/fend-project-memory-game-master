# Memory Game of Games

## Table of Contents

* [Instructions](#instructions)
* [Machinations](#machinations)
* [Special](#special)
* [Contributing](#contributing)

## Instructions

A classic iteration of "Concentration" that asks you to match cards by flipping them over and remembering where they are on the board. The game is over once all cards are matched.

## Machinations

Once the page loads, an alert box will prompt the user if ready to begin the game. Accepting will start the timer, not accepting will let the user know they must begin the game to gain access to the page.

The user must click on pairs of cards, constituting one move, until all 8 pairs are matched. The timer keeps track of time spent on the game, while the moves are displayed as well. A star rating appears next to the counters, initially displaying 3 stars, but a star disappears at the 16, 24, and 30 marks (so that it is possible to achieve 0-3 stars).

Once all matches are made, a modal box appears, giving the time, moves, and star rating of the user's performance. The round arrow on the page allows the user to reset/restart the game, either before completion, or after closing the statistic box.

## Special

When I started this project, I tried changing the game drastically to use numbers in Japanese kanji, but after struggling with that version for a few weeks, I was convinced to start over and work through the logic first, adjust the display later. This is that final result, even though I did do some minor tweaking to the display.

This project uses [Font Awesome](https://fontawesome.com/?from=io) icons for symbols on the cards, and I especially selected ones I associate with games. Can you figure out the origins for all the icons?

## Contributing

This game is based off of a starter repository from Udacity's Front-End NanoDegree course. Attributions from outside services given as comments within the code. A big shout out to Matthew Cranford and his [Project Walk-through](https://matthewcranford.com/memory-game-walkthrough-part-1-setup/), as well as various students and mentors in the Grow With Google program for helping me solve some of my problems. Also a thank you to my husband who makes me talk him through the code and breaks down the logic in order to help me see what I might have missed.
