const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')

const bWidth  = 100
const bHeight = 20
const boardWidth = 560
const boardHeight = 300
const ballDiameter = 20
let timerID 
let xDirection = 2
let yDirection = 2
let score = 0
let block_hit = false
let keydown = ''

const user_start = [230, 10]
const ball_start = [270, 40]
let currentPosition = user_start
let ballCurrentPosition = ball_start


document.addEventListener('keydown', e => {
    keydown = e.key
})
document.addEventListener('keyup', e =>{
    keydown = ''
})

// key down event
const update = () => {
    switch(keydown){
        case 'ArrowLeft':
            if(currentPosition[0] > 0){
                currentPosition[0] -= 5
                drawUser()
            }
            break
        case 'ArrowRight':
            if(currentPosition[0] + 100 < boardWidth){
                currentPosition[0] += 5
                drawUser()
            }
            break
    }
    window.requestAnimationFrame(update)
}
window.requestAnimationFrame(update)

//create Block
class Block {
    constructor(xAxis, yAxis){
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + bWidth, yAxis]
        this.topLeft = [xAxis, yAxis + bHeight]
        this.topRight = [xAxis + bWidth, yAxis + bHeight]
    }
}

// all my blocks
const blocks = [
    new Block(10, 270),
    new Block(110, 270),
    new Block(210, 270),
    new Block(310, 270),
    new Block(410, 270),

    new Block(10, 250),
    new Block(110, 250),
    new Block(210, 250),
    new Block(310, 250),
    new Block(410, 250),

    new Block(10, 230),
    new Block(110, 230),
    new Block(210, 230),
    new Block(310, 230),
    new Block(410, 230),

    new Block(10, 210),
    new Block(110, 210),
    new Block(210, 210),
    new Block(310, 210),
    new Block(410, 210)
]

//draw all my blocks
function addBlocks(){
    for(let i=0; i<blocks.length; i++){
        const block = document.createElement('div')
        block.classList.add('block')
        block.style.left = blocks[i].bottomLeft[0] + 'px'
        block.style.bottom = blocks[i].bottomLeft[1] + 'px'
        grid.appendChild(block)
    }
}
addBlocks()

// add user
const user = document.createElement('div')
user.classList.add('user')
drawUser()
grid.appendChild(user)

// divide by 5 zones
for(let i=0; i<5; i++){
    const parts = document.createElement('div')
    parts.classList.add('zone')
    user.appendChild(parts)
}


// drawUser
function drawUser(){
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] +'px'
}

//draw ball
function drawBall(){
    ball.style.left = ballCurrentPosition[0] + 'px'
    ball.style.bottom = ballCurrentPosition[1] + 'px'
}

// // move user - original.
// not smooth !
// function moveUser(e){
//     switch(e.key){
//         case 'ArrowLeft':
//             if(currentPosition[0] > 0){
//                 currentPosition[0] -= 10
//                 drawUser()  
//             }
//             break;
//         case 'ArrowRight':
//             if(currentPosition[0] < boardWidth - bWidth){
//                 currentPosition[0] += 10
//                 drawUser()
//             }
//             break;
//    }
// }
//document.addEventListener('keydown', moveUser)


// add ball
const ball = document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)

// move the ball
function moveBall(){
    ballCurrentPosition[0] += xDirection
    ballCurrentPosition[1] += yDirection
    drawBall()
    check_for_collisions()
}

timerID = setInterval(moveBall, 1)

// check for collisions
function check_for_collisions(){
    const blocks_hit = []

    // check for block collisions
    for(let i=0; i<blocks.length; i++){

        //check block side walls
        if(
            ballCurrentPosition[1] + ballDiameter/2 >= blocks[i].bottomLeft[1] &&
            ballCurrentPosition[1] + ballDiameter/2 <= blocks[i].topLeft[1]
        ){
            if(
                (
                    ballCurrentPosition[0] + ballDiameter >= blocks[i].bottomLeft[0] &&
                    ballCurrentPosition[0] + ballDiameter <= blocks[i].bottomRight[0]
                ) ||
                (
                    ballCurrentPosition[0] <= blocks[i].bottomRight &&
                    ballCurrentPosition[0] >= blocks[i].bottomLeft
                )
            ){
                changeDirection(xDirection*(-1), yDirection)
                block_hit = true
                blocks_hit.push(i)
                console.log(`${i}th block-side hit`)
                //j=i
            }
        }
        // check block top & bottom wall
        if(
            ballCurrentPosition[0] + ballDiameter/2 >= blocks[i].bottomLeft[0] &&
            ballCurrentPosition[0] + ballDiameter/2 <= blocks[i].bottomRight[0]
        ){
            if(
                (
                    ballCurrentPosition[1] + ballDiameter >= blocks[i].bottomLeft[1] &&
                    ballCurrentPosition[1] + ballDiameter <= blocks[i].topLeft[1]
                ) ||
                (
                    ballCurrentPosition[1] <= blocks[i].topLeft[1] &&
                    ballCurrentPosition[1] >= blocks[i].bottomLeft[1]
                )
            ){
                changeDirection(xDirection, yDirection*(-1))
                block_hit = true
                blocks_hit.push(i)
                //j=i
            }
        }
    }
    if(block_hit){
        for(let i=0; i<blocks_hit.length; i++){
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            allBlocks[blocks_hit[i]].classList.remove('block')
            blocks.splice(blocks_hit[i], 1)
            
            score++
            scoreDisplay.innerHTML = score

            // check for win
            if(blocks.length === 0){
                scoreDisplay.innerHTML = 'YOU WON'
                clearInterval(timerID)
                // document.removeEventListener('keydown', moveUser)
            }
        }
        block_hit = false
    }

//check for wall collisions
    //chcek side wall collisions
    if(
        ballCurrentPosition[0] >= (boardWidth - ballDiameter) ||
        ballCurrentPosition[0] <= 0
    ){
        changeDirection(xDirection*(-1), yDirection)
    }
    //check ceiling collision
    if(ballCurrentPosition[1] >= (boardHeight - ballDiameter)){
        changeDirection(xDirection, yDirection*(-1)) 
    }

            // check for user collisions //
    // check user-top
    if(
        ballCurrentPosition[0] + ballDiameter/2 <= currentPosition[0] + 100 &&
        ballCurrentPosition[0] + ballDiameter/2 >= currentPosition[0]
    ){
        if(
            ballCurrentPosition[1] <= currentPosition[1] + 20 &&
            ballCurrentPosition[1] >= currentPosition[1]
        ){
            changeDirection(xDirection, yDirection*(-1))
            // set fast-zone
            if(
                ballCurrentPosition[0] + ballDiameter/2 <=currentPosition[0] + 10 ||
                ballCurrentPosition[0] + ballDiameter/2 >= currentPosition[0] + 100 - 10
            ){
                yDirection++
                if(xDirection < 0) xDirection--
                else xDirection++
            }
        }
    }
    // check user-side
    else if(
        ballCurrentPosition[1] + ballDiameter/2 <= currentPosition[1] + 20 &&
        ballCurrentPosition[1] + ballDiameter/2 >= currentPosition[1]
    ){
        if(
            (
                ballCurrentPosition[0] + ballDiameter >= currentPosition[0] &&
                ballCurrentPosition[0] + ballDiameter <= currentPosition[0] + 100 &&
                ballCurrentPosition[0] <= currentPosition[0]
            ) ||
            (
                ballCurrentPosition[0] <= currentPosition[0] + 100 &&
                ballCurrentPosition[0] >= currentPosition[0] &&
                ballCurrentPosition[0] + ballDiameter >= currentPosition[0] + 100
            )
        )
        {
            changeDirection(xDirection*(-1), yDirection)
        }
    }
    
    // check for game over
    if(ballCurrentPosition[1] <= 0){
        clearInterval(timerID)
        scoreDisplay.innerHTML = 'GAME OVER!'
        // document.removeEventListener('keydown', moveUser)
    }
}

// changing ball directions
function changeDirection(x, y){
    xDirection = x
    yDirection = y
    console.log('direction changed')
    return
}
