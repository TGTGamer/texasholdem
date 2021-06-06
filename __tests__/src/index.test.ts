import * as index from '../../src/index'

describe('validateDeck', () => {
  let inst: index.Game

  beforeEach(() => {
    inst = new index.Game()
  })

  test('0', async () => {
    let result: any = await inst.validateDeck()
    expect(result).toBeTruthy()
  })
})
