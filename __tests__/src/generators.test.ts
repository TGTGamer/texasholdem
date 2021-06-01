import * as generators from '../../src/generators'
import * as index from '../../src/index'

// @ponicode
describe('generators.generateDeck', () => {
  test('0', async () => {
    let result: any = await generators.generateDeck(1)
    expect(result.shuffled).toBe(undefined)
    expect(result.decks).toBe(1)
    expect(result.cards.length).toBe(56)
  })

  test('2', async () => {
    let result: any = await generators.generateDeck(5)
    expect(result.shuffled).toBe(undefined)
    expect(result.decks).toBe(5)
    expect(result.cards.length).toBe(280)
  })

  test('1', async () => {
    let result: any = await generators.generateDeck(2)
    expect(result.shuffled).toBe(undefined)
    expect(result.decks).toBe(2)
    expect(result.cards.length).toBe(112)
  })

  test('3', async () => {
    let result: any = await generators.generateDeck(3)
    expect(result.shuffled).toBe(undefined)
    expect(result.decks).toBe(3)
    expect(result.cards.length).toBe(168)
  })

  test('4', async () => {
    let result: any = await generators.generateDeck(-Infinity)
    expect(result.shuffled).toBe(undefined)
    expect(result.decks).toBe(-Infinity)
    expect(result.cards.length).toBe(0)
  })
})

// @ponicode
describe('generators.shuffleDeck', () => {
  test('1', async () => {
    let object = [
      { set: index.CardSet.clubs, face: index.Faces.four },
      { set: index.CardSet.spades, face: index.Faces.King },
      { set: index.CardSet.diamonds, face: index.Faces.nine }
    ]
    let result = await generators.shuffleDeck(
      { cards: object, decks: 1, shuffled: undefined },
      2
    )
    expect(result.shuffled.times).toBe(2)
  })
})
