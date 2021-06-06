import { Deck, Game, Players } from '.'

export async function generateDeck(this: Game, decks: number = 1) {
  let deck: Deck = {
    cards: [],
    decks: decks,
    generated: Date.now()
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
  return true
}

export async function shuffleDeck(
  this: Game,
  {
    count,
    skipValidate = false,
    deck = this.Deck
  }: {
    count: number
    skipValidate?: boolean
    deck?: Deck
  }
) {
  if (!skipValidate && this.Valid !== true)
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
    deck.cards = split.concat(deck.cards)
    deck.shuffled.times++
  }
  return deck
}

export async function splitDeck(
  this: Game,
  {
    skipValidate = false,
    deck = this.Deck,
    splitPoint = deck ? Math.floor(Math.random() * deck.cards.length) : 0
  }: {
    skipValidate?: boolean
    deck: Deck | undefined
    splitPoint?: number
  }
) {
  if (!skipValidate && this.Valid !== true)
    throw new Error(
      'Deck is invalid. You need to regenerate and validate the deck'
    )
  if (!deck) throw new Error("Deck isn't defined")
  const split = deck.cards.splice(splitPoint, deck.cards.length - splitPoint)
  deck.cards = split.concat(deck.cards)
  if (deck.shuffled) deck.shuffled.split = true
  else deck.shuffled = { split: true, times: 0 }
  return deck
}

export async function dealHand(
  this: Game,
  {
    cards,
    skipValidate = false,
    deck = this.Deck
  }: {
    cards: number
    skipValidate?: boolean
    deck?: Deck
  }
) {
  if (!skipValidate && this.Valid !== true)
    throw new Error(
      'Deck is invalid. You need to regenerate and validate the deck'
    )
  if (!deck) throw new Error("Deck isn't defined")
  return deck.cards.splice(0, cards)
}

export async function createTable(
  this: Game,
  {
    players,
    skipValidate = false,
    deck = this.Deck
  }: {
    players: number
    skipValidate?: boolean
    deck?: Deck
  }
): Promise<Players> {
  if (!skipValidate && this.Valid !== true)
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
        cards: await dealHand.bind(this)({ cards: 1 }),
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
