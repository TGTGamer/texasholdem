import { Deck, Players } from '.'

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

export async function splitDeck(deck: Deck, split: number = Math.floor(Math.random() * deck.cards.length)) {
    const split = deck.cards.splice(split, deck.cards.length - split)
    deck.cards = deck.cards.concat(split)
    deck.shuffled.split = true
    return deck
}

export async function dealHand(deck: Deck, cards: number) {
  return deck.cards.splice(0, cards)
}

export async function createTable (deck:Deck, players: number): Promise<Players> {
    let result: Partial<Players> = {}
    let cardsDealt: number = 0
    
    // deal cards to players
    while (cardsDealt) {
        let playersDealt: number = 0
        while (playersDealt !== players) {
            result[playersDealt] = dealHand(deck, 1)
            playersDealt++
        }
        cardsDealt++
    }
    
    // burn card
    result.burn = dealHand(deck, 1)
    
    // the flop
    result.table = dealHand(deck, 3)
    return result
}