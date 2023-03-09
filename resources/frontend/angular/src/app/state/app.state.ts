import { CardState, LeaderCardState } from "./cards/cards.reducer";
import { DeckListState, DeckState } from "./decks/decks.reducer";
import { UserState } from "./user/user.reducer";
import { SideNavState } from "./shared/side-nav/side-nav.reducer"
export interface AppState {
    user: UserState
    decks: DeckState,
    deckList: DeckListState,
    leaderCards: LeaderCardState,
    sideNav: SideNavState,
    cards: CardState
}