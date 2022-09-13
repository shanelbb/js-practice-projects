// Object containing details of each dog. Breed to populate the guesses and check the answers. img to populat the image src. number to get the key name to turn of enumeration.

const dogObject = {
    dog1: {
        breed: 'Alaskan Malamute',
        img: "./img/dog1.jpeg",
        number: "dog1"},
    dog2: {
        breed: 'Basenji',
        img: "./img/dog2.jpeg",
        number: "dog2"},
    dog3: {
        breed: 'American Bulldog',
        img: "./img/dog3.jpeg",
        number: "dog3"},
    dog4: {
        breed: 'Chihuahua',
        img: "./img/dog4.jpeg",
        number: "dog4"},
    dog5: {
        breed: 'Corgi',
        img: "./img/dog5.jpeg",
        number: "dog5"},
    dog6: {
        breed: 'French Bulldog',
        img: "./img/dog6.jpeg",
        number: "dog6"},
    dog7: {
        breed: 'German Shepherd',
        img: "./img/dog7.jpeg",
        number: "dog7"},
    dog8: {
        breed: 'Golden Retriever',
        img: "./img/dog8.jpeg",
        number: "dog8"},
    dog9: {
        breed: 'Husky',
        img: "./img/dog9.jpeg",
        number: "dog9"},
    dog10: {
        breed: 'Newfoundland',
        img: "./img/dog10.jpeg",
        number: "dog10"},
    dog11: {
        breed: 'Poodle',
        img: "./img/dog11.jpeg",
        number: "dog11"},
    dog12: {
        breed: 'Border Bully',
        img: "./img/dog12.jpeg",
        number: "dog12"}    
    }

// select the image, and buttons
const image = document.querySelector(".image")
const guesses = document.querySelectorAll('.btn')
const reset = document.querySelector('.resetBtn')
// create an object with dog breeds and corresponding image

// Key of selected guesses will be added to this list so they enumeration can be added back later
const added = []

// generate image
// cycle through each dog in dogObject
let num = 1

const getImg = () => {
    // set image source
    image.src = `img/dog${num}.jpeg`
    // set key to use when making unenumerable
    const key = `dog${num}`
    // get random number between 1 & 4 to place correct guess on a random guess button each time.
    const random = Math.ceil(Math.random() * 4)
    const answer = document.getElementById(`guess${random}`)
    // get the breed of the dog from the dogObject
    const breed = dogObject[key].breed
    // set the text on the button
    answer.innerHTML = breed
    // set the alt text on the image and adding breed to data attribute on that guess button for use in checking correct answer
    image.alt = breed
    answer.setAttribute('data-breed', breed)
    // making entry unenumerable so the answer won't get repeated on the guess buttons
    Object.defineProperty(dogObject, key, { enumerable: false })
    // pushing the key to the added array for making the entries enumberable again on reset.
    added.push(key)

    // incrementing num to cycle through entries on each reset.
    if(num <= Object.keys(dogObject).length){
        num++
    } else {
        num = 1
    }
}
// populate the guesses buttons with breed name
// function to choose a random entry from the dogObject 
const getObj =  (object) => {
    const values = Object.entries(object)
    return values[Math.floor(Math.random() * values.length)][1]
}
// add guesses from the dogObject entries to remaining guess buttons
const addGuesses = () => { 
    
    guesses.forEach(guess => {
        // run getObj function to select an entry to add to guess buttons
        let obj = getObj(dogObject) 
        // make that entry unenumerable to avoid repeats
        Object.defineProperty(dogObject, obj.number, { enumerable: false })
         // pushing the entry to the added array for making the entries enumberable again on reset.
        added.push(obj.number)
        // adding entry to guess button if it doesn't have text yet
        if(guess.textContent === ''){
            guess.innerHTML = obj.breed
            guess.setAttribute('data-breed', obj.breed )
        } 
    })
}
// create event listener for guess buttons that checks if their answer is correct
const checkAnswer = () => {
    const match = (item) => {        
        item.addEventListener('click', () => {
            //  use alt text on image and data attribute on button to determine if user guess is correct
            if(image.alt === item.dataset.breed){
                // Alerts from SweetAlert2
                Swal.fire('Great Job!', 'You are correct.', 'success')
            } else {
                Swal.fire('Nope!', 'Try again.', 'error')
            }              
        })
    }
    guesses.forEach(match)
}

// run functions on initial page load
getImg()
addGuesses()
checkAnswer()

// Create event listener that generates new image and guesses
reset.addEventListener('click', (e) => {
    e.preventDefault()
    // empty the text content on each button
    guesses.forEach(guess => {
        guess.textContent = ''
    })   
    // iterate through added array to make all entries enumerable again
    added.forEach(item => {
        Object.defineProperty(dogObject, item, { enumerable: true })
    })
    // populate image and buttons again
    getImg()
    addGuesses()
})

