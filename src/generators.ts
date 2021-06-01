import { Deck,Players } from '.'

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

export async function splitDeck(deck: Deck, splitPoint: number = Math.floor(Math.random() * deck.cards.length)) {
    const split = deck.cards.splice(splitPoint, deck.cards.length - splitPoint)
    deck.cards = deck.cards.concat(split)
    if (deck.shuffled) deck.shuffled.split = true
    else deck.shuffled = {split: true, times: 0}
    return deck
}

export async function dealHand(deck: Deck, cards: number) {
  return deck.cards.splice(0, cards)
}

export async function createTable (deck:Deck, players: number): Promise<Players> {
    let result: Players = {}
    let cardsDealt: number = 0
    
    // deal cards to players
    while (cardsDealt) {
        let playersDealt: number = 0
        while (playersDealt !== players) {
            result[playersDealt] = await dealHand(deck, 1)
            playersDealt++
        }
        cardsDealt++
    }
    
    // burn card
    result.burn = await burn(deck)
    
    // the flop
    result.table = await flop(deck)
    return result
}

// function aliases

export const flop = (deck:Deck) => dealHand(deck, 3)
export const turn = (deck: Deck) => dealHand(deck, 1)
export const river = (deck: Deck) => dealHand(deck, 1)
export const burn = (deck: Deck) => dealHand(deck, 1)