import { Card, HandRanking, HandValue } from '..'

export async function OfAKind(hand: Card[]): Promise<HandValue | undefined> {
  hand = hand.filter((card, index, array) => {
    for (let a in array) {
      if (a !== index.toString()) {
        if (card.face == array[a]?.face) return true
      }
    }
    return false
  })
  if (hand.length > 3) return isFullHouse(hand)
  else
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

async function isFullHouse(hand: Card[]): Promise<HandValue> {
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
}
