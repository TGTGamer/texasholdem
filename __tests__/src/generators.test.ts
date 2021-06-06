import * as generators from '../../src/generators'
import * as index from '../../src/index'

// @ponicode
describe('generators.generateDeck', () => {
  let inst: index.Game

  beforeEach(() => {
    inst = new index.Game()
  })

  test('0', async () => {
    let result: any = await generators.generateDeck.bind(inst)(1)
    expect(result).toBe(true)
    let deck: any = await inst.getDeck()
    expect(deck.shuffled).toBe(undefined)
    expect(deck.decks).toBe(1)
    expect(deck.cards.length).toBe(56)
  })

  test('1', async () => {
    let result: any = await generators.generateDeck.bind(inst)(2)
    expect(result).toBe(true)
    let deck: any = await inst.getDeck()
    expect(deck.shuffled).toBe(undefined)
    expect(deck.decks).toBe(2)
    expect(deck.cards.length).toBe(112)
  })

  test('2', async () => {
    let result: any = await generators.generateDeck.bind(inst)(5)
    expect(result).toBe(true)
    let deck: any = await inst.getDeck()
    expect(deck.shuffled).toBe(undefined)
    expect(deck.decks).toBe(5)
    expect(deck.cards.length).toBe(280)
  })

  test('3', async () => {
    let result: any = await generators.generateDeck.bind(inst)(3)
    expect(result).toBe(true)
    let deck: any = await inst.getDeck()
    expect(deck.shuffled).toBe(undefined)
    expect(deck.decks).toBe(3)
    expect(deck.cards.length).toBe(168)
  })

  test('4', async () => {
    let result: any = await generators.generateDeck.bind(inst)(-Infinity)
    expect(result).toBe(true)
    let deck: any = await inst.getDeck()
    expect(deck.shuffled).toBe(undefined)
    expect(deck.decks).toBe(-Infinity)
    expect(deck.cards.length).toBe(0)
  })
})

// @ponicode
describe('generators.shuffleDeck', () => {
  let inst: index.Game

  beforeEach(() => {
    inst = new index.Game()
  })
  test('1', async () => {
    let result = await generators.shuffleDeck.bind(inst)({ count: 2 })
    expect(result.shuffled.times).toBe(2)
  })
})

// @ponicode
describe('generators.splitDeck', () => {
  let inst: index.Game
  let object = [
    { set: index.CardSet.clubs, face: index.Faces.four },
    { set: index.CardSet.clubs, face: index.Faces.four },
    { set: index.CardSet.clubs, face: index.Faces.four },
    { set: index.CardSet.spades, face: index.Faces.King },
    { set: index.CardSet.spades, face: index.Faces.King },
    { set: index.CardSet.spades, face: index.Faces.King },
    { set: index.CardSet.diamonds, face: index.Faces.nine },
    { set: index.CardSet.diamonds, face: index.Faces.nine },
    { set: index.CardSet.diamonds, face: index.Faces.nine }
  ]

  beforeEach(async () => {
    inst = new index.Game()
  })
  test('1', async () => {
    let result = await generators.splitDeck.bind(inst)({
      skipValidate: true,
      deck: {
        cards: object,
        decks: 1,
        shuffled: {
          times: 2,
          split: false
        }
      }
    })
    console.log(result)
  })
})
