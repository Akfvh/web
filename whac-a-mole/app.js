const squares = document.querySelectorAll(".square")
const mole = document.querySelector(".mole")
const timeLeft = document.querySelector('#time-left')
const score = document.querySelector('#score')

let result = 0
let hitPosition 
let currentTime = 60

function randomSquare(){
    squares.forEach(square => {
        square.classList.remove('mole')
    }) // for each square, remove the class mole

    let randomSquare = squares[Math.floor(Math.random() * 9)]
    randomSquare.classList.add('mole')
    
    hitPosition = randomSquare.id
}

squares.forEach(square =>{
    square.addEventListener('mousedown', ()=>{
        if(square.id == hitPosition){
            result++
            score.textContent = result
            hitPosition = null
        }
    })
})

function moveMole(){
    let timerID = null
    timerID = setInterval(randomSquare, 1000)
}


moveMole()

function countDown(){
    currentTime--
    timeLeft.textContent = currentTime

    if(currentTime == 0) {
        clearInterval(countDownTimerId)
        alert('GAME OVER! your final scor is' + result)
    }
}

let countDownTimerId = setInterval(countDown, 1000)
