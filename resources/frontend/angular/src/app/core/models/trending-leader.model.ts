import { ITrendingLeader } from "../interfaces/i-trending-leader";

export class TrendingLeader implements ITrendingLeader{
    public leaderId: number;
    public count: number;
    public leaderName: string;
    public leaderCardNumber: string;
    constructor() {

    }
}
