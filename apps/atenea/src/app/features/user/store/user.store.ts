import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from "@angular/core";
import { UserParameters, UserResponse } from '@atenea/api-interfaces';

export type UsersState = UserParameters & UserResponse;

function createInitialState(): UsersState {
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

export class UsersStore extends Store<UsersState> {
  constructor() {
    super(createInitialState());
  }
}
