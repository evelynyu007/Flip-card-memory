/*-----------------------------------------------------------------------------*/
/*-------------------------------- Page hide/unhide EventListener -------------*/
/*-----------------------------------------------------------------------------*/
// 1) the login page
const loginPage = document.querySelector("#login-page");
// 1) the whole game page
const gamePage = document.querySelector("#game-page");
// 1) the whole game page
const rankPage = document.querySelector("#rank-page");

/*-----------------------------------------------------------------------------*/
/*-------------------------------- Login Part ---------------------------------*/
/*-----------------------------------------------------------------------------*/
/** Constants & Variables */
let gameMode = "easy";
// easy is 3 by 4 and hard is 4 by 6
let modeCardsCnt = gameMode === "easy" ? 12 : 24;
// form element
const form = document.getElementById("form");

/*-----------------------------------------------------------------------------*/
/*-------------------------------- Game Part ----------------------------------*/
/*-----------------------------------------------------------------------------*/

/** Constants & Variables */
// 1.0) an array with all the cards image database
let arrCardsDatabase = [];
// 1.1) an array wwith objects to represent all the cards and the blank card
let arrCards = [];
let arrIds = [];
// 1.2) an array to represent selected two cards names
let selectedTwoCardsName = [];
// 1.3) an array to represent selecte two cards ids
let selectedTwoCardsID = [];
// 1.4) an array to represent selected Correct cards names
let selectedAllCardsName = [];
// 1.5) an array to represent selected Correct cards ids
let selectedAllCardsId = [];
// 1.6) store all the unfound cards id
let cardsIdNotFoundYet = [];
// 2) score to represent current score
let score = 0;
// 3) 60 seconds timer
let timer = 60;
// 4) 3 seconds to stop the firstGlance
let timeToHide = 3000;
// 4.1) show the firstGlance countdown
let glanceSeconds = 3;
// 5.1) blank cards image
const blankCard = "img/cardCover-rotate.png";
// 5.2) game over image
const gameOverImg = "url('img/background-gameover.webp')";
// 5.3) game win image
const gameWinImg = "url('img/background-celebration.jpg')";
// 5.4) start game image array - random background
const startImgArr = [
  "url('img/background-concentric-white-drop-shadow-circles-purple-rings.png')",
  "url('img/background-burst-rays-shadow-sunburst-yellow-turquoise.png')",
  "url('img/background-white-3d-cubes-red.png')",
  "url('img/background-rick.jpeg')",
  "url('img/background-circles-violet-rings-lime-concentric-5120x2880-c2-67ac49-cf46fd-k2-0-0-l-288-f-25.png')",
];
let randomImg = Math.floor(Math.random() * startImgArr.length);
let startImg = startImgArr[randomImg];
// 5.5) image for hint
const hintImg = "url('img/background-eyesopen.jpeg')";

// 7) timer function
let timeInterval;
// 8) showAllCards function finished? default: no
let showAllCardsFunc = false;

// cards image database
// prettier-ignore
arrCardsDatabase = [
  { name: "fry", front: "img/characters/fry.png" },
  { name: "homer-simpson", front: "img/characters/homer-simpson.png" },
  { name: "homer-simpson-burnt", front: "img/characters/homer-simpson-burnt.png" },
  { name: "mom", front: "img/characters/mom.png" },
  { name: "professor-farnsworth", front: "img/characters/professor-farnsworth.png" },
  { name: "zoidberg", front: "img/characters/zoidberg.png" },
  { name: "ironman", front: "img/characters/iron-man.png" },
  { name: "zapp", front: "img/characters/zapp-brannigan.png" },
  { name: "white", front: "img/characters/walter-white.png" },
  { name: "venom", front: "img/characters/venom-head.png" },
  { name: "hermes", front: "img/characters/hermes-conrad.png" },
  { name: "naruto", front: "img/characters/naruto.png" },];

// Easy mode: select 6 cards from the database, repeat them twice, 12 cards in total
// randomly chose same card without repeating
// code is inspired from: https://stackoverflow.com/questions/17891173/how-to-efficiently-randomly-select-array-item-without-repeats
let copy = arrCardsDatabase.slice(0);
while (arrCards.length < modeCardsCnt) {
  let randomCardIndex = Math.floor(Math.random() * copy.length);
  let item = copy[randomCardIndex];
  arrCards.push(item);
  arrCards.push(item);
  copy.splice(randomCardIndex, 1);
}

/**  Cached Element References ********************************/

// 2) the card container
const gameContainer = document.querySelector(".grid-container");
// 3) class element of cards image will be created right after createCards
let cardsImgClass;
// 4) store the rest time and initialize the content
let restSeconds = document.querySelector("#restSeconds");
restSeconds.textContent = timer;
// 5) playerName on webpage
let playerName = document.querySelector("#playerName");
// 5) score on webpage
let scoreEle = document.querySelector("#score");
// 6) all the cards id
let dataIdsEle;
// 7) Restart Button
const restartButton = document.querySelector("#button-restart");
// 8) HINT Button
const hintButton = document.querySelector("#button-hint");
// 9) flip TWO cards to the back -setTimeout 500
let flipTwoBack;
// 10) notification
const notificationEle = document.querySelector(".notification");
// 11) Head-info
const headInfoEle = document.querySelector(".head-info");

/**  addEventListener or capsulized addEventListener *****************************************/
const addClicks = function () {
  gameContainer.addEventListener("click", flipCard);
};
const enableHint = function () {
  hintButton.addEventListener("click", hintClick);
};
restartButton.addEventListener("click", resetClick);

/** Start the first Game ********************************************************/
form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("form has been submitted");
  //grab user info
  const userName = document.getElementById("userName").value;
  const userEmail = document.getElementById("userEmail").value;
  //update player's name
  playerName.textContent = userName;

  //jump to game page
  loginPage.style.display = "none";
  gamePage.style.display = "block";

  //start game
  changeBackgroundImg(startImg);
  createCards();
  firstGlanceStart();
  firstGlanceStop();
  enableHint();
  startToClick();
  startTimer();
});

/** FUNCTIONS *********************************************************/
//////////////////////////
// Randomize Cards Pattern
function randomizeCards() {
  arrCards.sort(() => (Math.random() > 0.5 ? 1 : -1));
  console.log(arrCards);
}
///////////////////////////
// change background image
function changeBackgroundImg(img) {
  headInfoEle.style.backgroundImage = img;
}

// Randomize background image
function randomizeBackgroundImg() {
  randomImg = Math.floor(Math.random() * startImgArr.length);
  startImg = startImgArr[randomImg];
  changeBackgroundImg(startImg);
}

//////////////////////////////////////////////////////////////
// create only for the first time and append to grid-container
function createCards() {
  // once createCards it will show up in the webpage so hide it
  gameContainer.classList.add("hide");
  // call the randomize function - randomize before creating id -then id will always from 0 ..11
  randomizeCards();
  //create an indentical id
  let tempId = 0;
  arrCards.forEach((card) => {
    let tempImg = document.createElement("img");
    tempImg.src = card.front;
    tempImg.id = tempId;
    arrIds.push(tempId);
    tempId++;
    tempImg.classList.add("cardsImg");
    tempImg.alt = "Image not found";
    gameContainer.appendChild(tempImg);
  });
  console.info("create all the cards");
  //create elements reference - all cards class
  cardsImgClass = document.querySelectorAll(".cardsImg");
}

////////////////////////////////////////////
// show all the cards (aka the first glance)
function showAllCards() {
  gameContainer.classList.contains("hide") &&
    gameContainer.classList.remove("hide");
  notificationEle.textContent = "Take a Quick Glance";

  console.log("showAllCards called");
  showAllCardsFunc = true;
  let i = 0;
  cardsImgClass.forEach((card) => {
    card.src = arrCards[i].front;
    i++;
  });
  console.info("show the first Glance");
}
//////////////////////////////
// Replace cards by blank card
function createBlankCards() {
  notificationEle.textContent = "Game Starts";
  cardsImgClass.forEach((card) => {
    card.src = blankCard;
  });
  console.info("stop the first Glance");
}
///////////////////////
// remove cards shaking
function removeCardsShaking() {
  cardsImgClass.forEach((card) => {
    card.classList.contains("shaking") && card.classList.remove("shaking");
  });
  gameContainer.classList.contains("shaking") &&
    gameContainer.classList.remove("shaking");
  notificationEle.classList.contains("shaking") &&
    notificationEle.classList.remove("shaking");
}

///////////////////////////
// check if all cards found
function checkAllCardsFound() {
  if (selectedAllCardsName.length === arrCards.length) {
    console.log("🎉congratulaions!");
    notificationEle.textContent = "🎉You are the best!";
    // stop the timer
    clearInterval(timeInterval);
    // stop shaking when timer <=10
    removeCardsShaking();
    // update background img
    headInfoEle.style.backgroundImage = gameWinImg;
    // stop clicking...
    gameContainer.removeEventListener("click", flipCard);
    hintButton.removeEventListener("click", hintClick);
  }
}

// Add Event Listeners to the gameContainer instead of cardsImgClass
// the app should wait for the user to click a square and call a handleClick function
// Flip only two new cards
function flipCard(event) {
  notificationEle.textContent = "⏩ keep going";
  if (event.target.className.indexOf("cardsImg") > -1) {
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
          notificationEle.textContent = "✅ correct ✅";
          // store in the selectedAllCardsName/Id -repeat two times
          selectedAllCardsName.push(selectedCard1);
          selectedAllCardsName.push(selectedCard2);
          selectedAllCardsId.push(selectedId1);
          selectedAllCardsId.push(selectedId2);
          // reset
          selectedTwoCardsName.length = 0;
          selectedTwoCardsID.length = 0;
          // score + 1 and update score in webpage
          scoreEle.textContent = ++score;
        } else {
          console.log("clicked two wrong cards");
          notificationEle.textContent = "❌ wrong ❌";

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
      console.log("do not click repeatedly");
      notificationEle.textContent = "⛔️ clicked repeatedly ⛔️";
    }
    // When user selects all those correct pairs
    checkAllCardsFound();
  }
}

/** 60s timer *************************************************/
// -1s every second after game begins
// move timeInterval as a global variable
function timerFunc() {
  timeInterval = setInterval(function () {
    timer--;
    restSeconds.textContent = timer;
    // timer warning
    if (timer < 10) {
      // shake each picture
      cardsImgClass.forEach((card) => {
        card.classList.contains("shaking") || card.classList.add("shaking");
      });

      // shake the container - shake stronger
      gameContainer.classList.contains("shaking") ||
        gameContainer.classList.add("shaking");
      notificationEle.textContent = timer;
      notificationEle.classList.contains("shaking") ||
        notificationEle.classList.add("shaking");
      // notificationEle.style.color = red;
    }
    // stop timer
    if (timer < 0) {
      clearInterval(timeInterval);
      console.log("stop timer");
      notificationEle.textContent = "Game Over";
      // stop shaking
      removeCardsShaking();
      // stop clicking...
      gameContainer.removeEventListener("click", flipCard);
      hintButton.removeEventListener("click", hintClick);
      // update background img
      headInfoEle.style.backgroundImage = gameOverImg;
      // timer shows as 0
      restSeconds.textContent = 0;
    }
  }, 1000);
}

/** setTimeOut  *******************************************/

// NOTE: Tried a true/false showAllCardsFunc, it didn't work..
////////////////////////////
// Show all the card in 1 s
function firstGlanceStart() {
  setTimeout(showAllCards, 1000);
}
/////////////////////////////////////
// Hide all the card in x + 1 seconds
function firstGlanceStop() {
  setTimeout(createBlankCards, timeToHide + 1000);
}
/////////////////
// Start to click
function startToClick() {
  setTimeout(addClicks, timeToHide + 1000);
}
//////////////
// Start timer
function startTimer() {
  setTimeout(timerFunc, timeToHide + 1000);
}

//////////////////////////////////
/** restart/initialize the game */
function resetClick(event) {
  console.log("🔂 restart the game");
  // House Cleaning
  selectedTwoCardsName.length = 0;
  selectedTwoCardsID.length = 0;
  selectedAllCardsName.length = 0;
  selectedAllCardsId.length = 0;
  cardsIdNotFoundYet.length = 0;

  score = 0;
  scoreEle.textContent = score;
  timer = 60;
  restSeconds.textContent = timer;

  //remove shaking class? edge case: click restart when shaking
  removeCardsShaking();

  clearTimeout(firstGlanceStart);
  clearTimeout(firstGlanceStop);
  clearTimeout(startToClick);
  clearTimeout(flipTwoBack);
  // don't forget to clear timeInterval!
  clearInterval(timeInterval);

  // ////////////////////////////////////////////////////////
  // call randomize background img, cards function, showCards1s function...
  notificationEle.textContent = "New Game";
  // new background
  randomizeBackgroundImg();
  randomizeCards();
  firstGlanceStart();
  firstGlanceStop();
  enableHint();
  startToClick(); //add eventListener because of removeEvenListener hitted
  startTimer(); // this works correctly
}

////////////////
// Hint function
// show a 1s glance all the cards - then hide only unfound cards
function hintClick(event) {
  console.log("🔔 clicked hint");
  // update the background img
  changeBackgroundImg(hintImg);
  // score - 1 and update score in webpage
  scoreEle.textContent = --score;

  console.log("all cards id found: ");
  console.log(selectedAllCardsId); //character

  // store all the unfound cards id
  arrIds.forEach((id) => {
    if (selectedAllCardsId.indexOf(id.toString()) === -1) {
      cardsIdNotFoundYet.push(id.toString());
    }
  });
  console.log("cards id not found:");
  console.log(cardsIdNotFoundYet);

  notificationEle.textContent = "🍀 Hint";
  cardsIdNotFoundYet.forEach((id) => {
    cardsImgClass[id].src = arrCards[id].front;
  });
  //hide them after 1 second
  setTimeout(() => {
    notificationEle.textContent = "⏩ keep going";
    cardsIdNotFoundYet.forEach((id) => {
      cardsImgClass[id].src = blankCard;
    });
    // need to clean the array after the hint
    cardsIdNotFoundYet.length = 0;
    //edge case: flipped one card then hit the HINT....
    selectedTwoCardsID.length = 0;
    selectedTwoCardsName.length = 0;
  }, 1000);
}
