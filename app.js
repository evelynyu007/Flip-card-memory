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
// 1.1) an array wwith objects to represent all the cards and the blank card
let arrCards = [];
let blankCard = [];
// 1.2) an array to represent selected two cards
let selectedTwoCards = [];
// 1.2) an array to represent selected Correct two cards
let selectedAllCards = [];
// 2) score to represent current score
let score = 0;
// 3) 60 seconds timer
let timer = 60;
// 4) millisecond to hide the firstGlance
let timeToHide = 3000;
// 5) constants
// create cards and data class into Grid
// prettier-ignore
arrCards = [
  { name: "fry", src: "img/characters/fry.png" },
  { name: "fry", src: "img/characters/fry.png" },
  { name: "homer-simpson", src: "img/characters/homer-simpson.png" },
  { name: "homer-simpson", src: "img/characters/homer-simpson.png" },
  { name: "homer-simpson-burnt", src: "img/characters/homer-simpson-burnt.png" },
  { name: "homer-simpson-burnt", src: "img/characters/homer-simpson-burnt.png" },
  { name: "mom", src: "img/characters/mom.png" },
  { name: "mom", src: "img/characters/mom.png" },
  { name: "professor-farnsworth", src: "img/characters/professor-farnsworth.png" },
  { name: "professor-farnsworth", src: "img/characters/professor-farnsworth.png" },
  { name: "zoidberg", src: "img/characters/zoidberg.png" },
  { name: "zoidberg", src: "img/characters/zoidberg.png" },
];
// create blank cards
blankCard = [{ name: "blank", src: "img/cardCover.png" }];

/** Event Listeners */
const gamePage = document.querySelector("#game-page");
const gameContainer = document.querySelector(".grid-container");

/** FUNCTIONS */
// Randomize Cards Pattern and append to grid-container/
const createRandomCards = function () {
  arrCards.sort(() => (Math.random() > 0.5 ? 1 : -1));
  console.log(arrCards);
  arrCards.forEach((card) => {
    let tempCard = document.createElement("img");
    tempCard.src = card.src;
    tempCard.alt = "Image not found";
    gameContainer.appendChild(tempCard);
  });
};
// Hide all the cards
const hideCards = function () {
  gameContainer.classList.add("hide");
};
// Show all the card in 1 s
const firstGlanceStart = function () {
  setTimeout(createRandomCards, 1000);
};
// Hide all the card in x + 1 seconds
const firstGlanceStop = function () {
  setTimeout(hideCards, timeToHide + 1000);
};

/** add background image (later: randomlize it) */
// add it in css
// let backgroundGame = document.createElement("img");
// backgroundGame.src =
//   "img/background-concentric-white-drop-shadow-circles-purple-rings.png";
// gamePage.appendChild(backgroundGame);
//backgroundGame.style.backgroundImage="url(" + textNode.img + ")";

/** Show all the cards for 3s then flip to "cardCover"*/
// show the cards
document.addEventListener("DOMContentLoaded", (event) => {
  console.info("show and hide the first Glance");
  firstGlanceStart();
  firstGlanceStop();
});

// firstGlance();
// firstGlanceStop();

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

/** Hint function */
// show a 1s glance
// advanced: shake the picture which are same...

/*------------------------------------------------------------------------------*/
/*-------------------------------- Ranking Part (optional)----------------------*/
/*------------------------------------------------------------------------------*/
