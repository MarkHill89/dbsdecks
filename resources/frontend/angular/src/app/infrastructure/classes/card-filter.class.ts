import { Card } from '../../cards/state/card.model';

const cardFilters: any = {
    'title' : (card: Card, filters: any) : boolean  => card.title.toLowerCase().indexOf(filters.title.toLowerCase()) > -1,
    'description' : (card: Card, filters: any) : boolean => card.description.toLowerCase().indexOf(filters.description.toLowerCase()) > -1,
    'cardNumber': (card: Card, filters: any) : boolean => card.cardNumber.toLowerCase().indexOf(filters.cardNumber.toLowerCase()) > -1
} as const

export function FilterCards(cards: Card[], filters: any) {
    const filterFn: any = Object.keys(Object.assign({},filters)).map((key: string) => {
        if(filters[key].length) return cardFilters[key]
    }).filter(x => x !== undefined);
    
    if(!filterFn.length) {
        return cards;
    }

    return cards.filter(
        (card: Card) => filterFn.reduce(
            (result: any, filter: any) => result && filter(card, filters), true
        )
    )
}
