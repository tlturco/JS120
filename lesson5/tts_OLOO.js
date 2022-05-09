let readline = require("readline-sync");

let Square = {
  UNUSED_SQUARE:   " ",
  HUMAN_MARKER:    "X",
  COMPUTER_MARKER: "O",

  init(marker = Square.UNUSED_SQUARE) {
    this.marker = marker;
    return this;
  },

  toString() {
    return this.marker;
  },

  setMarker(marker) {
    this.marker = marker;
  },

  isUnused() {
    return this.marker === Square.UNUSED_SQUARE;
  },

  getMarker() {
    return this.marker;
  },

};

let Board = {
  init() {
    //create the squares object
    this.squares = {};
    //keys are strings 1-9
    for (let counter = 1; counter <= 9; counter++) {
      this.squares[String(counter)] = Object.create(Square).init();
    }
    return this;
  },

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
  },

  displayWithClear() {
    console.clear();
    console.log("");
    console.log("");
    this.display();
  },

  markSquareAt(key, marker) {
    this.squares[key].setMarker(marker);
  },

  unusedSqares() {
    let keys = Object.keys(this.squares);
    return keys.filter(key => this.squares[key].isUnused());
  },

  isFull() {
    return this.unusedSqares().length === 0;
  },

  countMarkersFor(player, keys) {
    let markers = keys.filter( key => {
      return this.squares[key].getMarker() === player.getMarker();
    });

    return markers.length;
  },
};

const PlayerPrototype = {
  initalize(marker) {
    this.marker = marker;
    return this;
  },

  getMarker() {
    return this.marker;
  }

};

let Human = Object.create(PlayerPrototype);

Human.init = function() {
  return this.initalize(Square.HUMAN_MARKER);
};

let Computer = Object.create(PlayerPrototype);

Computer.init = function() {
  return this.initalize(Square.COMPUTER_MARKER);
};


let TTTGame = {
  POSSIBLE_WINNING_ROWS : [
    [ "1", "2", "3" ],            // top row of board
    [ "4", "5", "6" ],            // center row of board
    [ "7", "8", "9" ],            // bottom row of board
    [ "1", "4", "7" ],            // left column of board
    [ "2", "5", "8" ],            // middle column of board
    [ "3", "6", "9" ],            // right column of board
    [ "1", "5", "9" ],            // diagonal: top-left to bottom-right
    [ "3", "5", "7" ],            // diagonal: bottom-left to top-right
  ],

  init() {
    this.board = Object.create(Board).init();
    this.human = Object.create(Human).init();
    this.computer = Object.create(Computer).init();
    return this;
  },

  play() {
    this.displayWelcomeMessage();
    this.board.display();

    while (true) {

      this.humanMoves();
      if (this.gameOver()) break;


      this.computerMoves();
      if (this.gameOver()) break;

      this.board.displayWithClear();
    }

    this.board.displayWithClear();
    this.displayResults();
    this.displayGoodbyeMessage();
  },

  displayWelcomeMessage() {
    console.clear();
    console.log("Welcome to Tic Tac Toe!");
    console.log("");
  },

  displayGoodbyeMessage() {
    console.log("Thanks for playing Tic Tac Toe! Goodbye!");
  },

  displayResults() {
    if (this.isWinner(this.human)) {
      console.log("You won! Congratulations!");
    } else if (this.isWinner(this.computer)) {
      console.log("I won! I won! Take that, human!");
    } else {
      console.log("A tie game. How boring.");
    }
  },

  isWinner(player) {
    //Iterates through the winning combos
    //& counts the number of markers a player has
    //if a player has 3 markers in a winning combo, they have won the game
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkersFor(player, row) === 3;
    });
  },


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
  },

  computerMoves() {
    let validChoices = this.board.unusedSqares();
    let choice;
    do {
      choice = Math.floor((Math.random() * 9) + 1).toString();
    } while (!validChoices.includes(choice));

    this.board.markSquareAt(choice, this.computer.getMarker());
  },

  gameOver() {
    return this.board.isFull() || this.someoneWon();
  },

  someoneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  },

  joinOr(arr, punctuation = ', ', conjunction = 'or') {
    let copy = arr.slice();
    let last = copy.pop();

    return copy.join(punctuation) + ` ${punctuation}${conjunction} ${last}`;

  }

};


let game = Object.create(TTTGame).init();
console.log(game);
game.play();