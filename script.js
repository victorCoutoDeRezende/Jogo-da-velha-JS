const boardRegions = document.querySelectorAll('#gameBoard span')
let virtualBoard = []
let turnPlayer = ''

function updateTitle(){
    const playerInput = document.getElementById(turnPlayer)
    document.getElementById('turnPlayer').innerText = playerInput.value
}

function initializeGame(){
    virtualBoard = [['', '', ''],
                    ['', '', ''],
                    ['', '', '']]
    turnPlayer = 'player1'
    document.querySelector('h2').innerHTML = 'Vez de: <span id="turnPlayer"></span>'
    updateTitle()
    boardRegions.forEach((element)=>{
        element.classList.remove('win')
        element.innerText = ''
        element.classList.add('cursor-pointer')
        element.addEventListener('click', handleBoardClick)
    })
}

function getWinRegions(){
    const winRegions = []
    const checkWin = (r1, c1, r2, c2, r3, c3)=>{
        if(virtualBoard[r1][c1] && virtualBoard[r1][c1] === virtualBoard[r2][c2] && virtualBoard[r1][c1] === virtualBoard[r3][c3]){
            winRegions.push(`${r1}.${c1}`, `${r2}.${c2}`, `${r3}.${c3}`);
        }
    }

    for(let i = 0; i < 3; i++){
        checkWin(i, 0, i, 1, i, 2); // Verifica vitória horizontal
        checkWin(0, i, 1, i, 2, i); // Cerifica vitória vertical
    }

    checkWin(0, 0, 1, 1, 2, 2); // Verifica vitória diagonal
    checkWin(0, 2, 1, 1, 2, 0); // Verifica vitória diagonal

    return winRegions;
}


function disableRegion(element){
    element.classList.remove('cursor-pointer')
    element.removeEventListener('click', handleBoardClick)
}

function handleWin(regions){
    regions.forEach((region)=>{
        document.querySelector('[data-region="' + region + '"]').classList.add('win')
    })
    const playerName = document.getElementById(turnPlayer).value
    document.querySelector('h2').innerHTML = playerName + ' venceu!'
}

function handleBoardClick(event){
    if (document.querySelector('h2').innerHTML.includes('venceu') || document.querySelector('h2').innerHTML.includes('Empate')) {
        return; // Retorna se o jogo já terminou
    }
    const span = event.currentTarget
    const region = span.dataset.region //n.n
    const rowColumnPair = region.split('.')  //['n', 'n']
    const row = rowColumnPair[0]
    const column = rowColumnPair[1]
    if(turnPlayer === 'player1'){
        span.innerText = 'X'
        virtualBoard[row][column] = 'X'
    }
    else{
        span.innerText = 'O'
        virtualBoard[row][column] = 'O'
    }
    disableRegion(span)
    const winRegions = getWinRegions()
    if(winRegions.length > 0){
        handleWin(winRegions)
    }
    else if(virtualBoard.flat().includes('')){
        turnPlayer = turnPlayer === 'player1' ? 'player2' : 'player1'
        updateTitle()
    }
    else{
        document.querySelector('h2').innerHTML = 'Empate!'
    }
}

document.getElementById('start').addEventListener('click', initializeGame)

const main = document.querySelector('main')
const root = document.querySelector(':root')
document.getElementById('themeSwitcher').addEventListener('click', ()=>{
    if(main.dataset.theme === 'dark'){
        root.style.setProperty('--bg-color', '#EEEEEE')
        root.style.setProperty('--border-color', '#393E46')
        root.style.setProperty('--font-color', '#212529')
        root.style.setProperty('--primary-color', '#008eb5')
        main.dataset.theme = 'light'
    }
    else{
        root.style.setProperty('--bg-color', '#222831')
        root.style.setProperty('--border-color', '#393E46')
        root.style.setProperty('--font-color', '#EEEEEE')
        root.style.setProperty('--primary-color', '#00ADB5')
        main.dataset.theme = 'dark'
    }
})