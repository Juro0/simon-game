
const colors = [1, 2, 3, 4]
const colDict = {1:'a', 2:'b', 3:'c', 4:'d'}
const level = document.getElementsByClassName('level')[0]
const output = document.getElementById('debug-output')

// AUDIOS
const green = document.getElementById('green')
const red = document.getElementById('red')
const yellow = document.getElementById('yellow')
const blue = document.getElementById('blue')
const error = document.getElementById('error')
const intro = document.getElementById('intro')

// DEBUG MODE
// for debug (and playful) reason, setting the variable to true
// you can have access to a little window clicking the backquote button
// that allows you to easily have information such as the correct combination
// or reset some functions

const debugMode = false

let time = 0
let turn = 0
let combinations = [1, 2, 3, 4, 3, 2]
let firstTime = true

let click = id => {
    startAudio(id)
    if(id==combinations[time]){
        time++
    } else {
        endGame()
    }
    if(time>combinations.length-1){
        startGame()
    }
}

let resetAllAudio = () => {
    const audios = [green, red, yellow, blue, error, intro]
    for(const audio of audios){
        audio.pause();
        audio.currentTime = 0;
    }
}

let startAudio = id => {
    resetAllAudio()
    if(id==1){
        green.volume = 0.3
        green.play()
    }
    if(id==2){
        red.volume = 0.3
        red.play()
    }
    if(id==3){
        yellow.volume = 0.3
        yellow.play()
    }
    if(id==4){
        blue.volume = 0.3
        blue.play()
    }
    if(id==5){
        error.volume = 0.4
        error.play()
    }
    if(id==0){
        intro.volume = 1
        intro.play()
    }
}

let addListener = () => {
    for(let id of colors){
        document.getElementById(colDict[id]).addEventListener('click', ()=>{
            document.getElementById(colDict[id]).classList.add('press')
            setTimeout(()=>{
                document.getElementById(colDict[id]).classList.remove('press')
            }, 200)
            click(id)
        })
    }
}
let removeListener = () => {
    for(let id of colors){
        $(`#${colDict[id]}`).replaceWith($(`#${colDict[id]}`).clone());
    }
}

let resetAll = () => {
    for(let id of colors){
        document.getElementById(colDict[id]).classList.remove('clicked')
    }
}

let newMove = () => {
    combinations.push(colors[Math.floor(Math.random()*colors.length)])
}

let showMoves = (intro = false) => {
    removeListener()

    let timeSleep = 0
    for(let i in combinations){
        timeSleep = (parseInt(i)+1)*600
        setTimeout(()=>{
            resetAll()
            document.getElementById(colDict[combinations[i]]).classList.add('clicked')
            if(!intro){
                startAudio(combinations[i])
            }
        }, timeSleep)
    }

    setTimeout(()=>{
        resetAll()
        addListener()
        if(intro){
            combinations = []
            startGame()
        }
    },timeSleep+600)
}

let addRegame = () => {
    document.addEventListener('click', ()=>{
        location.reload()
    })
}

let endGame = () => {
    removeListener()
    time = 0
    turn = 0
    startAudio(5)
    level.innerHTML = 'you lose... click for regame!'
    setTimeout(()=>{
        addRegame()
    }, 500)
}

let startGame = () => {
    time = 0
    turn++
    level.innerHTML = `turn ${turn}`
    newMove()
    showMoves()
}

let startIntro = () => {
    startAudio(0)
    level.innerHTML = '🎵🎵🎵'
    showMoves(true)
}

let debug = code => {
    switch(code){
        case 1:
            output.innerHTML = `[${combinations}]`
            break;
        case 2:
            output.innerHTML = combinations[time]
            break;
        case 3:
            newMove()
            output.innerHTML = `added the move ${combinations[combinations.length-1]}.`
            break;
        case 4:
            output.innerHTML = 'showing moves...'
            showMoves()
            break;
        case 5:
            output.innerHTML = 'moves resetted'
            combinations = []
            startGame()
            break;
        case 6:
            output.innerHTML = 'turn resetted'
            turn = 0
            level.innerHTML = `turno numero ${turn};`
            break;
    }
}

// ON DOCUMENT READY
document.addEventListener("click", () => {
    if(firstTime){
        startIntro()
        firstTime = false
    }
});

// ON KEY EVENT
document.addEventListener('keydown', event => {
    if(debugMode){
        if(event.code=='Backquote'){
            document.getElementsByClassName('debug-win')[0].classList.toggle('debug-on')
        }
    }
});

// ON CLICK EVENT
for(let btn of document.getElementsByClassName('debug-btn')){
    btn.addEventListener('click', ()=>{
        debug(parseInt(btn.id))
        console.debug(`[DEBUG WINDOW] ${btn.id}`)
    })
}

// STARTED ON 01/12/2022
// ULTIMATED ON 01/13/2023
