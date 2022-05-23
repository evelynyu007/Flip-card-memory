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
// 1.2) an array to represent selected two cards name
let selectedTwoCardsName = [];
// 1.3) an array to represent selecte two cards id
let selectedTwoCardsID = [];
// 1.4) an array to represent selected Correct two cards
let selectedAllCardsName = [];
// 2) score to represent current score
let score = 0;
// 3) 60 seconds timer
let timer = 60;
// 4) millisecond to hide the firstGlance
let timeToHide = 3000;
// 5) create blank cards
blankCard = "img/cardCover-rotate.png";
// 6) start to click(after all card hiden);
// let startToClick = false;

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

/**  Cached Element References ********************************/
const gamePage = document.querySelector("#game-page");
const gameContainer = document.querySelector(".grid-container");
//class element of cards image will be created right after createRandomCards
let cardsImgClass;
// store the rest time and initialize the content
let restSeconds = document.querySelector("#restSeconds");
restSeconds.textContent = timer;
// score on webpage
let scoreEle = document.querySelector("#score");

/** FUNCTIONS **************************************/
// Randomize Cards Pattern and append to grid-container/
const createRandomCards = function () {
  arrCards.sort(() => (Math.random() > 0.5 ? 1 : -1));
  console.log(arrCards);
  //create an indentical id
  let tempId = 0;
  arrCards.forEach((card) => {
    let tempImg = document.createElement("img");
    tempImg.src = card.front;
    tempImg.setAttribute("data-id", tempId);
    tempId++;
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
// Add Event Listeners here otherwise it will run first
// the app should wait for the user to click a square and call a handleClick function
// Flip only two cards
const addClicks = function () {
  cardsImgClass.forEach((card) => {
    card.addEventListener("click", function (event) {
      // FIXME: not working every time?????????
      console.log("clicked");
      const clickedCard = event.target;
      console.log(clickedCard);
      // grab the clicked card id
      const cardId = this.getAttribute("data-id");
      selectedTwoCardsID.push(cardId);
      //flip card
      card.src = arrCards[cardId].front;
      //push the selected two cards into selectedTwoCardsName
      selectedTwoCardsName.push(arrCards[cardId].name);
      console.log(selectedTwoCardsName);
      console.log("length: " + selectedTwoCardsName.length);

      // When we have two cards in the selectedTwoCardsName
      if (selectedTwoCardsName.length === 2) {
        //grab the only two cards
        let selectedCard1 = selectedTwoCardsName[0];
        let selectedCard2 = selectedTwoCardsName[1];
        let selectedId1 = selectedTwoCardsID[0];
        let selectedId2 = selectedTwoCardsID[1];
        // Verify if two cards are same
        if (selectedCard1 === selectedCard2) {
          console.log("found two same cards");
          // reset the selectedTwoCardsName
          selectedTwoCardsName.length = 0;
          // score + 1 and update score in webpage
          scoreEle.textContent = ++score;
        } else {
          console.log("clicked two wrong cards");
          // flip TWO cards to the back
          arrCards[selectedId1].src = blankCard;
          arrCards[selectedId2].src = blankCard;
          // reset the selectedTwoCardsName
          selectedTwoCardsName.length = 0;
          // score - 1 and update score in webpage
          scoreEle.textContent = --score;
        }
      }
    });
  });
};

/** setTimeOut  *******************************************/
// Show all the card in 1 s
const firstGlanceStart = function () {
  setTimeout(createRandomCards, 1000);
};
// Hide all the card in x + 1 seconds
// no needs to hide... Show all the blankCard instead
const firstGlanceStop = function () {
  setTimeout(createBlankCards, timeToHide + 1000);
};
// Start to click
const startToClick = function () {
  setTimeout(addClicks, timeToHide + 1000);
};

/** Show all the cards for 3s then flip to "cardCover"*********/
document.addEventListener("DOMContentLoaded", (event) => {
  firstGlanceStart();
  firstGlanceStop();
  startToClick();
});

/** if correct .. */
// push correct two cards into selectedAllCardsName
// score+1 otherwise score-1

/** 60s timer */
// -1s every second after game begins
setTimeout(function () {
  const timeInterval = setInterval(function () {
    timer--;
    restSeconds.textContent = timer;
    // console.log("timer:" + timer);
    //timer warning
    // TODO: add some effects
    if (timer <= 10) {
      //   console.warn("timer is less than 10 seconds");
    }
    // stop timer
    if (timer === 0) {
      clearInterval(timeInterval);
      console.log("stop timer");
      gameOn = false;
    }
  }, 1000);
}, 1000 + timeToHide);

/** found all the corrected pair of cards */
// check selectedAllCardsName.length = ;

/** restart/initialize the game */
// call randomize cards function, showCards1s function...
// eventLisetenser ... gameOn = true;
// array.length = 0;

/** Hint function */
// show a 1s glance
// advanced: shake the picture which are same...

/*------------------------------------------------------------------------------*/
/*-------------------------------- Ranking Part (optional)----------------------*/
/*------------------------------------------------------------------------------*/
