import random

items = [
    [
      "Netherlands",
      { "firstClue": "A European country known for its tulip fields and windmills" },
      { "secondClue": "The capital city is Amsterdam, famous for its canals" },
      { "thirdClue": "Dutch people are often recognized for their cycling culture" }
    ],
    [
      "Canada",
      { "firstClue": "A North American country with a maple leaf on its flag" },
      { "secondClue": "Known for its diverse landscapes, including vast forests and beautiful lakes" },
      { "thirdClue": "Hockey is a popular sport, and the country is home to the NHL" }
    ],
    [
      "England",
      { "firstClue": "A part of the United Kingdom, known for its rich history" },
      { "secondClue": "London is the capital city and home to landmarks like Big Ben and the Tower of London" },
      { "thirdClue": "Traditional foods include fish and chips and afternoon tea" }
    ],
    [
      "Germany",
      { "firstClue": "A European country famous for its engineering and automotive industries" },
      { "secondClue": "Berlin is the capital city, and the country is known for its beer culture" },
      { "thirdClue": "Oktoberfest is a popular beer festival celebrated worldwide" }
    ],
    [
      "France",
      { "firstClue": "A European country known for its art, fashion, and cuisine" },
      { "secondClue": "Paris is the capital, and the Eiffel Tower is a famous landmark" },
      { "thirdClue": "Cuisine includes croissants, cheese, and fine wines" }
    ],
    [
      "Australia",
      { "firstClue": "A large island country with unique wildlife and landscapes" },
      { "secondClue": "Sydney is home to the Opera House, and the Great Barrier Reef is a famous natural wonder" },
      { "thirdClue": "Aussie rules football and cricket are popular sports in this country" }
    ],
    [
      "Japan",
      { "firstClue": "An East Asian country known for its technological advancements" },
      { "secondClue": "Tokyo is the capital, and the country is famous for sushi and ramen" },
      { "thirdClue": "Sumo wrestling is a traditional sport in this country" }
    ],
    [
      "India",
      { "firstClue": "A South Asian country with a rich history and diverse culture" },
      { "secondClue": "New Delhi is the capital, and the country is known for its spicy cuisine" },
      { "thirdClue": "Cricket is a widely popular sport, and the Taj Mahal is a famous landmark" }
    ],
    [
      "Egypt",
      { "firstClue": "A North African country known for its ancient history and pyramids" },
      { "secondClue": "Cairo is the capital, and the Nile River flows through the country" },
      { "thirdClue": "Hieroglyphics and mummies are associated with this country" }
    ],
    [
      "Turkey",
      { "firstClue": "A transcontinental country connecting Europe and Asia" },
      { "secondClue": "Istanbul is a major city, and Turkish delight is a popular sweet treat" },
      { "thirdClue": "The Hagia Sophia and the Blue Mosque are famous architectural landmarks" }
]
]

def play_game():
    # Ask for number of players
    while True:
        try:
            num_players = int(input("Enter the number of players (2-4): "))
            if num_players < 2 or num_players > 4:
                raise ValueError
            break
        except ValueError:
            print("Please enter a number between 2 and 4.")
    
    # Generate random item for each guesser
    random_items = random.sample(items, num_players)
    
    # Ask for player names
    player_names = []
    for i in range(num_players):
        name = input(f"What is the name of player {i+1}? ")
        player_names.append(name)
    
    # Play game
    score = [0] * num_players
    for i in range(num_players):
        print(f"\n{player_names[i]}, it's your turn to guess!")
        
        # Present clues
        item = random_items[i][0]
        num_guesses = 3
        for j in range(1, 4):
            clue = random_items[i][j]
            if 'firstClue' in clue:
                print(f"\n{j}. {clue['firstClue']}")
            if 'secondClue' in clue:
                print(f"{clue['secondClue']}")
            if 'thirdClue' in clue:
                print(f"{clue['thirdClue']}")
            
            guess = input("What is the item? ")
            if guess.lower() == item.lower():
                print("Correct!")
                score[i] += num_guesses + 1
                break
            else:
                num_guesses -= 1
                if num_guesses == 0:
                    print(f"Sorry, the item was '{item}'!")
                else:
                    print(f"No quite right! You have {num_guesses} guesses left.")
        
    # Print final scores
    print("\nFinal scores:")
    for i in range(num_players):
        print(f"{player_names[i]}: {score[i]} points")

if __name__ == "__main__":
    play_game()
