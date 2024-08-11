const displayController = (function() {

})();
const gameboardController = (function() {
    const gameboard = [
        [0,0,0], 
        [0,0,0], 
        [0,0,0]
    ];
    const playerMove = (player) => {
        if (gameboardController.activePlayer === player.name) {
            if (validateMove(player.getMove)) {
                const [xCord, yCord] = player.getMove;
                gameboardController.gameboard[xCord][yCord] = player.moveType;
                if (!isWinner(player))
                    return changeTurn();
                else {
                    displayWinScreen(player)
                }
                
            }
            return false;
        }
        return false;
    }
    const validateMove = (move) => {
        let [xCord, yCord] = move;
        if ((xCord > 2 && xCord > 2) || (board[xCord][yCord] !== `0`)) return false;
        return true;
    }
    const changeTurn = () => {
        if (gameboardController.activePlayer === playerOne.name) gameboardController.activePlayer = playerTwo.name;
        else gameboardController.activePlayer = playerOne.name;
    }

    const isWinner = (player) => {
        const marker = player.moveType;
        const board = gameboardController.gameboard;
        console.log("hello from iswinner");
    
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
    
        // diagonal
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
    const displayWinScreen = (player) => {
        console.log(`${player.name} wins!`)
    }
    return {
        playerMove: playerMove,
        validateMove: validateMove, 
        isWinner: isWinner,
        displayWinScreen: displayWinScreen,
        gameboard: gameboard,
        activePlayer: null
    }
})();

const displayUpdate =


createPlayer = (name, moveType="O") => {

    return {
        name: name,
        moveType: moveType,
        getMove: null
    }
}
function resetBoard() {
    gameboardController.gameboard = 
    [[0,0,0], 
    [0,0,0], 
    [0,0,0]];
    gameboardController.activePlayer = null;
}
resetBoard();
const playerOne = createPlayer("John", "X");
const playerTwo = createPlayer("Joe", "O");
gameboardController.activePlayer = playerOne.name;





/*
playerOne.getMove = [1, 0];
gameboardController.playerMove(playerOne);
console.log(gameboardController.gameboard);
console.log(gameboardController.activePlayer);
playerTwo.getMove = [0, 1];
gameboardController.playerMove(playerTwo);
console.log(gameboardController.gameboard);
console.log(gameboardController.activePlayer);
playerOne.getMove = [1, 1];
gameboardController.playerMove(playerOne);
console.log(gameboardController.gameboard);
console.log(gameboardController.activePlayer);
playerTwo.getMove = [0, 2];
gameboardController.playerMove(playerTwo);
console.log(gameboardController.gameboard);
console.log(gameboardController.activePlayer);
playerOne.getMove = [1, 2];
gameboardController.playerMove(playerOne);
console.log(gameboardController.gameboard);
console.log(gameboardController.activePlayer);
*/
