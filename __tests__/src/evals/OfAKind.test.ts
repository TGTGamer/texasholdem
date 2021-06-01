import * as OfAKind from '../../../src/evals/OfAKind'
import * as index from '../../../src/index'

// @ponicode
describe('OfAKind.OfAKind', () => {
  test('1', async () => {
    let param1: any = [
      { set: index.CardSet.clubs, face: index.Faces.one },
      { set: index.CardSet.spades, face: index.Faces.one },
      { set: index.CardSet.clubs, face: index.Faces.one },
      { set: index.CardSet.hearts, face: index.Faces.three },
      { set: index.CardSet.hearts, face: index.Faces.seven }
    ]
    let result: any = await OfAKind.OfAKind(param1)
    expect(result.ranking).toEqual(index.HandRanking.ThreeOfKind)
  })
})
