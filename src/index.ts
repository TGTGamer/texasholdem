/**=======================
 *      Hand Rankings
 *  RoyalFlush
 *  Straight Flush
 *  Four of kind
 *  Full House
 *  Flush  
 *  Straight
 *  Three of a kind
 *  Two pair
 *  Pair
 *  High Card
 *========================**/

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

interface Deck {
    cards: Card[]
    decks: number
    shuffled: {
        times: number
        split: boolean
    } | false
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

generateDeck().then(async deck => {
    deck = await shuffleDeck(deck, Math.floor(Math.random() * 15) + 5) //?
    console.log(deck)
}) 