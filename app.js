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
// 1.2) an array to represent selected two cards names
let selectedTwoCardsName = [];
// 1.3) an array to represent selecte two cards ids
let selectedTwoCardsID = [];
// 1.4) an array to represent selected Correct cards names
let selectedAllCardsName = [];
// 1.5) an array to represent selected Correct cards ids
let selectedAllCardsId = [];
// 2) score to represent current score
let score = 0;
// 3) 60 seconds timer
let timer = 60;
// 4) 3 seconds to stop the firstGlance
let timeToHide = 3000;
// 4.1) show the firstGlance countdown
let glanceSeconds = 3;
// 5) create blank cards
blankCard = "img/cardCover-rotate.png";
// 6) start to click(after all card hiden);
// let startToClick = false;
// 7) timer function
let timeInterval;
// 8) first time game? need to create cards
// let firstTimeGame = true;

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
// 1) the whole game page
const gamePage = document.querySelector("#game-page");
// 2) the card container
const gameContainer = document.querySelector(".grid-container");
// 3) class element of cards image will be created right after createCards
let cardsImgClass;
// 4) store the rest time and initialize the content
let restSeconds = document.querySelector("#restSeconds");
restSeconds.textContent = timer;
// 5) score on webpage
let scoreEle = document.querySelector("#score");
// 6) all the cards id
let dataIdsEle;
// 7) Restart Button
const restartButton = document.querySelector("#button-restart");
// 8) HINT Button
const hinttButton = document.querySelector("#button-hint");
// 9) flip TWO cards to the back -setTimeout 500
let flipTwoBack;
// 10) notification
const notificationEle = document.querySelector(".notification");

/** FUNCTIONS **************************************/
//////////////////////////
// Randomize Cards Pattern
const randomizeCards = function () {
  arrCards.sort(() => (Math.random() > 0.5 ? 1 : -1));
  console.log(arrCards);
};
//////////////////////////////////////////////////////////////
// create only for the first time and append to grid-container
const createCards = function () {
  // once createCards it will show up in the webpage so hide it
  gameContainer.classList.add("hide");
  // call the randomize function
  randomizeCards();
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
  console.info("create all the cards");
  //create elements reference - all cards class
  cardsImgClass = document.querySelectorAll(".cardsImg");
};

////////////////////////////////////////////
// show all the cards (aka the first glance)
const showAllCards = function () {
  gameContainer.classList.contains("hide") &&
    gameContainer.classList.remove("hide");
  notificationEle.textContent = "Take a Quick Glance";
  // 3 seconds for the glance - bug???
  // while (glanceSeconds > 0) {
  //   setInterval(() => {
  //     notificationEle.textContent = glanceSeconds;
  //     glanceSeconds--;
  //   }, 1000);
  // }

  console.log("showAllCards called");
  let i = 0;
  cardsImgClass.forEach((card) => {
    card.src = arrCards[i].front;
    i++;
  });
  console.info("show the first Glance");
};
//////////////////////////////
// Replace cards by blank card
const createBlankCards = function () {
  notificationEle.textContent = "Game Start";
  cardsImgClass.forEach((card) => {
    card.src = blankCard;
  });
  console.info("stop the first Glance");
};
///////////////////////
// remove cards shaking
const removeCardsShaking = function () {
  cardsImgClass.forEach((card) => {
    card.classList.contains("shaking") && card.classList.remove("shaking");
  });
  gameContainer.classList.contains("shaking") &&
    gameContainer.classList.remove("shaking");
};

///////////////////////////
// check if all cards found
const checkAllCardsFound = function () {
  if (selectedAllCardsName.length === arrCards.length) {
    console.log("🎉congratuations!");
    notificationEle.textContent = "🎉Congratuations!";
    // stop the timer
    clearInterval(timeInterval);
    // stop shaking when timer <=10
    removeCardsShaking();
    // play hooray sound
  }
};

// Add Event Listeners to the gameContainer instead of cardsImgClass
// the app should wait for the user to click a square and call a handleClick function
// Flip only two new cards
const addClicks = function () {
  gameContainer.addEventListener("click", function (event) {
    if (event.target.className === "cardsImg") {
      // grab the clicked card id -
      const cardId = event.target.getAttribute("id");
      const cardName = arrCards[cardId].name;
      // only if click different card (by id)
      // only if a new pair of cards
      if (
        selectedAllCardsName.indexOf(cardName) === -1 &&
        selectedTwoCardsID.indexOf(cardId) === -1
      ) {
        console.log("valid click");
        //push the selected two cards into selectedTwoCardsName/Id
        selectedTwoCardsName.push(cardName);
        selectedTwoCardsID.push(cardId);

        //flip card to front
        event.target.src = arrCards[cardId].front;

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

            // flip TWO cards to the back -setTimeout 700
            flipTwoBack = function () {
              // change dom img source to blank
              card1.src = blankCard;
              card2.src = blankCard;
            };
            setTimeout(flipTwoBack, 700);

            // reset
            selectedTwoCardsName.length = 0;
            selectedTwoCardsID.length = 0;
            // score - 1 and update score in webpage
            scoreEle.textContent = --score;
          }
        }
      } else {
        // do nothing?
        console.log("do not click repeatedly");
      }
      // When user selects all those correct pairs
      checkAllCardsFound();
    }
  });
};

/** 60s timer *************************************************/
// -1s every second after game begins
// move timeInterval as a global variable
const timerFunc = function () {
  timeInterval = setInterval(function () {
    timer--;
    restSeconds.textContent = timer;
    // timer warning
    if (timer === 10) {
      // shake each picture
      // BUG: when each card shaking, cannot click!!
      // cardsImgClass.forEach((card) => {
      //   card.classList.add("shaking");
      // });
      // shake the container - shake stronger
      gameContainer.classList.add("shaking");
      notificationEle.textContent = "The Last 10 Seconds";
    }
    if (timer < 10) {
      notificationEle.textContent = timer;
    }
    // stop timer
    if (timer === 0) {
      clearInterval(timeInterval);
      console.log("stop timer");
      notificationEle.textContent = "Game Over";
      // stop shaking
      removeCardsShaking();
      gameOn = false;
    }
  }, 1000);
};

/** setTimeOut  *******************************************/
// Show all the card in 1 s
// FIXME: try a true/false variable
const firstGlanceStart = function () {
  setTimeout(showAllCards, 1000);
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
// Start timer
const startTimer = function () {
  setTimeout(timerFunc, timeToHide + 1000);
};

/** Timer for the first glance */

/** restart/initialize the game */
restartButton.addEventListener("click", function (event) {
  // stop event bubbling - not working
  event.stopPropagation();

  console.log("🔂 restart the game");
  // Game on
  gameOn = true;
  // House Cleaning
  selectedTwoCardsName.length = 0;
  selectedTwoCardsID.length = 0;
  selectedAllCardsName.length = 0;
  score = 0;
  timer = 60;
  //remove shaking class? edge case: click restart when shaking
  removeCardsShaking();

  clearTimeout(firstGlanceStart);
  clearTimeout(firstGlanceStop);
  clearTimeout(startToClick);
  clearTimeout(flipTwoBack);
  // don't forget to clear timeInterval!
  clearInterval(timeInterval);

  // ////////////////////////////////////////////////////////
  // call randomize cards function, showCards1s function...
  randomizeCards();
  firstGlanceStart();
  firstGlanceStop();
  //startToClick(); //add eventListener only be added once
  startTimer(); // this works correctly
});

/** Hint function - the hardest part! */
// show a 1s glance all the cards???
// advanced: only shake two same picture(cannot shake in last 10s)
hinttButton.addEventListener("click", function (event) {
  console.log("🔔 clicked hint");
  // score - 1 and update score in webpage
  scoreEle.textContent = --score;
  // store all the unfound cards id
  const cardsIdNotFoundYet = [];
});

/** Start the first Game ***************************************/

document.addEventListener("DOMContentLoaded", () => {
  createCards();
  firstGlanceStart();
  firstGlanceStop();
  startToClick();
  startTimer();
});

/*------------------------------------------------------------------------------*/
/*-------------------------------- Ranking Part (optional)----------------------*/
/*------------------------------------------------------------------------------*/
