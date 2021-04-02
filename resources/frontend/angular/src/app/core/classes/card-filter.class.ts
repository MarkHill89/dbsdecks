import { ActivatedRouteSnapshot } from "@angular/router";

export class CardFilter {
    private cards;
    private filterValues;
    constructor() {
        
    }

    private cardName(card, filters) {
        return card.cardName.toLowerCase().indexOf(filters.cardName.toLowerCase()) > -1;
    }

    private cardText(card, filters) {
        return card.cardText.toLowerCase().indexOf(filters.cardText.toLowerCase()) > -1;
    }

    private cardType(card, filters) {
        return filters.cardType.indexOf(card.cardType) > -1;
    }
    
    private power(card, filters) {
        return parseInt(card.power) == parseInt(filters.power);
    }

    private color(card, filters) {
        return filters.color.indexOf(card.color) > -1;
    }

    private energyCost(card, filters) {
        return filters.energyCost.indexOf(parseInt(card.energyColorCost.replace( /^\D+/g, ''))) > -1;
    }
    
    private comboEnergy(card, filters) {
        return parseInt(card.comboEnergy) === parseInt(filters.comboEnergy);
    }

    private comboPower(card, filters) {
        return parseInt(card.comboPower) === parseInt(filters.comboPower);
    }

    private groupId(card, filters) {
        return parseInt(card.groupId) === parseInt(filters.groupId);
    }

    private rarity(card, filters) {
        return card.rarity === filters.rarity;
    }
   
    private specialTrait(card, filters) {
        if(card.cardType === 'Battle') {
            return card.specialTrait.indexOf(filters.specialTrait) > -1;
        }
        return false;
    }

    private cardCharacter(card, filters) {
        if(card.cardType === 'Battle') {
            return card.cardCharacter.indexOf(filters.cardCharacter) > -1;
        }
        return false;
    }

    filterCards(cards, filters) {
        let filterFn = Object.keys(Object.assign({},filters)).map(key => {
            if(filters[key].length) return this[key];
        }).filter(x => x !== undefined);
        
        if(!filterFn.length) {
            return cards;
        }

        return cards.filter(
            (card) => filterFn.reduce(
                (result, filter) => result && filter(card, filters), true
            )
        )
    }
}
