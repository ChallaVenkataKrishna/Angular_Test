import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { createActionGroup, createFeature, createReducer, emptyProps, props } from "@ngrx/store";

const UsersStoreKey = "users";

export interface User {
    firstName: string;
    lastName: string;
    email: string;
    address: {
        postalCode: string
    }
}

export interface UsersState extends EntityState<User> {
    selectedUserId: string | null;
}

const usersAdapter: EntityAdapter<User> = createEntityAdapter<User>();

const initialState: UsersState = usersAdapter.getInitialState({
    selectedUserId: null
});

export const UsersActions = createActionGroup({
    source: UsersStoreKey,
    events: {
        Init: emptyProps(),
        'Save Initial Users': props<{ users: User[] }>(),
    }
});

export const UsersReducer = createFeature({
    name: UsersStoreKey,
    reducer: createReducer(initialState)
});

