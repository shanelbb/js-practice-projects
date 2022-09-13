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

const added = []

// generate random image

const getImg = () => {
    const num = Math.ceil(Math.random() * 12)
    image.src = `img/dog${num}.jpeg`
    const key = `dog${num}`
    const random = Math.ceil(Math.random() * 4)
    const answer = document.getElementById(`guess${random}`)
    const breed = dogObject[key].breed
    answer.innerHTML = breed
    image.alt = breed
    answer.setAttribute('data-breed', breed)
    Object.defineProperty(dogObject, key, { enumerable: false })
    added.push(key)
}
// populate the guesses buttons with breed name

const getObj =  (object) => {
    const values = Object.entries(object)
    return values[Math.floor(Math.random() * values.length)][1]
}

const addGuesses = () => { 
    
    guesses.forEach(guess => {
        let obj = getObj(dogObject) 
        Object.defineProperty(dogObject, obj.number, { enumerable: false })
        added.push(obj.number)
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
            
            if(image.alt === item.dataset.breed){
                Swal.fire('Great Job!', 'You are correct.', 'success')
            } else {
                Swal.fire('Nope!', 'Try again.', 'error')
            }              
        })
    }
    guesses.forEach(match)
}

getImg()
addGuesses()
checkAnswer()

// Create event listener that generates new image and guesses
reset.addEventListener('click', (e) => {
    e.preventDefault()
    guesses.forEach(guess => {
        guess.textContent = ''
    })   
    added.forEach(item => {
        Object.defineProperty(dogObject, item, { enumerable: true })
    })
    getImg()
    addGuesses()
})

