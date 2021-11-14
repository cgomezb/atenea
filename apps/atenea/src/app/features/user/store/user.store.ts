import { EntityStore, StoreConfig, EntityState } from '@datorama/akita';
import { Injectable } from "@angular/core";
import { Page, User } from '@atenea/api-interfaces';

export interface UserState extends EntityState<User, string> {
  totalCount: number;
  query: string;
  page: Page;
}

function createInitialState(): UserState {
  return {
    users: null,
    totalCount: 0,
    query: '',
    page: { page: 1, offset: 0, count: 10 }
  };
}

@StoreConfig({ name: 'users' })
@Injectable({
  providedIn: 'root'
})

export class UserStore extends EntityStore<UserState> {
  constructor() {
    super(createInitialState());
  }
}
