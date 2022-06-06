/*
nouns: game, player, dealer, turn, deck, card, suit, rank, score
verbs: deal, hit, stay, bust, win, lose, tie, hide, reveal
*/


//set up readline-sync to allow program
//to get user input
const readline = require('readline-sync');


class Deck {
  static SUITS= {
    H: 'Hearts',
    D: 'Diamonds',
    S: 'Spades',
    C: 'Clubs'
  };

  static FACE_CARDS = {
    J: 'Jack',
    Q: 'Queen',
    K: 'King' ,
    A: 'Ace'
  };

  static displayCard(card) {
    let value = card[1];
    if (Object.keys(Deck.FACE_CARDS).includes(value)) {
      value = Deck.FACE_CARDS[value];
    }
    let suit = Deck.SUITS[card[0]];
    return (value + ' of ' + suit);
  }

  constructor() {
    this.reset();
  }
  reset() {
    let cards = [];
    let suits = Object.keys(Deck.SUITS);
    let cardValues = ['2', '3', '4', '5', '6', '7', '8','9', '10', 'J', 'Q', 'K', 'A'];
    suits.forEach(suit => {
      cardValues.forEach(value => {
        cards.push([suit, value]);
      });
    });
    this.cards = this.shuffle(cards);
  }

  shuffle(deck) {
    for (let index = deck.length - 1; index > 0; index--) {
      let randomIndex = Math.floor(Math.random() * (index + 1));
      //swap elements
      [deck[index], deck[randomIndex]] = [deck[randomIndex], deck[index]];
    }

    return deck;
  }

  deal() {
    let newCard = this.cards.pop();
    return newCard;
  }

}

class Participant {
  constructor() {
    this.hand = [];
    this.score = 0;
  }

  calculateValueOfHand() {
    let values = this.hand.map(card => card[1]);

    let sum = 0;
    values.forEach(value => {
      if (value === "A") {
        sum += 11;
      } else if (['J', 'Q', 'K'].includes(value)) {
        sum += 10;
      } else {
        sum += Number(value);
      }
    });

    //correct for Aces
    values.filter(value => value === 'A').forEach(_ => {
      if (sum > 21) sum -= 10;
    });

    return sum;
  }

  isBusted() {
    return this.calculateValueOfHand() > 21;
  }

  displayHand(playersHand) {
    playersHand.forEach(card => {
      console.log(Deck.displayCard(card));
    });
  }
}


class Player extends Participant {
  constructor() {
    super();
    this.money = 5;
  }

  hitOrStay() {
    let validAnswers = ['h', 'hit', 's', 'stay'];

    console.log("Hit or Stay?");
    let answer = readline.question().trim().toLowerCase();

    while (!validAnswers.includes(answer)) {
      prompt("Invalid Input. Please enter 'hit' or 'stay.'");
      answer = readline.question().trim().toLowerCase();
    }

    //standardize the format of the user input
    return answer[0];
  }

  score() {
    console.log(`Your score is ${this.score}`);
  }
}

class Dealer extends Participant {
  constructor(card1, card2) {
    super(card1, card2);
  }

  hitOrStay() {
    let value = this.calculateValueOfHand();
    return (value < 17) ? 'h' : 's';
  }

  //hide the first card in the dealer's hand
  hide() {
    return this.hand.slice(1);
  }


  score() {
    console.log(`The dealer's score is ${this.score}`);
  }

}

class TwentyOneGame {
  constructor() {
    this.deck = new Deck();
    this.player = new Player();
    this.dealer = new Dealer();
  }

  start() {
    this.displayWelcomeMessage();
    this.dealCards();
    this.showCards();
    this.playerTurn();
    this.dealerTurn();
    this.displayResult();
    this.displayGoodbyeMessage();
  }

  dealCards() {
    //deal 2 cards to the dealer
    this.dealer.hand.push(this.deck.deal());
    this.dealer.hand.push(this.deck.deal());

    //deal 2 cards to the player
    this.player.hand.push(this.deck.deal());
    this.player.hand.push(this.deck.deal());
  }

  showCards() {
    this.wait(1000);
    console.log("");
    console.log('Your cards are:');
    this.displayHand(this.player.hand);
    this.wait(1000);
    console.log(`The total value of your cards is: ${this.player.calculateValueOfHand()}`);
    this.wait(1000);
    console.log("");
    console.log("The dealer's visible card is:");
    this.displayHand(this.dealer.hide());
    this.wait(2000);
  }

  displayHand(playersHand) {
    playersHand.forEach(card => {
      console.log(Deck.displayCard(card));
    });
  }

  playerTurn() {
    console.log("");
    console.log("");
    console.log("It's your turn!");
    while (true) {
      let choice = this.player.hitOrStay();
      //if they chose to stay
      if (choice === 's') break;

      //deal another card if they chose to hit
      let newCard = this.deck.deal();
      this.player.hand.push(newCard);
      console.log("\n\nThe card you're dealt is:");
      console.log(Deck.displayCard(newCard));
      console.log(`The total value of your cards is: ${this.player.calculateValueOfHand()}`);
      this.wait(2000);
      if (this.player.isBusted()){
        console.log("BUST!")
        break;
      };
    }
    console.log("Your turn is over.");
  }


  dealerTurn() {
    if (this.player.isBusted()){
      console.log('Since you busted, the game is over.');
    } else {
      console.log("\n\nIt's the dealer's turn!");
      this.wait(1000);
      console.log("The dealer's cards are:");
      this.displayHand(this.dealer.hand);
      this.wait(1000);
      console.log(`The total value of the dealer's cards is: ${this.dealer.calculateValueOfHand()}`);
      this.wait(1000);
      while (this.dealer.hitOrStay() === 'h') {
        console.log("");
        console.log("The dealer will hit. The new card is:");
        let newCard = this.deck.deal();
        console.log(Deck.displayCard(newCard));
        this.dealer.hand.push(newCard);
        if (this.dealer.isBusted()) {
          console.log('BUST!');
          break;
        }
      }
  }
  }

  displayWelcomeMessage() {
    console.clear();
    console.log('Welcome to Twenty One!');
  }

  displayGoodbyeMessage() {
    console.log("\nThanks for playing Twenty One!");
  }

  displayResult() {
    this.wait(1500);
    console.log(`\nThe total value of your cards is: ${this.player.calculateValueOfHand()}`);
    this.wait(1500);
    console.log(`\nThe total value of the dealer's cards is: ${this.dealer.calculateValueOfHand()}`);
    this.wait(1500);
    let winner = this.findWinner();
    switch (winner) {
      case 'player': console.log("You won! Congratulations");
        break;
      case 'dealer' : console.log("The dealer won. Sorry.");
        break;
      case 'tie' : console.log("It's a tie.");
    }
  }
  findWinner() {
    if (this.player.isBusted()) return 'dealer';
    else if (this.dealer.isBusted()) return 'player';
    else if (this.player.calculateValueOfHand() < this.dealer.calculateValueOfHand()) return 'dealer';
    else if (this.player.calculateValueOfHand() > this.dealer.calculateValueOfHand()) return 'player';
    else return 'tie';
  }

  wait(ms) {
    let currentTime = new Date().getTime();
    let end = currentTime + ms;
    while (currentTime < end) {
      currentTime = new Date().getTime();
    }
  }
}




let game = new TwentyOneGame();
game.start();