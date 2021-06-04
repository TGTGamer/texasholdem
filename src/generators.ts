import { Deck, Game, Players } from '.'

export async function generateDeck(this: Game, decks: number = 1) {
  let deck: Deck = {
    cards: [],
    decks: decks,
    generated: new Date()
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
  this.Deck = deck
}

export async function shuffleDeck(
  this: Game,
  count: number,
  deck: Deck | undefined = this.Deck
) {
  if (this.Valid !== true)
    throw new Error(
      'Deck is invalid. You need to regenerate and validate the deck'
    )
  if (!deck) throw new Error("Deck isn't defined")
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

export async function splitDeck(
  this: Game,
  deck: Deck | undefined = this.Deck,
  splitPoint: number = deck ? Math.floor(Math.random() * deck.cards.length) : 0
) {
  if (this.Valid !== true)
    throw new Error(
      'Deck is invalid. You need to regenerate and validate the deck'
    )
  if (!deck) throw new Error("Deck isn't defined")
  const split = deck.cards.splice(splitPoint, deck.cards.length - splitPoint)
  deck.cards = deck.cards.concat(split)
  if (deck.shuffled) deck.shuffled.split = true
  else deck.shuffled = { split: true, times: 0 }
  return deck
}

export async function dealHand(
  this: Game,
  cards: number,
  deck: Deck | undefined = this.Deck
) {
  if (this.Valid !== true)
    throw new Error(
      'Deck is invalid. You need to regenerate and validate the deck'
    )
  if (!deck) throw new Error("Deck isn't defined")
  return deck.cards.splice(0, cards)
}

export async function createTable(
  this: Game,
  players: number,
  deck: Deck | undefined = this.Deck
): Promise<Players> {
  if (this.Valid !== true)
    throw new Error(
      'Deck is invalid. You need to regenerate and validate the deck'
    )
  if (!deck) throw new Error("Deck isn't defined")
  let result: Players = {}
  let cardsDealt: number = 0

  // deal cards to players
  while (cardsDealt) {
    let playersDealt: number = 0
    while (playersDealt !== players) {
      result[playersDealt] = {
        cards: await dealHand.bind(this)(1),
        bet: 0
      }
      playersDealt++
    }
    cardsDealt++
  }

  // burn card
  result.burn = await this.burn(deck)

  // the flop
  result.table = await this.flop(deck)
  return result
}

export async function validateDeck(
  this: Game,
  deck: Deck | undefined = this.Deck
) {
  if (this.Valid !== true)
    throw new Error(
      'Deck is invalid. You need to regenerate and validate the deck'
    )
  if (!deck) throw new Error("Deck isn't defined")
}
