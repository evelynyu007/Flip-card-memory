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
let timer = 15;
// 4) millisecond to hide the firstGlance
let timeToHide = 3000;
// 5) constants
// create blank cards
blankCard = "img/cardCover-rotate.png";

// create cards and data class into Grid
// prettier-ignore
arrCards = [
  { name: "fry", front: "img/characters/fry.png" },
  { name: "fry", front: "img/characters/fry.png" },
  { name: "homer-simpson", front: "img/characters/homer-simpson.png" },
  { name: "homer-simpson", front: "img/characters/homer-simpson.png" },
  { name: "homer-simpson-burnt", front: "img/characters/homer-simpson-burnt.png" },
  { name: "homer-simpson-burnt", front: "img/characters/homer-simpson-burnt.png" },
  { name: "mom", front: "img/characters/mom.png" },
  { name: "mom", front: "img/characters/mom.png" },
  { name: "professor-farnsworth", front: "img/characters/professor-farnsworth.png" },
  { name: "professor-farnsworth", front: "img/characters/professor-farnsworth.png" },
  { name: "zoidberg", front: "img/characters/zoidberg.png" },
  { name: "zoidberg", front: "img/characters/zoidberg.png" },
];

/**  Cached Element References */
const gamePage = document.querySelector("#game-page");
const gameContainer = document.querySelector(".grid-container");
//class element of cards image will be created right after createRandomCards
let cardsImgClass;
// store the rest time and initialize the content
let restSeconds = document.querySelector("#restSeconds");
restSeconds.textContent = timer;

/** FUNCTIONS */
// Randomize Cards Pattern and append to grid-container/
const createRandomCards = function () {
  arrCards.sort(() => (Math.random() > 0.5 ? 1 : -1));
  console.log(arrCards);
  arrCards.forEach((card) => {
    let tempImg = document.createElement("img");
    tempImg.src = card.front;
    tempImg.classList.add("cardsImg");
    tempImg.alt = "Image not found";
    gameContainer.appendChild(tempImg);
  });
  console.info("show the first Glance");
  //create eventListen
  cardsImgClass = document.querySelectorAll(".cardsImg");
};
// Replace cards by blank card
const createBlankCards = function () {
  cardsImgClass.forEach((card) => {
    card.src = blankCard;
  });
  console.info("stop the first Glance");
};

// Show all the card in 1 s
const firstGlanceStart = function () {
  setTimeout(createRandomCards, 1000);
};
// Hide all the card in x + 1 seconds
// no needs to hide... Show all the blankCard instead
const firstGlanceStop = function () {
  setTimeout(createBlankCards, timeToHide + 1000);
};

/** add background image (later: randomlize it) */
// add it in css
// let backgroundGame = document.createElement("img");
// backgroundGame.src =
//   "img/background-concentric-white-drop-shadow-circles-purple-rings.png";
// gamePage.appendChild(backgroundGame);
//backgroundGame.style.backgroundImage="url(" + textNode.img + ")";

/** Show all the cards for 3s then flip to "cardCover"*/
document.addEventListener("DOMContentLoaded", (event) => {
  firstGlanceStart();
  firstGlanceStop();
});

/** Flip two cards */
//push the two cards into selectedTwoCards

/** Verify if two cards are same */
// check by their class names

/** if correct .. */
// push correct two cards into selectedAllCards
// score+1 otherwise score-1

/** 60s timer */
// -1s every second after game begins
// TODO: start timer after all the cards hided
const timeInterval = setInterval(function () {
  timer--;
  restSeconds.textContent = timer;
  console.log("timer:" + timer);
  //timer warning
  if (timer <= 10) {
    console.warn("timer is less than 10 seconds");
  }
  // stop timer
  if (timer === 0) {
    clearInterval(timeInterval);
    console.log("stop timer");
    gameOn = false;
  }
}, 1000);

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
