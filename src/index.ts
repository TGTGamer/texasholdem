enum Faces {
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

enum CardSet {
  spades = 1,
  hearts = 2,
  clubs = 3,
  diamonds = 4
}

enum HandRanking {
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

interface Deck {
  cards: Card[]
  decks: number
  shuffled:
    | {
        times: number
        split: boolean
      }
    | false
}

interface Card {
  set: CardSet
  face: Faces
}

async function generateDeck(decks: number = 3): Promise<Deck> {
  let deck: Deck = {
    cards: [],
    decks: decks,
    shuffled: false
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

async function shuffleDeck(deck: Deck, count: number): Promise<Deck> {
  let shuffles = 0
  while (shuffles < count) {
    deck.cards.sort(() => Math.floor(Math.random() * 20) - 10)
    deck.cards.reverse()
    const splitPoint = Math.floor(Math.random() * deck.cards.length)
    const split = deck.cards.splice(splitPoint, deck.cards.length - splitPoint)
    deck.cards = deck.cards.concat(split)
    shuffles++
  }
  return deck
}

async function dealHand(deck: Deck, cards: number) {
  return deck.cards.splice(0, cards)
}

async function OfAKind(hand: Card[]): Promise<HandValue | undefined> {
  hand = hand.filter((card, index, array) => {
    for (let a in array) {
      if (a !== index.toString()) {
        if (card.face == array[a]?.face) return true
      }
    }
    return false
  })
  if (hand.length > 3) {
    let pairs: number[] = []
    hand.forEach(card => {
      if (!pairs.find(c => c == card.face)) pairs.push(card.face)
    })
    if (pairs.length == 2 && hand.length == 5) {
      return {
        ranking: HandRanking.FullHouse,
        hand
      }
    } else
      return {
        ranking: HandRanking.TwoPair,
        hand
      }
  } else
    switch (hand.length) {
      case 2:
        return {
          ranking: HandRanking.Pair,
          hand
        }
      case 3:
        return {
          ranking: HandRanking.ThreeOfKind,
          hand
        }
      default:
        return
    }
}

interface HandValue {
  score?: number
  ranking: HandRanking
  hand: Card[]
}
// async function checkHand(hand: Card[]): Promise<HandValue> {}

/**=======================
 * !      TESTING
 *========================**/

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

generateDeck(1).then(async deck => {
  deck = await shuffleDeck(deck, Math.floor(Math.random() * 15) + 5) //?
  const table = {
    1: await dealHand(deck, 2),
    2: await dealHand(deck, 2),
    table: await dealHand(deck, 5)
  }
  console.log(table)
  console.log(await OfAKind(table[1].concat(table.table)))
  //console.log('rest:', deck)
})
