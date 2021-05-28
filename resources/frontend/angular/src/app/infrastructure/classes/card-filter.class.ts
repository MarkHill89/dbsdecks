import { Card } from '../../cards/state/card.model';

export class CardFilter {
    constructor() {
        
    }

    private title(card: Card, filters: any) {
        return card.title.toLowerCase().indexOf(filters.title.toLowerCase()) > -1;
    }

    private description(card: Card, filters: any) {
        return card.description.toLowerCase().indexOf(filters.description.toLowerCase()) > -1;
    }

    public filterCards(cards: Card[], filters: any) {
        console.log(filters);
        let filterFn = Object.keys(Object.assign({},filters)).map(key => {
            if(filters[key].length) return this[key];
        }).filter(x => x !== undefined);
        
        if(!filterFn.length) {
            return cards;
        }

        return cards.filter(
            (card: Card) => filterFn.reduce(
                (result, filter) => result && filter(card, filters), true
            )
        )
    }
}
