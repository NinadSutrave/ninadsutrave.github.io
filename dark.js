if(localStorage.getItem("theme") == "dark") {
    console.log("Dark before reload")
    toDark()
}

function switchMode() {

    if(page.style.backgroundColor == 'rgb(24, 24, 24)') {
        toLight()       
    }
    else {
        toDark()
    }
}

function toLight() {
    localStorage.setItem("theme","light")
    console.log('light')
    document.getElementById('page').style.backgroundColor = "#FFFFFF"
    document.getElementById('timer').style.backgroundColor = "#FFFFFF"
    document.getElementById('restart').style.backgroundColor = "#FFFFFF"
    document.getElementById('modal').style.backgroundColor = "#FFFFFF"
    document.getElementById('close-button').style.backgroundColor = "#FFFFFF"
    document.getElementById('close-button').style.color = "#000000"
    document.getElementById('display').style.backgroundColor = "#FFFFFF"
    document.getElementById('display').style.color = "#000000"
    document.getElementById('enter-text').style.backgroundColor = "#FFFFFF" 
    document.getElementById('enter-text').style.color = "#000000"


    const array = displayElement.querySelectorAll('span') 
    array.forEach((span) => {
        if(span.style.backgroundColor == "#704b02")
            span.style.backgroundColor = "#ffac04"
        else 
            span.style.backgroundColor = "#FFFFFF"                
    })
}

function toDark() {
    localStorage.setItem("theme","dark")
    console.log('dark')
    document.getElementById('page').style.backgroundColor = "#181818"
    document.getElementById('timer').style.backgroundColor = "#181818"
    document.getElementById('restart').style.backgroundColor = "#181818"
    document.getElementById('modal').style.backgroundColor = "#181818"
    document.getElementById('close-button').style.backgroundColor = "#181818"
    document.getElementById('close-button').style.color = "#FFFFFF"
    document.getElementById('display').style.backgroundColor = "#181818"
    document.getElementById('display').style.color = "#FFFFFF"
    document.getElementById('enter-text').style.backgroundColor = "#181818"
    document.getElementById('enter-text').style.color = "#FFFFFF"

    const array = displayElement.querySelectorAll('span') 
    array.forEach((span) => {
        if(span.style.backgroundColor == "#ffac04")
            span.style.backgroundColor = "#704b02"
        else
            span.style.backgroundColor = "#181818"                
    })
}