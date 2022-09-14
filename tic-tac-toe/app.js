// generate board
const combos = [
    {1:'', 2:'', 3:''},
    {4:'', 5:'', 6:''},
    {7:'', 8:'', 9:''},
    {1:'', 4:'', 7:''},
    {2:'', 5:'', 8:''},
    {3:'', 6:'', 9:''},
    {3:'', 5:'', 7:''},
    {1:'', 5:'', 9:''},
]

const nums = ['1','2','3','4','5','6','7','8','9']

const board = document.querySelector(".board")
const player = document.querySelector('.player')

const squares = document.createElement('ul')
board.append(squares)

for(let i = 1; i < 10; i++){
    const square = document.createElement('li')
    squares.appendChild(square)
    square.setAttribute('id', i)
}

player.textContent = 'Player 1'
let playerOne = true

const spots = document.querySelectorAll('li')
let spotArray = []

const updateCombos = (item) => {
    spotArray.push(item.id)
    combos.forEach((combo) => {
        const comboArr = Object.keys(combo)
        const vals = Object.values(combos)
        

        if(comboArr.includes(item.id)){
            combo[item.id] = item.textContent
            
            vals.forEach(val => {
                const valObj = Object.values(val)
                let checker = (arr, target) => target.every(item => arr.includes(item))
                console.log(valObj);
                let oWins = valObj.every(el => el === 'O')
                let xWins = valObj.every(el => el === 'X')
                if (oWins){
                    Swal.fire('Congratulations!', 'O wins the game.', 'success')
                     setTimeout(function(){
                        reset()  
                      },2000)  
                } else if (xWins){
                    Swal.fire('Congratulations!', 'X wins the game.', 'success')
                     setTimeout(function(){
                        reset()  
                      },2000)   
                } else if (checker(spotArray, nums)){
                    Swal.fire("It's a Draw.", 'Try again.', 'error')
                    setTimeout(function(){
                        reset()  
                      },2000)
                }  
            })
        }
    })
}

function play (element) {
    if(playerOne) {
        element.textContent = "O"
        playerOne = false
        player.textContent = "Player 2"
        updateCombos(element)
 
    } else {
        element.textContent = "X"
        playerOne = true
        player.textContent = "Player 1"
        updateCombos(element)
    }
}

function spotHandler() {
    squares.addEventListener('click', (e) => {
        play(e.target) 
    })
}   

spotHandler()

function reset() {
    window.location.reload(false)
}


const resetBtn = document.querySelector('.resetBtn')
resetBtn.addEventListener('click', reset)