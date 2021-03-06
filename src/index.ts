import { createTable, dealHand, generateDeck } from './generators'

/**========================================================================
 *                           INTERFACES
 *========================================================================**/
export * from './generators'

export enum Faces {
  one = 1,
  two = 2,
  three = 3,
  four = 4,
  five = 5,
  six = 6,
  seven = 7,
  eight = 8,
  nine = 9,
  ten = 10,
  Jack = 11,
  Queen = 12,
  King = 13,
  Ace = 14
}

export enum CardSet {
  spades = 1,
  hearts = 2,
  clubs = 3,
  diamonds = 4
}

/**=======================
     Hand Rankings
 *  RoyalFlush
 *  Straight Flush
 *  Four of kind
 *  Full House
 *  Flush
 *  Straight
 *  Three of a kind
 *  Two pair | 
 *  Pair | scoring 15 to 29 (highCard + card value)
 *  High Card | scoring 14
 *========================**/

export enum HandRanking {
  RoyalFlush = 10,
  StraightFlush = 9,
  FourOfKind = 8,
  FullHouse = 7,
  Flush = 6,
  Straight = 5,
  ThreeOfKind = 4,
  TwoPair = 3,
  Pair = 2,
  HighCard = 1
}

export interface Deck {
  cards: Card[]
  decks: number
  generated: number
  shuffled?: {
    times: number
    split: boolean
  }
}

export interface Card {
  set: CardSet
  face: Faces
}

export interface HandValue {
  score?: number
  ranking: HandRanking
  hand: Card[]
}

export interface Players {
  table?: Card[]
  burn?: Card[]
  [index: string]: Player | undefined | Card[]
}

export interface Player {
  cards: Card[]
  bet: number | false
}

export class Game {
  protected Players?: Players
  protected Deck?: Deck
  protected Valid: true | number = Date.now()
  constructor() {
    this.generateDeck().then(() => this.validateDeck())
  }
  generateDeck = generateDeck.bind(this)
  shuffleDeck = generateDeck.bind(this)
  dealHand = dealHand.bind(this)
  createTable = createTable.bind(this)
  flop = (deck?: Deck) => dealHand.bind(this)({ cards: 3, deck })
  turn = (deck?: Deck) => dealHand.bind(this)({ cards: 1, deck })
  river = (deck?: Deck) => dealHand.bind(this)({ cards: 1, deck })
  burn = (deck?: Deck) => dealHand.bind(this)({ cards: 1, deck })
  public async getDeck() {
    this.Valid = Date.now()
    return this.Deck
  }
  public async validateDeck() {
    if (this.Valid || (this.Deck && this.Valid <= this.Deck?.generated)) {
      this.Valid = true
      return true
    }
    return false
  }
}
