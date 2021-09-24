import { IRecentDeck } from "../interfaces/i-recent-deck";

export class RecentDeck implements IRecentDeck{
    public id: number;
    public title: string;
    public submitDate: string;
    public user: string;
    public leaderCardNumber: string;
    constructor() { }
}
