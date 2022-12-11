import { DeckState } from "./decks/decks.reducer";
import { UserState } from "./user/user.reducer";

export interface AppState {
    user: UserState
    decks: DeckState
}