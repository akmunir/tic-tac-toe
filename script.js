const container = document.querySelector(".game-container");
const dialog = document.querySelector("dialog");
const players = document.querySelectorAll(".name");
Player = (name, moveType="O") => {

    return {
        name: name,
        moveType: moveType,
        move: null
    }
}
const gameboardController = (function() {
    const gameboard = [
        [0,0,0], 
        [0,0,0], 
        [0,0,0]
    ];
    const playerOne = Player("John", "X");
    const playerTwo = Player("Joe", "O");
    const boardSize = 3;
    let activePlayer = playerOne;
    let gameState = "not active";
    const playerMove = (player) => {
        if (activePlayer === player) {
            if (validateMove(player.move)) {
                const [xCord, yCord] = player.move;
                gameboard[xCord][yCord] = activePlayer.moveType; 
                return true;
            }
            console.log("not validated");
            return false;
        }
        console.log("not active");
        return false;
    }
    const validateMove = (move) => {
        let [xCord, yCord] = move;
        if ((xCord > 2 && xCord > 2) || (gameboard[xCord][yCord] !== 0)) return false;
        return true;
    }
    const changeTurn = () => {
        if (activePlayer === playerOne) {
            activePlayer = playerTwo;
            players[0].classList.remove("current-player");
            players[1].classList.add("current-player");
        }
        else {
            activePlayer = playerOne;
            players[1].classList.remove("current-player");
            players[0].classList.add("current-player");
        }
    }

    const isWinner = () => {
        const marker = activePlayer.moveType;
        const board = gameboard;
    
        //  row
        for (let i = 0; i < board.length; i++) {
            let counter = 0;
            for (let j = 0; j < board[0].length; j++) {
                if (board[i][j] === marker) counter++;
            }
            if (counter === 3) {
                console.log("hello from row");
                return true;
            }
        }
    
        //  column
        for (let i = 0; i < board.length; i++) {
            let counter = 0;
            for (let j = 0; j < board[0].length; j++) {
                if (board[j][i] === marker) counter++;
            }
            if (counter === 3) {
                console.log("hello from col");
                return true;
            }
        }
    
        // diagonals
        let counter = 0;
        for (let i = 0; i < board.length; i++) {
            if (board[i][i] === marker) counter++;
        }
        if (counter === 3) {
            console.log("hello from diag");
            return true;
        }
    
        counter = 0;
        for (let i = 0; i < board.length; i++) {
            if (board[i][board.length - 1 - i] === marker) counter++;
        }
        if (counter === 3) {
            console.log("hello from diag");
            return true;
        }
        return false;
    }

    const isFull = () => { return !gameboard.flat().includes(0); }

    const displayWinScreen = (player) => {
        dialog.innerHTML =`<p>${activePlayer.name} Wins!</p>`;
        dialog.showModal();
        console.log("win")
    }
    const playGame = () => {
        container.addEventListener("click", (event) => {
            const winText = document.querySelector("dialog p")
           if (event.target.classList.contains("grid-square")) {
                const row = Number(event.target.parentNode.classList[1]);
                const col = Number(event.target.classList[1]);
                activePlayer.move = [row, col];
                
                if (playerMove(activePlayer)) {
                    const gridSquareSpan = document.createElement("span");
                    gridSquareSpan.style.opacity = 1;
                    gridSquareSpan.innerText = activePlayer.moveType;
                    event.target.appendChild(gridSquareSpan);
                    if(isWinner()) {
                        gameboardController.gameState = "won";
                        console.log("inside iswinner");
                        winText.innerText =`${activePlayer.name} Wins!`;
                        dialog.showModal();
                        return;
                    } else if(isFull()) {
                        winText.innerText = "It is a Draw!";
                        dialog.showModal();
                        return;
                    }
                    
                    console.log(gameboardController.gameboard);
                    changeTurn();
                }
           }
        });
    }
    return {
        playGame: playGame,
        boardSize: boardSize,
        gameboard: gameboard,
        activePlayer: null
    }
})();

function initializeBoard() {
    gameboardController.gameboard = 
    [[0,0,0], 
    [0,0,0], 
    [0,0,0]];
    gameboardController.activePlayer = null;
        for (let i = 0; i < gameboardController.boardSize; i++) {
            const row = document.createElement("div");
            row.classList.add("row");
            row.classList.add(i);
            container.appendChild(row);
            for (let j = 0; j < gameboardController.boardSize; j++) {
                const gridSquare = document.createElement("div");
                gridSquare.classList.add("grid-square");
                gridSquare.classList.add(j);
                row.appendChild(gridSquare);
            }
        }
    gameboardController.gameState = "ongoing";
}

function resetBoard() {
    gameboardController.gameboard =  gameboardController.gameboard = 
    [[0,0,0], 
    [0,0,0], 
    [0,0,0]];
}
initializeBoard();
gameboardController.playGame();





/*
playerOne.move = [1, 0];
gameboardController.playerMove(playerOne);
console.log(gameboardController.gameboard);
console.log(gameboardController.activePlayer);
playerTwo.move = [0, 1];
gameboardController.playerMove(playerTwo);
console.log(gameboardController.gameboard);
console.log(gameboardController.activePlayer);
playerOne.move = [1, 1];
gameboardController.playerMove(playerOne);
console.log(gameboardController.gameboard);
console.log(gameboardController.activePlayer);
playerTwo.move = [0, 2];
gameboardController.playerMove(playerTwo);
console.log(gameboardController.gameboard);
console.log(gameboardController.activePlayer);
playerOne.move = [1, 2];
gameboardController.playerMove(playerOne);
console.log(gameboardController.gameboard);
console.log(gameboardController.activePlayer);
*/
