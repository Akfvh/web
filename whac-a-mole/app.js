const squares = document.querySelectorAll(".square")    // get all the squares in the grid
const timeLeft = document.querySelector('#time-left')   // get time-left displayed
const score = document.querySelector('#score')          // get score displayed
const start_button = document.querySelector('.button')  // get start-button

let result = 0                  // score computed
let hitPosition                 // when mole is in the square
let currentTime = 30             // for timer
let countDownTimerId = null     // handle for setinterval(countdownTimer)
let moleTimer = null            // handle for setinterval(moleTimer)
let prevNum = -1

function randomSquare(){
    // first, remove '.mole' for every square
    squares.forEach(square => {
        square.classList.remove('mole')
    }) 
    let randomNum = Math.floor(Math.random() * 9)
    // set random square '.mole'
    // prevent repetitive square occurrence
    while(randomNum === prevNum){
        randomNum = Math.floor(Math.random() * 9)
    }
    let randomSquare = squares[randomNum]
    randomSquare.classList.add('mole')
    hitPosition = randomSquare.id
    prevNum = randomNum
}

// on clicking START button
// start moving mole
// start timer
start_button.addEventListener('click', ()=>{
    currentTime = 30;
    moveMole()
    startTimer()
})

squares.forEach(square =>{      
    square.addEventListener('mousedown', ()=>{      // for every square in the grid,
                                                    // add eventlister 'mousedown'                
        if(square.id == hitPosition){               // action:
            result++                                // if square clicked = square mole
            score.textContent = result              // result ++ 
            hitPosition = null                      // initialize square mole
            square.classList.remove('mole')
        }
    })
})
/* intervalHandle = setInterval(func, delay) */
function moveMole(){
    moleTimer = setInterval(randomSquare, 800)
}
function startTimer(){
    countDownTimerId = setInterval(countDown, 1000)
}
/* func countDown
 * update timer
 * on time == 0,
 *  - clear interval handles
 *  - initialize score and grid for next gmae
 */
function countDown(){
    currentTime--
    timeLeft.textContent = currentTime
    
    if(currentTime == 0) {
        clearInterval(countDownTimerId)
        clearInterval(moleTimer)
        alert('GAME OVER! your final score is: ' + result)
        
        result = 0
        score.textContent = result
        
        squares.forEach(square =>{
            if(square.classList.contains('mole')){
                square.classList.remove('mole')
            }
        })
    }
}
