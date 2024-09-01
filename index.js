const XSvg = `<svg class='x-svg' viewBox="0 0 8 8" id="meteor-icon-kit__regular-times-xxs" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4 2.5858L6.2392 0.34666C6.5646 0.02123 7.145 0.07399 7.5355 0.46451C7.9261 0.85504 7.9788 1.43544 7.6534 1.76088L5.4142 4L7.6534 6.2392C7.9788 6.5647 7.9261 7.1451 7.5355 7.5356C7.145 7.9261 6.5646 7.9789 6.2392 7.6534L4 5.4143L1.76083 7.6534C1.43539 7.9789 0.85499 7.9261 0.46447 7.5356C0.07394 7.1451 0.02118 6.5647 0.34661 6.2392L2.5858 4L0.34661 1.76088C0.02118 1.43544 0.07394 0.85504 0.46447 0.46451C0.85499 0.07399 1.43539 0.02123 1.76083 0.34666L4 2.5858z" fill="#758CA3"/></svg>`

const OSvg = `<svg class='o-svg'viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"/>
    </svg>`

let isGameActive = true
let player = [XSvg, OSvg]
let currentPlayer = player[Math.floor(Math.random() * player.length)] //SELECTING A RANDOM PLAYER

const cells = document.querySelectorAll('.cell')
let board = ['', '', '', '', '', '', '', '', ''] //9 ELEMENTS REPESENTING EACH CELLS

function makeMove(cell) {
    const index = Array.from(cells).indexOf(cell)

    if (!isGameActive || board[index]) {
        return
    }
    board[index] = currentPlayer
    cell.innerHTML = currentPlayer

    checkWin()

    if (currentPlayer === XSvg) {
        currentPlayer = OSvg
    }else{
        currentPlayer = XSvg
    }
}

function checkWin() {
    const winPattern = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ] //EACH PATTERN IS A WINNING PATTERN


    winPattern.forEach(pattern => {
        const a = pattern[0]
        const b = pattern[1]
        const c = pattern[2]

        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            isGameActive = false
            document.querySelector('.game-information').classList.add('show')
            document.querySelector('.game-information p').innerHTML = `Player ${currentPlayer == XSvg ? 'X' : 'O'} Wins`
            return
        }
    })

    if (!board.includes('')) {
        document.querySelector('.game-information').classList.add('show')
        document.querySelector('.game-information p').innerHTML = 'Draw'
        return
    }
}

function reset() {
    board = ['', '', '', '', '', '', '', '', '']
    currentPlayer = player[Math.floor(Math.random() * player.length)]
    isGameActive = true
    cells.forEach(cell => cell.innerHTML = '')
    document.querySelector('.game-information').classList.remove('show')
}