const cardArray = [
    {
        name: 'fries',
        img:  '/images/fries.png'
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
    {
        name: "icecream",
        img: 'images/icecream.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    },
    {
        name: 'milk shake',
        img: 'images/milk-shake.png'
    },
    {
        name: 'fries',
        img:  '/images/fries.png'
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
    {
        name: "icecream",
        img: 'images/icecream.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    },
    {
        name: 'milk shake',
        img: 'images/milk-shake.png'
    }
]

cardArray.sort(() => 0.5 - Math.random()) //sorting an array randomly

const gridDisplay = document.querySelector(".grid") //the hash (#) is for searching the id
const resultDisplay = document.querySelector('#result')
const logDisplay = document.querySelector("#log")
let cardsChosen = []
let cardsChosenIds = []
const cardsWon = []
let msg = ''

function createBoard(){
    for (let i = 0; i<cardArray.length; i++){
        const card = document.createElement('img')
        card.setAttribute('src', 'images/blank.png')
        card.setAttribute('data-id', i)
        card.addEventListener('click', flipCard)
        gridDisplay.appendChild(card)
    }
}

createBoard()

function checkMatch(){
    const cards = document.querySelectorAll('img')
    const option1_id = cardsChosenIds[0]
    const option2_id = cardsChosenIds[1]
    

    if(option1_id == option2_id){
        alert('you have clicked the same img !')
        cards[option1_id].setAttribute('src', 'images/blank.png')
        cards[option2_id].setAttribute('src', 'images/blank.png')
    } else if(cardsChosen[0] == cardsChosen[1]){
        msg = msg + "\n" + String(cardsChosen[0])
        console.log(msg)
        alert('you found a match !')
        cards[option1_id].setAttribute('src', 'images/white.png')
        cards[option2_id].setAttribute('src', 'images/white.png')
        cards[option1_id].removeEventListener('click', flipCard)
        cards[option2_id].removeEventListener('click', flipCard)
        cardsWon.push(cardsChosen)
    }else{
        cards[option1_id].setAttribute('src', 'images/blank.png')
        cards[option2_id].setAttribute('src', 'images/blank.png')
        alert(' try again ! ')
    }
    resultDisplay.textContent = cardsWon.length
    logDisplay.textContent = msg
    if(cardsWon.length === cardArray.length/2){
        resultDisplay.textContent = 'congratulations !'
    }

    cardsChosen = []
    cardsChosenIds = []
}
function flipCard(){
    console.log(cardArray)
    let cardid = this.getAttribute('data-id')
    cardsChosen.push(cardArray[cardid].name)
    cardsChosenIds.push(cardid)
    this.setAttribute('src', cardArray[cardid].img)

    if(cardsChosen.length === 2){
        setTimeout(checkMatch, 500)  //call a function after a certain amount of time passed
    }
}
