import { createReducer } from "@ngrx/store";
import { User } from "./users-store";
 
export const initialState: ReadonlyArray<User> = [];
 
export const userReducer = createReducer(
    initialState
);