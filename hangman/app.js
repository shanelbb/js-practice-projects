const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

const board = document.querySelector('#letterBoard')
const blanks = document.querySelector('.blanks')
const hiddenLetters = document.querySelector('.hiddenLetters')
const lives = document.querySelector('.lifeNum')

// dynamically create letter buttons
const makeBtns = (arr) => {
    arr.map(item => {
        let btn = document.createElement('button')
        btn.setAttribute('class', 'letter')
        btn.setAttribute('id', item)
        btn.textContent = item
        board.append(btn) 

    })
}
makeBtns(alphabet)
// generate random word
// random number between 3 & 12 for number of words from API
const num = Math.floor((Math.random() * 9) + 3)
let lifeCount

fetch(`https://random-word-api.herokuapp.com/word?length=${num}`)
    .then(res => res.json())
    .then(data => {
        const wordArray = data[0].split('')
        const word = data[0];
        console.log(word);
        lives.innerText = word.length
        lifeCount = word.length
        wordArray.forEach(letter => {
            let blank = document.createElement('span')
            hidden = document.createElement('span')
            hidden.setAttribute('class', 'hidden')
            blank.setAttribute('class', 'blank')
            hidden.textContent = letter
            hiddenLetters.append(hidden)
            blanks.append(blank)
        })
        displayedLetters = document.querySelectorAll('.hidden')
        btnHandler(word, displayedLetters)
    })

    function btnHandler(str, items){
        const letterBtns = document.querySelectorAll('.letter')
        letterBtns.forEach(button => {
            button.addEventListener('click', () => {
                if(str.includes(button.textContent)){
                    const matches = str.split('').filter(el => el === button.textContent)
                    items.forEach(item => {
                        if(item.textContent === matches[0]){
                         item.style.visibility = 'visible'
                        }
                    })
                }
                checkProgress(str, items)
                lifeCount--
                lives.innerText = lifeCount
            })
        })
    }

    // Check if all letters have been guessed
    const checkProgress = (str, items) => {
        const itemsArr = Array.from(items)
       const checkAnswer = itemsArr.filter(item => item.style.visibility === "visible")
       if(checkAnswer.length === str.length){
           Swal.fire('Great Job!', 'You guessed the word.', 'success')
           setTimeout(function(){
            location = ''
          },2000)
        }
        
        if(lifeCount === 1 && checkAnswer.length != str.length){
            lives.innerText = 0
            Swal.fire('Sorry!', `The answer was ${str.toUpperCase()}`, 'error')
            setTimeout(function(){
                location = ''
              },3000)
       }
    }




