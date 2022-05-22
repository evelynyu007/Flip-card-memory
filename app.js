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
/** Event Listeners */
const loginPage = document.querySelector("#login-page");

/*-----------------------------------------------------------------------------*/
/*-------------------------------- Game Part ----------------------------------*/
/*-----------------------------------------------------------------------------*/

/** Constants & Variables */
// 1.1) an array wwith objects to represent all the cards
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
const gameGrid = document.querySelector(".grid-container");

/** add background image (later: randomlize it) */
// add it in css
// let backgroundGame = document.createElement("img");
// backgroundGame.src =
//   "img/background-concentric-white-drop-shadow-circles-purple-rings.png";
// gamePage.appendChild(backgroundGame);
//backgroundGame.style.backgroundImage="url(" + textNode.img + ")";

/** create cards and data class id into Grid */

arrCards = [
  { name: "fry", src: "img/characters/fry.png" },
  {
    name: "fry",
    src: "img/characters/fry.png",
  },
  { name: "homer-simpson", src: "img/characters/homer-simpson.png" },
  { name: "homer-simpson", src: "img/characters/homer-simpson.png" },
  {
    name: "homer-simpson-burnt",
    src: "img/characters/homer-simpson-burnt.png",
  },
  {
    name: "homer-simpson-burnt",
    src: "img/characters/homer-simpson-burnt.png",
  },
  { name: "mom", src: "img/characters/mom.png" },
  { name: "mom", src: "img/characters/mom.png" },
  {
    name: "professor-farnsworth",
    src: "img/characters/professor-farnsworth.png",
  },
  {
    name: "professor-farnsworth",
    src: "img/characters/professor-farnsworth.png",
  },
  { name: "zoidberg", src: "img/characters/zoidberg.png" },
  { name: "zoidberg", src: "img/characters/zoidberg.png" },
];
arrCards.forEach((card) => {
  let tempCard = document.createElement("img");
  tempCard.src = card.src;
  tempCard.alt = "Image not found";
  //   tempCard.style.display = "grid";

  gameGrid.appendChild(tempCard);
});
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
