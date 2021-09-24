import { ITrendingCard } from "../interfaces/i-trending-card";

export class TrendingCard implements ITrendingCard{
    public cardName: string;
    public cardNumber: string;
    public leaderCount: number;
    public imageUrl: string;
    constructor(){

    }
}
