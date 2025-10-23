let diceImg= document.querySelector(".diceImg");
let score1 = document.getElementById("score1");
let score2 = document.getElementById("score2");
let currentValue1 = document.getElementById("current-value1");
let currentValue2 = document.getElementById("current-value2");
let player1 = document.querySelector(".player1");
let player2 = document.querySelector(".player2");
let info = document.getElementById("info");
let rollBtn = document.querySelector(".roll");
let gameBtn = document.querySelector(".newGame");
let gameBox = document.querySelector(".gameBox");
let holdBtn = document.querySelector(".hold");
let roundedScore = 0;
let activePlayer;
let gameisPlaying;
let finalScore = [0,0];
const winner = 100;

newGame();


function newGame() {
    diceImg.style.display = "none";
    finalScore =[0,0];
    activePlayer = 0;
    roundedScore =0;
    gameisPlaying = true;
    score1.innerText = 0;
    score2.innerText = 0;
    currentValue1.innerText = 0;
    currentValue2.innerText = 0;
    player1.classList.remove("winner");
    player2.classList.remove("winner");
    player2.classList.remove("player-active");
    player1.classList.add("player-active");
    info.innerText = "PIG DICE GAME";
    toggleButtons(false);
}
function rollDice() {
    if(gameisPlaying){
    let randNum = Math.floor(Math.random()*6 + 1);
    diceImg.style.display = "block";
    diceImg.src = "images/dice-" + randNum + ".png";
    if(randNum !== 1){
        roundedScore+=randNum;
        currentValue1.innerText = randNum;
        score1.innerText = finalScore[0] + roundedScore;

        if(finalScore[0]+roundedScore>=winner) {
            finalScore[0] += roundedScore;
            score1.innerText = finalScore[0];
            roundedScore =0;
            checkWinner();
        }
    }
    else {
        score1.innerText = 0;
        currentValue1.innerText = 0;
        nextPlayer();
    }
    }
}
function hold() {
    finalScore[activePlayer]+=roundedScore;
    score1.innerText = finalScore[0];
    currentValue1.innerText = 0;
    checkWinner();
    nextPlayer();
}
// function nextPlayer() {
//     if(activePlayer === 0) {
//         activePlayer = 1;
//         let randNum = Math.floor(Math.random()*6 + 1);
//         currentValue2.innerText = randNum;
//         roundedScore+=randNum;
//         score2.innerText = roundedScore;
//     }
//     else{
//         activePlayer = 0;
//     }
//     player1.classList.toggle("player-active");
//     player2.classList.toggle("player-active");
//     // roundedScore = 0;
//     // currentValue1.innerText= 0; 
//     // currentValue2.innerText= 0;   
        
// }

function nextPlayer(){
    roundedScore = 0;
    player1.classList.toggle("player-active");
    player2.classList.toggle("player-active");
    activePlayer = activePlayer ===0 ? 1:0;
    if(activePlayer===1){
        toggleButtons(true);
        robotPlays();
        info.innerText = "It's Robots turn..."
    }
    else {
        toggleButtons(false);
        info.innerText = "Your turn to play..."
    }
}

function robotPlays(){
    let rolls = 0;

    function computerTurn(){

    if(!gameisPlaying || activePlayer !== 1) return;

    let randNum = Math.floor(Math.random()*6 +1);
    diceImg.style.display = "block";
    diceImg.src = "images/dice-" + randNum + ".png";
    currentValue2.innerText = randNum;

    if(randNum === 1){
        roundedScore = 0;
        finalScore[1]+= 0;
        currentValue2.innerText = 0;
        score2.innerText = finalScore[1];
        setTimeout(nextPlayer, 1500);
    }
    else{
        roundedScore+=randNum;
        score2.innerText = finalScore[1] + roundedScore;
        rolls++;
    }
    if (rolls<4) {
        setTimeout(computerTurn, 1500);
    }
    else {
        finalScore[1] += roundedScore;
        roundedScore = 0;
        setTimeout(() => {
                    score2.innerText = finalScore[1];
                    checkWinner();
                    nextPlayer();
                    toggleButtons(false);
                }, 1000);
    }
    }
    computerTurn();
}

function toggleButtons(isDisabled) {
    rollBtn.disabled = isDisabled;
    holdBtn.disabled = isDisabled;

    if (isDisabled) {
        rollBtn.style.opacity = "0.5";
        holdBtn.style.opacity = "0.5";
        rollBtn.style.cursor = "not-allowed";
        holdBtn.style.cursor = "not-allowed";
    } else {
        rollBtn.style.opacity = "1";
        holdBtn.style.opacity = "1";
        rollBtn.style.cursor = "pointer";
        holdBtn.style.cursor = "pointer";
    }
}

function checkWinner() {
    if(finalScore[activePlayer]>= winner) {
        gameisPlaying = false;
        if (activePlayer === 0) {
            player1.classList.add("winner");
        } else {
            player2.classList.add("winner");
        }
        if(activePlayer ===0){
            alert("🏅🥳🎉 You Win!!")
        }
        else {
            alert("🤖 Robot Wins!!")
        }
        // player1.classList.remove("player-active");
        // player2.classList.remove("player-active");
        
        toggleButtons(true);
    }
}
function toggleRules() {
  const rules = document.getElementById("rulesContainer");
  const btn = document.getElementById("toggleRulesBtn");

  const isCurrentlyHidden = window.getComputedStyle(rules).display === "none";

  if (isCurrentlyHidden) {
    rules.style.display = "block";
    btn.textContent = "❌";
    gameBox.style.display = "none";
    rollBtn.style.display = "none";
    gameBtn.style.display = "none";
    holdBtn.style.display = "none";
    diceImg.style.display = "none";
    info.style.display = "none";
  } else {
    rules.style.display = "none";
    btn.textContent = "Game Rules";
    gameBox.style.display = "flex";
    rollBtn.style.display = "inline-block";
    gameBtn.style.display = "inline-block";
    holdBtn.style.display = "inline-block";
    info.style.display = "inline-block";
  }
}