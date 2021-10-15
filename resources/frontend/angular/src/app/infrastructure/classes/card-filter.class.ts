import { action } from '@datorama/akita';
import { filter } from 'lodash';
import { Card } from '../../cards/state/card.model';

const cardFilters: any = {
    'title' : (card: Card, filters: any) : boolean  => card.cardName.toLowerCase().indexOf(filters.title.toLowerCase()) > -1,
    'description' : (card: Card, filters: any) : boolean => card.cardText.toLowerCase().indexOf(filters.description.toLowerCase()) > -1,
    'cardNumber': (card: Card, filters: any) : boolean => card.cardNumber.toLowerCase().indexOf(filters.cardNumber.toLowerCase()) > -1,
    'color': (card: Card, filters: any) : boolean => filters.color.indexOf(card.color) > -1,
    'cardType' : (card: Card, filters: any): boolean => filters.cardType.indexOf(card.cardType) > -1,
    'cost' : (card: Card, filters: any): boolean => {
        let energy : any[] = card.energyCost.split("(");
        if(energy.length > 1) {
            energy[1] = energy[1].replace(")", "");
            energy[0] = (energy[0] == "X") ? energy[1].length : parseInt(energy[0]);
            const costs = (filters.cost.indexOf(7) > -1) ? filters.cost.concat([8, 9, 10, 11, 12]) : filters.cost;
            return costs.indexOf(energy[0]) > -1;
        }
        return false;
    }
} as const

export function FilterCards(cards: Card[], filters: any) {
    const filterFn: any = Object.keys(Object.assign({},filters)).map((key: string) => {
        if(filters[key].length) return cardFilters[key]
    }).filter(x => x !== undefined);
    
    if(!filterFn.length) {
        return cards;
    }

    return cards.filter((card: Card) => filterFn.reduce(
            (result: any, filter: any) => result && filter(card, filters), true
        )
    )
}
