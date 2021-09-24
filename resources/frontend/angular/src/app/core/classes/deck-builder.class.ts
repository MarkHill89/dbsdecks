export class DeckBuilder {
  constructor() {

  }

  private findCard(deck, card) {
    if(parseInt(card.isUltimate)) {
        return deck.reduce((acc, c) => parseInt(c.isUltimate) ? acc + parseInt(c.count) : acc, 0) < 1;
    }
    if(parseInt(card.isSuperCombo)) {
        return deck.reduce((acc, c) => parseInt(c.isSuperCombo) ? acc + parseInt(c.count) : acc, 0) < 4;
    }
    if(parseInt(card.isDragonBall)) {
        return deck.reduce((acc, c) => parseInt(c.isDragonBall) ? acc + parseInt(c.count) : acc, 0) < 7;
    }
    return deck.reduce((acc, c) => c.cardNumber === card.cardNumber ? acc + parseInt(c.count) : acc, 0) < parseInt(card.cardLimit);
  }

  setMainCard(deck, card) {
    const fullDeck = deck.mainDeckList.concat(deck.sideDeckList);
    const mainDeckLimitNotReached = (deck.mainDeckList.reduce((acc, c) => acc+parseInt(c.count), 0) < 60);
    const cardFound = deck.mainDeckList.find((item) => item.cardNumber === card.cardNumber);
    
    if(!cardFound && mainDeckLimitNotReached && this.findCard(fullDeck, card)) {
        let newCard = {...card};
        newCard.count = 1;
        deck.mainDeckList.push(newCard);
    }else{
        const cardIdx = deck.mainDeckList.map(e => e.cardNumber).indexOf(card.cardNumber);
        if(this.findCard(fullDeck, card) && mainDeckLimitNotReached){
            deck.mainDeckList[cardIdx].count++;
        }
    }

    const updatedDeck = deck.mainDeckList.concat(deck.sideDeckList);
    return {
        mainDeck: deck.mainDeckList,
        mainDeckCount: deck.mainDeckList.reduce((acc, c) => acc+parseInt(c.count), 0),
        superComboCount: updatedDeck.reduce((acc, c) => parseInt(c.isSuperCombo) ? acc + parseInt(c.count) : acc, 0),
        dragonBallCount: updatedDeck.reduce((acc, c) => parseInt(c.isDragonBall) ? acc + parseInt(c.count) : acc, 0),
        ultimateCount: updatedDeck.reduce((acc, c) => parseInt(c.isUltimate) ? acc + parseInt(c.count) : acc, 0)
    };
  }

  setSideCard(deck, card) {
    const fullDeck = deck.mainDeckList.concat(deck.sideDeckList);
    const sideDeckLimitNotReached = (deck.sideDeckList.reduce((acc, c) => acc+parseInt(c.count), 0) < 15);
    const cardFound = deck.sideDeckList.find((item) => item.cardNumber === card.cardNumber);
    
    if(!cardFound && sideDeckLimitNotReached && this.findCard(fullDeck, card)) {
        let newCard = {...card};
        newCard.count = 1;
        deck.sideDeckList.push(newCard);
    }else{
        const cardIdx = deck.sideDeckList.map(e => e.cardNumber).indexOf(card.cardNumber);
        if(this.findCard(fullDeck, card) && sideDeckLimitNotReached){
            deck.sideDeckList[cardIdx].count++;
        }
    }

    const updatedDeck = deck.mainDeckList.concat(deck.sideDeckList);
    return {
        sideDeck: deck.sideDeckList,
        sideDeckCount: deck.sideDeckList.reduce((acc, c) => acc+parseInt(c.count), 0),
        superComboCount: updatedDeck.reduce((acc, c) => parseInt(c.isSuperCombo) ? acc + parseInt(c.count) : acc, 0),
        dragonBallCount: updatedDeck.reduce((acc, c) => parseInt(c.isDragonBall) ? acc + parseInt(c.count) : acc, 0),
        ultimateCount: updatedDeck.reduce((acc, c) => parseInt(c.isUltimate) ? acc + parseInt(c.count) : acc, 0)
    };
  }

  removeMainCard(deck, card) {
    const cardIdx = deck.mainDeckList.map(e => e.cardNumber).indexOf(card.cardNumber);
    deck.mainDeckList[cardIdx].count--;
    if(deck.mainDeckList[cardIdx].count == 0 ) {
        deck.mainDeckList.splice(cardIdx, 1);
    }
    const updatedDeck = deck.mainDeckList.concat(deck.sideDeckList);
    return {
        mainDeck: deck.mainDeckList,
        mainDeckCount: deck.mainDeckList.reduce((acc, c) => acc+parseInt(c.count), 0),
        superComboCount: updatedDeck.reduce((acc, c) => parseInt(c.isSuperCombo) ? acc + parseInt(c.count) : acc, 0),
        dragonBallCount: updatedDeck.reduce((acc, c) => parseInt(c.isDragonBall) ? acc + parseInt(c.count) : acc, 0),
        ultimateCount: updatedDeck.reduce((acc, c) => parseInt(c.isUltimate) ? acc + parseInt(c.count) : acc, 0)
    };
  }

  removeSideCard(deck, card) {
    const cardIdx = deck.sideDeckList.map(e => e.cardNumber).indexOf(card.cardNumber);
    deck.sideDeckList[cardIdx].count--;
    if(deck.sideDeckList[cardIdx].count == 0 ) {
        deck.sideDeckList.splice(cardIdx, 1);
    }
    const updatedDeck = deck.mainDeckList.concat(deck.sideDeckList);
    return {
        sideDeck: deck.sideDeckList,
        sideDeckCount: deck.sideDeckList.reduce((acc, c) => acc+parseInt(c.count), 0),
        superComboCount: updatedDeck.reduce((acc, c) => parseInt(c.isSuperCombo) ? acc + parseInt(c.count) : acc, 0),
        dragonBallCount: updatedDeck.reduce((acc, c) => parseInt(c.isDragonBall) ? acc + parseInt(c.count) : acc, 0),
        ultimateCount: updatedDeck.reduce((acc, c) => parseInt(c.isUltimate) ? acc + parseInt(c.count) : acc, 0)
    };
  }

  isValid(deck) {
    if(!deck.leader) {
        return 0;
    }
    if(deck.mainDeckList.reduce((acc, c) => acc+parseInt(c.count), 0) < 50){
        return 0;
    }
    return 1;
  }
}
