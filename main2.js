const readline = require('readline');

const items = [
  [
    "Netherlands",
    { firstClue: "A European country known for its tulip fields and windmills" },
    { secondClue: "The capital city is Amsterdam, famous for its canals" },
    { thirdClue: "Dutch people are often recognized for their cycling culture" }
  ],
  [
    "Canada",
    { firstClue: "A North American country with a maple leaf on its flag" },
    { secondClue: "Known for its diverse landscapes, including vast forests and beautiful lakes" },
    { thirdClue: "Hockey is a popular sport, and the country is home to the NHL" }
  ],
  [
    "England",
    { firstClue: "A part of the United Kingdom, known for its rich history" },
    { secondClue: "London is the capital city and home to landmarks like Big Ben and the Tower of London" },
    { thirdClue: "Traditional foods include fish and chips and afternoon tea" }
  ],
  [
    "Germany",
    { firstClue: "A European country famous for its engineering and automotive industries" },
    { secondClue: "Berlin is the capital city, and the country is known for its beer culture" },
    { thirdClue: "Oktoberfest is a popular beer festival celebrated worldwide" }
  ],
  [
    "France",
    { firstClue: "A European country known for its art, fashion, and cuisine" },
    { secondClue: "Paris is the capital, and the Eiffel Tower is a famous landmark" },
    { thirdClue: "Cuisine includes croissants, cheese, and fine wines" }
  ],
  [
    "Australia",
    { firstClue: "A large island country with unique wildlife and landscapes" },
    { secondClue: "Sydney is home to the Opera House, and the Great Barrier Reef is a famous natural wonder" },
    { thirdClue: "Aussie rules football and cricket are popular sports in this country" }
  ],
  [
    "Japan",
    { firstClue: "An East Asian country known for its technological advancements" },
    { secondClue: "Tokyo is the capital, and the country is famous for sushi and ramen" },
    { thirdClue: "Sumo wrestling is a traditional sport in this country" }
  ],
  [
    "India",
    { firstClue: "A South Asian country with a rich history and diverse culture" },
    { secondClue: "New Delhi is the capital, and the country is known for its spicy cuisine" },
    { thirdClue: "Cricket is a widely popular sport, and the Taj Mahal is a famous landmark" }
  ],
  [
    "Egypt",
    { firstClue: "A North African country known for its ancient history and pyramids" },
    { secondClue: "Cairo is the capital, and the Nile River flows through the country" },
    { thirdClue: "Hieroglyphics and mummies are associated with this country" }
  ],
  [
    "Turkey",
    { firstClue: "A transcontinental country connecting Europe and Asia" },
    { secondClue: "Istanbul is a major city, and Turkish delight is a popular sweet treat" },
    { thirdClue: "The Hagia Sophia and the Blue Mosque are famous architectural landmarks" }
]

[
    "Football",
    { firstClue: "A widely popular sport played with a round ball" },
    { secondClue: "Usually played by two teams of eleven players each" },
    { thirdClue: "The sport's biggest event is the FIFA World Cup" }
  ],
  [
    "Basketball",
    { firstClue: "A high-paced indoor or outdoor sport played with a round ball" },
    { secondClue: "Teams aim to shoot the ball through the opponent's hoop" },
    { thirdClue: "NBA is one of the most well-known leagues in this sport" }
  ],
  [
    "Chess",
    { firstClue: "A classic board game with a focus on strategy and tactics" },
    { secondClue: "Played on an 8x8 grid with various types of pieces" },
    { thirdClue: "The objective is to put the opponent's king in checkmate" }
  ],
  [
    "Tennis",
    { firstClue: "A racket sport played on a rectangular court" },
    { secondClue: "The ball is hit over a net, and the aim is to win points" },
    { thirdClue: "Famous tournaments include Wimbledon and the US Open" }
  ],
  [
    "Baseball",
    { firstClue: "An iconic American sport played with a bat and ball" },
    { secondClue: "Teams take turns batting and fielding to score runs" },
    { thirdClue: "The sport's major leagues include MLB and NPB" }
  ],
  [
    "Golf",
    { firstClue: "A precision club-and-ball sport played on a course" },
    { secondClue: "The objective is to complete each hole in as few strokes as possible" },
    { thirdClue: "The Masters and The Open Championship are prestigious tournaments in this sport" }
  ],
  [
    "Swimming",
    { firstClue: "An aquatic sport involving the use of various strokes" },
    { secondClue: "Competitions take place in pools or open water" },
    { thirdClue: "Olympic swimming events include freestyle and butterfly" }
  ],
  [
    "Volleyball",
    { firstClue: "A team sport played with a ball over a net" },
    { secondClue: "Players aim to score points by sending the ball over the net" },
    { thirdClue: "There is a popular beach variant of this sport" }
  ],
  [
    "Badminton",
    { firstClue: "A racket sport played with a shuttlecock" },
    { secondClue: "Competitions can be in singles or doubles format" },
    { thirdClue: "The sport is known for its fast-paced rallies" }
  ],
  [
    "Hockey",
    { firstClue: "A fast-paced sport played on ice or turf" },
    { secondClue: "Teams use sticks to maneuver a puck or ball into the opponent's goal" },
    { thirdClue: "The NHL is a prominent professional body in this sport" }
  ]

];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const score = new Array(items.length).fill(0);

function playGame() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // Ask for the number of players
  rl.question('Enter the number of players (2-4): ', (numPlayers) => {
    numPlayers = parseInt(numPlayers);
    if (isNaN(numPlayers) || numPlayers < 2 || numPlayers > 4) {
      console.log('Invalid number of players.');
      rl.close();
      return;
    }

    // Generate random item for each guesser
    const randomItems = shuffleArray(items).slice(0, numPlayers);

    // Ask for player names
    const playerNames = [];
    let i = 1;

    function askName() {
      rl.question(`What is the name of player ${i}? `, (name) => {
        playerNames.push(name);
        i++;
        if (i <= numPlayers) {
          askName();
        } else {
          playRound(0);
        }
      });
    }
    askName();

    function playRound(playerIndex) {
      console.log(`\n${playerNames[playerIndex]}, it's your turn to guess!`);

      // Present clues
      const item = randomItems[playerIndex][0];
      let numGuesses = 3;
      let j = 1;

      function presentClues() {
        const clue = randomItems[playerIndex][j];
        if (clue) {
          console.log(`\n${j}. ${clue.firstClue}`);
          if (clue.secondClue) console.log(clue.secondClue);
          if (clue.thirdClue) console.log(clue.thirdClue);
          j++;
          rl.question('What is the item? ', (guess) => {
            if (guess.toLowerCase() === item.toLowerCase()) {
              console.log('Correct!');
              score[playerIndex] += numGuesses + 1;
              if (playerIndex === numPlayers - 1) {
                printScores();
                rl.close();
              } else {
                playRound(playerIndex + 1);
              }
            } else {
              numGuesses--;
              if (numGuesses === 0) {
                console.log(`Sorry, the item was ${item}.`);
                if (playerIndex === numPlayers - 1) {
                  printScores();
                  rl.close();
                } else {
                  playRound(playerIndex + 1);
                }
              } else {
                console.log(`Incorrect. You have ${numGuesses} guesses left.`);
                presentClues();
              }
            }
          });
        } else {
          console.log(`Sorry, the item was ${item}.`);
          if (playerIndex === numPlayers - 1) {
            printScores();
            rl.close();
          } else {
            playRound(playerIndex + 1);
          }
        }
      }
      presentClues();
    }
  });

  function printScores() {
    console.log('Game over. Scores:');
    for (let i = 0; i < numPlayers; i++) {
      console.log(`${playerNames[i]}: ${score[i]} points`);
    }
  }
}

playGame();
