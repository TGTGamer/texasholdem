import { Deck } from '.'

export async function generateDeck(decks: number = 3): Promise<Deck> {
  let deck: Deck = {
    cards: [],
    decks: decks
  }
  let deckCound = 0
  while (deckCound < decks) {
    let setCount = 1
    while (setCount < 5) {
      let cardCount = 1
      while (cardCount < 15) {
        deck.cards.push({
          set: setCount,
          face: cardCount
        })
        cardCount++
      }
      setCount++
    }
    deckCound++
  }
  return deck
}

export async function shuffleDeck(deck: Deck, count: number): Promise<Deck> {
  deck.shuffled = { times: 0, split: false }
  while (deck.shuffled.times < count) {
    deck.cards.sort(() => Math.floor(Math.random() * 20) - 10)
    deck.cards.reverse()
    const splitPoint = Math.floor(Math.random() * deck.cards.length)
    const split = deck.cards.splice(splitPoint, deck.cards.length - splitPoint)
    deck.cards = deck.cards.concat(split)
    deck.shuffled.times++
  }
  return deck
}

export async function dealHand(deck: Deck, cards: number) {
  return deck.cards.splice(0, cards)
}

export async function createTable (players: number) {
    while 
}