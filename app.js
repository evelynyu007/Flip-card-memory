// import gameTimer from "./gameTimer.js";
// gameTimer();
// didn't run..

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
// 7) timer function
let timeInterval;

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
// all the cards id
let dataIdsEle;

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
    // tempImg.setAttribute("data-id", tempId);
    tempImg.id = tempId;
    tempId++;
    tempImg.classList.add("cardsImg");
    tempImg.alt = "Image not found";
    gameContainer.appendChild(tempImg);
  });
  console.info("show the first Glance");
  //create eventListen - all cards class
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
// FIXME: can not click correct pair of cards!
const addClicks = function () {
  cardsImgClass.forEach((card) => {
    card.addEventListener("click", function (event) {
      console.log(event.target);
      // grab the clicked card id -
      const cardId = event.target.getAttribute("id");
      selectedTwoCardsID.push(cardId);
      //   console.log("cardid: " + cardId);
      //flip card to front
      card.src = arrCards[cardId].front;

      //push the selected two cards into selectedTwoCardsName
      selectedTwoCardsName.push(arrCards[cardId].name);
      console.log("selectedTwoCardsName: " + selectedTwoCardsName);

      // When we have two cards in the selectedTwoCardsName
      if (selectedTwoCardsName.length === 2) {
        //grab the only two cards
        let selectedCard1 = selectedTwoCardsName[0];
        let selectedCard2 = selectedTwoCardsName[1];
        let selectedId1 = selectedTwoCardsID[0];
        let selectedId2 = selectedTwoCardsID[1];
        // store the two cards id dom elements
        let card1 = document.getElementById(selectedId1);
        let card2 = document.getElementById(selectedId2);

        // Verify if two cards are same
        if (selectedCard1 === selectedCard2) {
          console.log("found two same cards");
          // store in the selectedAllCardsName -repeat two times
          selectedAllCardsName.push(selectedCard1);
          selectedAllCardsName.push(selectedCard2);
          // reset
          selectedTwoCardsName.length = 0;
          selectedTwoCardsID.length = 0;
          // score + 1 and update score in webpage
          scoreEle.textContent = ++score;
        } else {
          console.log("clicked two wrong cards");

          // flip TWO cards to the back -setTimeout 500
          setTimeout(() => {
            // change dom img source to blank
            card1.src = blankCard;
            card2.src = blankCard;
          }, 800);

          // reset
          selectedTwoCardsName.length = 0;
          selectedTwoCardsID.length = 0;
          // score - 1 and update score in webpage
          scoreEle.textContent = --score;
        }
      }
      // When user selects all those correct pairs
      //   console.log(selectedAllCardsName);
      if (selectedAllCardsName.length === arrCards.length) {
        console.log("congratuations!");
        // stop the timer
        clearInterval(timeInterval);
        // stop shaking if timer <=10
      }
    });
  });
};

/** setTimeOut  *******************************************/
// Show all the card in 1 s
// FIXME: try a true/false variable
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
// move timeInterval as a global variable
setTimeout(function () {
  timeInterval = setInterval(function () {
    timer--;
    restSeconds.textContent = timer;
    // timer warning
    if (timer === 10) {
      // shake each picture
      cardsImgClass.forEach((card) => {
        card.classList.add("shaking");
      });
      // shake the container - shake stronger
      gameContainer.classList.add("shaking");
    }
    // stop timer
    if (timer === 0) {
      clearInterval(timeInterval);
      console.log("stop timer");
      // stop shaking
      cardsImgClass.forEach((card) => {
        card.classList.remove("shaking");
      });
      gameContainer.classList.remove("shaking");

      // gameOn = false;
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
