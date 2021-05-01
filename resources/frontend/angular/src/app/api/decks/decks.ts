import { Card } from "../cards/cards";

export interface Deck {
    isActive ?: boolean;
    isPrivate: boolean;
    leader ?: Card;
    mainDeckList: Card[];
    sideDeckList: Card[];
    submitDate ?: string;
    title ?: string;
    username ?: string;
    id ?: number;
    action ?: string;
}

export interface RecentDeck {
    id: number;
    title: string;
    submitDate: string;
    user: string;
    leaderCardNumber: string;
}
