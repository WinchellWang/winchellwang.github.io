---
layout: post
title: Blackjack Code
subtitle: A python script for 4 player blackjack
date: 2024-04-15
author: Winchell.Wang
header-img: "img/post-bg-tech.jpg"
tags:
   - Computer
header-mask: 0.1
catalog: true
---

# Python Code

The script for 4 player blackjack.

```python
import random

class Card:
    def __init__(self, suit, value):
        self.suit = suit
        self.value = value

    def __str__(self):
        return f"{self.value} of {self.suit}"

class Deck:
    def __init__(self):
        self.cards = []
        suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades']
        values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace']
        for suit in suits:
            for value in values:
                self.cards.append(Card(suit, value))

    def shuffle(self):
        random.shuffle(self.cards)

    def deal_card(self):
        if len(self.cards) == 0:
            return None
        return self.cards.pop()

class Player:
    def __init__(self, name):
        self.name = name
        self.hand = []

    def add_card_to_hand(self, card):
        self.hand.append(card)

    def hand_value(self):
        value = 0
        has_ace = False
        for card in self.hand:
            if card.value.isdigit():
                value += int(card.value)
            elif card.value in ['Jack', 'Queen', 'King']:
                value += 10
            elif card.value == 'Ace':
                has_ace = True
                value += 11
        if has_ace and value > 21:
            value -= 10
        return value

def print_hand(player):
    print(f"{player.name}'s hand:")
    for card in player.hand:
        print(card)

def main():
    deck = Deck()
    deck.shuffle()

    players = [Player("Player 1"), Player("Player 2"), Player("Player 3"), Player("Player 4")]

    # Deal two cards to each player
    for _ in range(2):
        for player in players:
            player.add_card_to_hand(deck.deal_card())

    # Display initial hands
    for player in players:
        print_hand(player)
        print()

    # Players take turns to hit or stand
    for player in players:
        while True:
            choice = input(f"{player.name}, do you want to hit or stand? (h/s): ").lower()
            if choice == 'h':
                player.add_card_to_hand(deck.deal_card())
                print_hand(player)
                if player.hand_value() > 21:
                    print(f"{player.name} busted!")
                    break
            elif choice == 's':
                break
            else:
                print("Invalid choice, please enter 'h' for hit or 's' for stand.")

    # Determine winner
    winners = []
    highest_score = 0
    for player in players:
        if player.hand_value() <= 21:
            if player.hand_value() > highest_score:
                highest_score = player.hand_value()
                winners = [player]
            elif player.hand_value() == highest_score:
                winners.append(player)

    # Print winners
    if len(winners) == 0:
        print("No winners.")
    else:
        print("Winners:")
        for winner in winners:
            print(f"{winner.name} with a score of {winner.hand_value()}")

if __name__ == "__main__":
    main()

# OR 
# main()
# depends on how you use it.
```

# Cards Left in Deck

Add the following codes.

```python

# existing code

def main():

    # existing code

    def cards_left(deck):
        return [str(card) for card in deck.cards]
    
    # existing code

    # Players take turns to hit or stand
    for player in players:
        while True:
            print(cards_left(deck)) # OR any other ways that you like to obtain the list.
            # existing code
    
    # existing code

# existing code
```

Then it shall print all the cards left in the deck after every decision for each player.