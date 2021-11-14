import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from "@angular/core";
import { UserParameters, UserResponse } from '@atenea/api-interfaces';

export type UserState = UserParameters & UserResponse;

function createInitialState(): UserState {
  return {
    users: [],
    totalCount: 0,
    query: '',
    page: { page: 1, offset: 0, count: 10 }
  };
}

@StoreConfig({ name: 'users' })
@Injectable({
  providedIn: 'root'
})

export class UserStore extends Store<UserState> {
  constructor() {
    super(createInitialState());
  }
}
