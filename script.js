'use strict';

// 1. User roll dice
        // * generate random dice roll
        // * Display Dice roll

//elements
const rollBtn = document.querySelector('.btn--roll')
const holdBtn = document.querySelector('.btn--hold')
const newGameBtn = document.querySelector('.btn--new')

const diceEl = document.querySelector('.dice');
const currentScore0El = document.querySelector('#current--0') 
const currentScore1El = document.querySelector('#current--1') 
const score0El = document.getElementById('score--0')
const score1El = document.getElementById('score--1')
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');


//initial settings
let score, currentScore, currentPlayer, playing

function init(){
    diceEl.classList.add("hidden")
    currentScore0El.textContent = 0;
    currentScore1El.textContent = 0
    score0El.textContent = 0
    score1El.textContent = 0
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    
    score = [0,0]
    currentScore = 0
    currentPlayer = 0
    playing = true
}

init()


//switch player
const switchPlayer = function(){
    // making the current score zero
    document.getElementById(`current--${currentPlayer}`).textContent = 0
    currentScore = 0
    //switch player
    currentPlayer = currentPlayer === 0? 1 : 0

    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');

}

// dice roll button listener
rollBtn.addEventListener('click', function(){
    if(playing){
    // Generating random dice roll
    const roll = Math.trunc(Math.random() * 6) + 1
    
    // displaying dice roll
    diceEl.classList.remove('hidden')
    diceEl.src = `asset/dice-${roll}.png`

    // check for roll 1
    if(roll !== 1){
        currentScore += roll
        document.getElementById(`current--${currentPlayer}`).textContent = currentScore
    } else {
        switchPlayer()
    }
}
})

//Hold button
holdBtn.addEventListener('click', function(){
    if(playing){
        // 1. add current score to score
    score[currentPlayer] += currentScore
    document.getElementById(`score--${currentPlayer}`).textContent = score[currentPlayer]
    // 2. check score is greater than 100
    if(score[currentPlayer] >= 20){
        // 3. if yes player win. game finished
        playing = false
        diceEl.classList.add('hidden')
        document.querySelector(`.player--${currentPlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${currentPlayer}`).classList.remove('player--active');
    } else{
        // 4. if no switch player
        switchPlayer()
    }
    }
    
    
})
newGameBtn.addEventListener('click', init)