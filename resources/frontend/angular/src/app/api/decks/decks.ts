<<<<<<< HEAD
import { Card } from "../card/card.model";
=======
import { Card } from "../cards/cards";
>>>>>>> fe1a9b6cb7a1360f2025c63e0b79e162bb5b345c

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
