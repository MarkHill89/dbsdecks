import { Card } from "../card/card.model";

export interface Deck {
    id: number;
    imageUrl: string;
    leaderNumber: string;
    submitDate: string;
    title: string;
    username: string;
}

export interface DeckList {
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
