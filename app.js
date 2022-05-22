/*-----------------------------------------------------------------------------*/
/*-------------------------------- Login Part ---------------------------------*/
/*-----------------------------------------------------------------------------*/
/** Constants & Variables */
//LATER: password has to have at least one number, one letter
let playerName, password, forgotPswd;
let gameMode = "easy";
let gameOn = false;
///LOGIN eventListener then
gameOn = true;

/*-----------------------------------------------------------------------------*/
/*-------------------------------- Game Part ----------------------------------*/
/*-----------------------------------------------------------------------------*/

/** Constants & Variables */
// 1.1) an array to represent all the cards
let arrCards = [];
// 1.2) an array to represent selected two cards
let selectedTwoCards = [];
// 1.2) an array to represent selected Correct two cards
let selectedAllCards = [];
// 2) score to represent current score
let score = 0;
// 3) 60 seconds timer
let timer = 60;
/** Event Listeners */
const gamePage = document.querySelector("#game-page");

/** add background image (later: randomlize it) */

/** Add cards and data class id into Grid */

/** Randomize Cards Pattern */
// arrCards.sort by Math.random * 12 +1

/** Show all the cards for 3s then flip to "cardCover"*/

/** Flip two cards */
//push the two cards into selectedTwoCards

/** Verify if two cards are same */
// check by their class names

/** if correct .. */
// push correct two cards into selectedAllCards
// score+1 otherwise score-1

/** 60s timer */
// -1s every second after game begins
if (timer === 0) {
  gameOn = false;
}

/** found all the corrected pair of cards */
// check selectedAllCards.length = ;

/** restart the game */
// call randomize cards function, showCards1s function...
// eventLisetenser ... gameOn = true;
// array.length = 0;

/*------------------------------------------------------------------------------*/
/*-------------------------------- Ranking Part (optional)----------------------*/
/*------------------------------------------------------------------------------*/
