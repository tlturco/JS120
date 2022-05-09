let readline = require("readline-sync");


class Square {
  static UNUSED_SQUARE = " ";
  static HUMAN_MARKER = "X";
  static COMPUTER_MARKER = "O";


  constructor(marker = Square.UNUSED_SQUARE) {
    this.marker = marker;
  }

  getMarker() {
    return this.marker;
  }

  setMarker(marker) {
    this.marker = marker;
  }

  isUnused() {
    return this.marker === Square.UNUSED_SQUARE;
  }
  //update the default toString method
  //so the marker will display correctly
  toString() {
    return `${this.marker}`;
  }
}


class Board {
  constructor() {
    this.reset();
  }
  reset() {
    //create the squares object
    this.squares = {};
    //keys are strings 1-9
    for (let counter = 1; counter <= 9; counter++) {
      this.squares[String(counter)] = new Square();
    }
  }

  display() {
    console.log("");
    console.log("     |     |");
    console.log(`  ${this.squares["1"]}  |  ${this.squares["2"]}  |  ${this.squares["3"]}`);
    console.log("     |     |");
    console.log("-----|-----|-----");
    console.log("     |     |");
    console.log(`  ${this.squares["4"]}  |  ${this.squares["5"]}  |  ${this.squares["6"]}`);
    console.log("     |     |");
    console.log("-----|-----|-----");
    console.log("     |     |");
    console.log(`  ${this.squares["7"]}  |  ${this.squares["8"]}  |  ${this.squares["9"]}`);
    console.log("     |     |");
    console.log("");
  }

  displayWithClear() {
    console.clear();
    console.log("");
    console.log("");
    this.display();
  }

  markSquareAt(key, marker) {
    this.squares[key].setMarker(marker);
  }

  unusedSqares() {
    let keys = Object.keys(this.squares);
    return keys.filter(key => this.squares[key].isUnused());
  }

  isFull() {
    return this.unusedSqares().length === 0;
  }

  countMarkersFor(player, keys) {
    let markers = keys.filter( key => {
      return this.squares[key].getMarker() === player.getMarker();
    });

    return markers.length;
  }
}

class Player {

  constructor(marker) {
    this.marker = marker;
  }
  getMarker() {
    return this.marker;
  }

}

class Human extends Player {
  constructor() {
    super(Square.HUMAN_MARKER);
  }
}

class Computer extends Player {
  constructor() {
    super(Square.COMPUTER_MARKER);
  }
}

class TTTGame {
  static POSSIBLE_WINNING_ROWS = [
    [ "1", "2", "3" ],            // top row of board
    [ "4", "5", "6" ],            // center row of board
    [ "7", "8", "9" ],            // bottom row of board
    [ "1", "4", "7" ],            // left column of board
    [ "2", "5", "8" ],            // middle column of board
    [ "3", "6", "9" ],            // right column of board
    [ "1", "5", "9" ],            // diagonal: top-left to bottom-right
    [ "3", "5", "7" ],            // diagonal: bottom-left to top-right
  ];

  constructor() {
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();

    this.firstPlayer = this.human;
    this.score = {human: 0, computer: 0, tie: 0};
  }

  play() {
    this.displayWelcomeMessage();
    while (true) {
      this.playOneGame();
      if (this.someoneWonMatch()) {
        this.displayMatchWinner();
        break;
      } else if (this.playAgain() === false) break;

      console.log("Let's play again!");
      this.firstPlayer = this.togglePlayer(this.firstPlayer);
    }
    this.displayGoodbyeMessage();
  }

  playOneGame() {
    this.board.reset();
    this.board.display();

    let currentPlayer = this.firstPlayer;
    while (true) {

      this.playerMoves(currentPlayer);
      if (this.gameOver()) break;

      this.board.displayWithClear();
      currentPlayer = this.togglePlayer(currentPlayer);
    }

    this.board.displayWithClear();
    this.displayResults();
    this.keepScore();
    this.displayScore();
  }

  displayWelcomeMessage() {
    console.clear();
    console.log("Welcome to Tic Tac Toe!");
    console.log("");
  }

  displayGoodbyeMessage() {
    console.log("Thanks for playing Tic Tac Toe! Goodbye!");
  }

  displayResults() {
    if (this.isWinner(this.human)) {
      console.log("You won! Congratulations!");
    } else if (this.isWinner(this.computer)) {
      console.log("I won! I won! Take that, human!");
    } else {
      console.log("A tie game. How boring.");
    }
  }

  keepScore() {
    if (this.isWinner(this.human)) {
      this.score.human += 1;
    } else if (this.isWinner(this.computer)) {
      this.score.computer += 1;
    } else {
      this.score.tie += 1;
    }
  }

  someoneWonMatch() {
    return this.score.human === 3 || this.score.computer === 3;
  }

  displayMatchWinner() {
    console.log('Best of 3 games!');
    if (this.score.human === 3) {
      console.log("Congratulations, you won the match!");
    } else {
      console.log('VICTORY IS MINE. Rise of the machines.');
    }
  }

  displayScore() {
    console.log("Score of the game:");
    console.log(this.score);
  }

  isWinner(player) {
    //Iterates through the winning combos
    //& counts the number of markers a player has
    //if a player has 3 markers in a winning combo, they have won the game
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkersFor(player, row) === 3;
    });
  }

  playerMoves(player) {
    if (player === this.human) {
      this.humanMoves();
    } else if (player === this.computer) {
      this.computerMoves();
    }
  }

  humanMoves() {
    let choice;

    while (true) {
      let validChoices = this.board.unusedSqares();
      choice = readline.question(`Choose a square (${TTTGame.joinOr(validChoices)}): `).trim();
      if (validChoices.includes(choice)) break;

      console.log("Sorry, that's not a valid choice.");
      console.log("");
    }

    this.board.markSquareAt(choice, this.human.getMarker());
  }

  computerMoves() {
    let choice = this.offensiveComputerMove() //pick the winning square if available
    || this.defensiveComputerMove() //block the opponent from winning
    || this.defaultComputerMove() //pick the center square
    || this.randomComputerMove(); //if no strategic moves are available, pick randomly

    this.board.markSquareAt(choice, this.computer.getMarker());
  }

  offensiveComputerMove() {
    let winningRow = TTTGame.POSSIBLE_WINNING_ROWS.filter(row => {
      return this.board.countMarkersFor(this.computer, row) === 2;
    }).flat();

    let validChoices = this.board.unusedSqares();

    for (let i = 0; i < winningRow.length; i++) {
      if (validChoices.includes(winningRow[i])) {
        return winningRow[i];
      }
    }
    return null;
  }

  defensiveComputerMove() {
    let rowInDanger = TTTGame.POSSIBLE_WINNING_ROWS.filter(row => {
      return this.board.countMarkersFor(this.human, row) === 2;
    }).flat();
    let validChoices = this.board.unusedSqares();

    for (let i = 0; i < rowInDanger.length; i++) {
      if (validChoices.includes(rowInDanger[i])) {
        return rowInDanger[i];
      }
    }
    return null;
  }

  defaultComputerMove() {
    let validChoices = this.board.unusedSqares();
    if (validChoices.includes('5')) {
      return 5;
    } else return null;
  }
  randomComputerMove() {
    let validChoices = this.board.unusedSqares();
    let choice;
    do {
      choice = Math.floor((Math.random() * 9) + 1).toString();
    } while (!validChoices.includes(choice));

    return choice;
  }

  gameOver() {
    return this.board.isFull() || this.someoneWon();
  }

  someoneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  }

  togglePlayer(currentPlayer) {
    if (currentPlayer === this.human) {
      return this.computer;
    } else if (currentPlayer === this.computer) {
      return this.human;
    }
  }

  playAgain() {
    let answer;

    while (true) {
      let validAnswers = ['y', 'n', 'yes', 'no'];
      answer = readline.question("Would you like to play again? ").trim().toLowerCase();
      if (validAnswers.includes(answer)) break;

      console.log("Sorry that's not a valid choice. Please answer yes or no.");
      console.log("");
    }

    return answer[0] === 'y';
  }

  static joinOr(choices, punctuation = ', ', conjunction = 'or') {
    if (choices.length === 1) {
      return choices[0].toString();
    }  else if (choices.length === 2) {
      return `${choices[0]} ${conjunction} ${choices[1]}`;
    } else {
      let lastChoice = choices[choices.length - 1];
      let result = choices.slice(0, -1).join(punctuation);
      return `${result}${punctuation} ${conjunction} ${lastChoice}`;
    }
  }

}

let game = new TTTGame();
game.play();

