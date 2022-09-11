const game = () => {
    // select elements
    const rgbVal = document.querySelector('h2')
    const reset = document.getElementById('reset')
    const colors = document.querySelectorAll('.btn')
    
    // generate random rgb value
    const rgb = () => {
        const r = Math.floor(Math.random() * 255)
        const g = Math.floor(Math.random() * 255)
        const b = Math.floor(Math.random() * 255)
        
        return `rgb(${r},${g},${b})`
    }
    
    // set the colors of the buttons
    const setColors = () => {
        // Loop through each button and set it at a random color by running the rgb function.
        colors.forEach(color => {
            const button = document.getElementById(`${color.id}`)
            button.style.backgroundColor = rgb()
        })
        
        // Choose one of the button colors randomly to populate in the h2.
        const random = Math.floor(Math.random() * 6)
        const text = colors[random].style.backgroundColor
        // change the rgb to RGB
        rgbVal.innerHTML = text.toUpperCase();
    } 
    
    // Function for user to guess a color by pressing one of the buttons. 
    function guess() {
        // loop through each button and run match function
        colors.forEach(match)
    
        function match(item) {
            // when a button is pressed check if the bg color matches the color displayed in the h2. Set success or error message using SweetAlert2.
            item.addEventListener('click', () => {
                if(item.style.backgroundColor === rgbVal.innerText.toLowerCase()){
                    Swal.fire('Great Job!', 'You are correct.', 'success')
                }else {
                    Swal.fire('Nope!', 'Try again.', 'error')
                } 
            })
        }
    }
    
    // automatically set button color upon page load
    setColors()
    // trigger the event listener by calling guess function
    guess()
    
    // generate a new set of random colors when reset button is clicked. 
    reset.addEventListener('click', () => {
        setColors()
    })

}

game()
