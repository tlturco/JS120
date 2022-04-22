/* eslint-disable max-lines-per-function */
/* eslint-disable complexity */
let readline = require('readline-sync');

const winningMoves = {
  rock: ['scissors', 'lizard'],
  paper: ['rock', 'spock'],
  scissors: ['paper', 'lizard'],
  spock: ['scissors', 'rock'],
  lizard: ['paper', 'spock']
};


function wait(ms) {
  let currentTime = new Date().getTime();
  let end = currentTime + ms;
  while (currentTime < end) {
    currentTime = new Date().getTime();
  }
}

function addVerticalSpace(num = 1) {
  for (let count = 1; count <= num; count++) {
    console.log('');
  }
}

const RPSGame = {
  human: createHuman(),
  computer: createComputer(),
  turnNumber: 1,


  displayWelcomeMessage() {
    console.log('\x1b[35mWelcome to RPSSL!\x1b[0m');
    wait(1000);
    addVerticalSpace(2);
  },

  // eslint-disable-next-line max-statements
  displayRules() {
    console.log("Would you like to see a list of the rules? (y/n)");
    let answer = readline.question();
    if (answer.toLowerCase()[0] === 'y') {
      addVerticalSpace(3);
      console.log('\x1b[36m### RULES ###');
      wait(1000);
      console.log('You can pick from 5 options: rock, paper, scissors, spock or lizard');
      wait(2000);
      addVerticalSpace();
      console.log(`Scissors cuts Paper`);
      wait(1000);
      addVerticalSpace();
      console.log(`Paper covers Rock`);
      wait(2000);
      addVerticalSpace();
      console.log(`Rock crushes Lizard`);
      wait(2000);
      addVerticalSpace();
      console.log(`Lizard poisons Spock`);
      wait(2000);
      addVerticalSpace();
      console.log(`Spock smashes Scissors`);
      wait(2000);
      addVerticalSpace();
      console.log(`Scissors decapitates Lizard`);
      wait(2000);
      addVerticalSpace();
      console.log(`Lizard eats Paper`);
      wait(2000);
      addVerticalSpace();
      console.log(`Paper disproves Spock`);
      wait(2000);
      addVerticalSpace();
      console.log(`Spock vaporizes Rock`);
      wait(2000);
      addVerticalSpace();
      console.log(`Rock crushes Scissors\x1b[0m`);
      wait(2000);
      addVerticalSpace();
      console.log('Press Enter to continue.');
      readline.question();
    }
  },

  displayGoodbyeMessage() {
    console.log('\x1b[35mThanks for playing RPSSL. Goodbye!\x1b[0m');
  },

  displayHistory() {
    console.log("Would you like to see a history of moves? (y/n)");
    let answer = readline.question();
    if (answer.toLowerCase()[0] === 'y') {
      console.log('\x1b[36m'); 
      console.log('### MOVES HISTORY ###');

      console.log('YOUR MOVES:');
      for (let move in this.human.moves) {
        console.log(`Turn ${move}: ${this.human.moves[move]}`);
      }

      console.log("COMPUTER'S MOVES:");
      for (let move in this.computer.moves) {
        console.log(`Turn ${move}: ${this.computer.moves[move]}`);
      }
      console.log('\x1b[0m');
      wait(2000);
      addVerticalSpace();
    }
  },

  displayWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;
    addVerticalSpace(1);
    wait(1000);
    console.log(`\x1b[36mYou chose: ${this.human.move}`);
    console.log(`The computer chose: ${this.computer.move}\x1b[0m`);
    addVerticalSpace(2);
    wait(2000);
    if (humanMove === computerMove) {
      console.log("It's a tie");
    } else  if (winningMoves[humanMove].includes(computerMove)) {
      console.log('\x1b[32mYou win!\x1b[0m');
      this.human.score += 1;
    } else {
      console.log('\x1b[31mComputer wins!\x1b[0m');
      this.computer.score += 1;
    }
  },

  displayScore() {
    addVerticalSpace(2);
    wait(2000);
    console.log(`\x1b[36mYour score is: ${this.human.score}`);
    console.log(`The computer's score is: ${this.computer.score}\x1b[0m`);
    addVerticalSpace(2);
    wait(2000);
    if (this.human.score === 5) {
      console.log("\x1b[32mYou won best out of 5!\x1b[0m");
      return '5 Games Won';
    } else if (this.computer.score === 5) {
      console.log("\x1b[31mThe computer won best out of 5 :(\x1b[0m");
      return '5 Games Won';
    } else return null;
  },

  playAgain() {
    console.log("Would you like to play again? (y/n)");
    let answer = readline.question();
    return answer.toLowerCase()[0] === 'y';
  },

  play() {
    console.clear();
    this.displayWelcomeMessage();
    while (true) {
      this.displayRules();
      if (this.turnNumber > 1) this.displayHistory();
      this.human.choose();
      this.computer.choose();
      this.displayWinner();
      this.turnNumber++;
      if (this.displayScore() === '5 Games Won') break;
      if (!this.playAgain()) break;
    }
    this.displayGoodbyeMessage();
  },
};

function createPlayer(name) {
  return {
    name,
    move: null,
    moves: {},
    score: 0,
    logMove(turnNumber) {
      this.moves[turnNumber] = this.move;
    }
  };
}

function createComputer() {
  let playerObject = createPlayer('computer');

  let computerObject = {
    choose() {
      const choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
      let randomIndex = Math.floor(Math.random() * choices.length);
      this.move = choices[randomIndex];
      playerObject.logMove(RPSGame.turnNumber);
    },
  };

  return Object.assign(playerObject, computerObject);
}

function createHuman() {
  let playerObject = createPlayer('human');

  let humanObject = {
    choose() {
      let choice;

      while (true) {
        console.log('Please choose rock, paper, scissors, spock, or lizard.');
        choice = readline.question();
        if (['rock', 'paper', 'scissors', 'lizard', 'spock'].includes(choice)) break;
        console.log('Sorry, invalid choice.');
      }

      this.move = choice;
      playerObject.logMove(RPSGame.turnNumber);
    },

  };
  return Object.assign(playerObject, humanObject);
}

RPSGame.play();