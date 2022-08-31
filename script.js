/**
 * Speed and Accuracy Calculations: https://indiatyping.com/index.php/typing-tips/typing-speed-calculation-formula
 */

//API generating random quotes
const random_text_api = 'https://zenquotes.io/api/random' 
const displayElement = document.getElementById('display')
const inputElement = document.getElementById('enter-text')

//flag = false -> quote not yet displayed
var flag = false

function getText() {
    return fetch(random_text_api)
        .then(response => response.json())
        .then(data => data.q)
}

async function getNext() {
    var text1 = await getText()
    var text2 = await getText()

    if(document.documentElement.clientWidth>800)
        text1 = text1+' '+text2;
    console.log(text1)

    displayElement.innerText = '';
    text1.split('').forEach(character => {
        const character_span = document.createElement('span')
        character_span.innerText = character
        displayElement.appendChild(character_span)
    })
    inputElement.value = null   
    
    if(localStorage.getItem("theme") == "dark")
        displayElement.querySelectorAll('span')[0].style.backgroundColor = '#704b02'
    else
        displayElement.querySelectorAll('span')[0].style.backgroundColor = '#ffac04'
    flag = true
}

getNext()

var x
let current_time = 60
let total_time = current_time
const timer = document.getElementById('seconds')
const dial = document.getElementById('timer')

//function decrements current_time by 1 every 1 second
function updateTimer() {

    if(!flag)
    return

    //console.log('yo')
    timer.innerHTML = `${current_time}`;

    //when time's up disable text area and display result
    if(current_time == 0) {
        inputElement.disabled = true
        clearInterval(x)
        showResult()
    }
    --current_time; 

}

//cursor highlighting next character to be typed
function highlightSpan(position) {

    const text_array = displayElement.querySelectorAll('span')

    var color 
    if(localStorage.getItem("theme") == "dark") {
        displayElement.querySelectorAll('span')[position].style.backgroundColor = '#704b02'
        color = '#181818'
    }
    else {
        displayElement.querySelectorAll('span')[position].style.backgroundColor = '#ffac04'
        color = '#FFFFFF'
    }

    let length = text_array.length

    if(position == 0) {
        text_array[position+1].style.backgroundColor = color
    }
    else if(position == length-1) {
        text_array[position-1].style.backgroundColor = color
    }
    else if(position>0 && position<length-1) {
        text_array[position+1].style.backgroundColor = color
        text_array[position-1].style.backgroundColor = color
    }

}

/**
 * Gross WPM = (Total key strokes/5)/Time
 * 
 * Net WPM = Gross WPM - (Uncorrected Errors)/Time
 */
 let gross_wpm = 0
 let net_wpm = 0
 let keypress = 0
 
 /**
  * Accuracy = (Net WPM)/(Gross WPM)
  */
 let accuracy = 0
 
 /**
  * Error Rate = (Uncorrected Error + Corrected Error)/(Total key strokes)
  */
 let total = 0
 let uncorrected_error = 0
 let total_error = 0
 let counter = 0
 
 let current_span = 0
 let length = 0

inputElement.addEventListener('input', () => { 

    if(!flag)
        return

    //if it is the user's first keystroke, start the timer 
    if(!keypress)
        x = setInterval(updateTimer, 1000)

    //console.log(keypress)

    ++keypress
    counter = 0
    length = 0

    const text_array = displayElement.querySelectorAll('span')
    const array_char = inputElement.value.split('')

    //compare every character of input and display and assign 'correct' and 'incorrect' classes accordingly
    text_array.forEach((character_span, index) => {
                
        const character = array_char[index]

        if(!character) {
            character_span.classList.remove('correct')
            character_span.classList.remove('incorrect')
        }
        else {
            ++length
            if(character == character_span.innerText) {
                character_span.classList.add('correct')
                character_span.classList.remove('incorrect')
            }
            else {
                ++counter
                character_span.classList.remove('correct')
                character_span.classList.add('incorrect')
            }
        }
    })

    //if character just typed isn't correct add to total error
    if((length) && text_array[length-1].innerHTML != array_char[length-1]) {
        // console.log(text_array[length-1].innerHTML)
        // console.log(array_char[length-1])
        ++total_error
    }

    //identify current character
    current_span = length
    if(length != text_array.length)
        highlightSpan(current_span)

    //if time's up stop the timer, calculate result parameters and display the result
    if(current_time == 0) {
        timer.innerHTML = "0"
        clearInterval(x)

        total = total + array_char.length
        inputElement.disabled = true
        gross_wpm = (total/5)/(total_time/60.00)
        uncorrected_error = uncorrected_error + counter
        net_wpm = gross_wpm - (uncorrected_error)/(total_time/60.00)
        accuracy = net_wpm/gross_wpm
        total_error = total_error/keypress

        if(uncorrected_error>0 && accuracy == 1)
            accuracy = 0.9999

        showResult()
    }

    //if quote is finished, count all uncorrected error and move to next quote
    if(length == text_array.length) {
        flag = false
        uncorrected_error = uncorrected_error + counter
        total = total + array_char.length
        getNext() 
    }
    // console.log(text_array[counter-1].innerHTML)
    // console.log(array_char[counter-1])

})

//display the result
function showResult() {

    net_wpm = Math.max(0,Math.floor(net_wpm))
    accuracy = Math.max(0,Math.round(accuracy*1000)/10)
    total_error = Math.round(total_error*1000)/10

    const speed = document.getElementById('final-speed')
    speed.innerHTML = net_wpm
    const acc = document.getElementById('final-accuracy')
    acc.innerHTML = accuracy
    const error = document.getElementById('final-errorrate')
    error.innerHTML = total_error

    console.log(net_wpm)
    console.log(accuracy)
    console.log(total_error)

    const modal = document.getElementById('modal')
    const overlay = document.getElementById('overlay')
    modal.style.visibility = 'visible'
    modal.style.opacity = '1'
    overlay.style.visibility = 'visible'

}

const close = document.getElementById('close-button')

function closeModal() {

    const modal = document.getElementById('modal')
    const overlay = document.getElementById('overlay')
    modal.style.visibility = 'hidden'
    modal.style.opacity = '0'
    overlay.style.visibility = 'hidden'

}

//reset all values
function restart() {
    
    current_time = total_time
    timer.innerText = '60'
    gross_wpm = 0
    net_wpm = 0
    accuracy = 0
    total = 0
    uncorrected_error = 0
    total_error = 0
    counter = 0
    keypress = 0
    inputElement.disabled = false
    clearInterval(x)
    getNext()    

}







