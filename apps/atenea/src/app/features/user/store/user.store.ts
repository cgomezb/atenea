import { EntityStore, StoreConfig, EntityState } from '@datorama/akita';
import { Injectable } from "@angular/core";
import { Page, User } from '@atenea/api-interfaces';
import { defaultPagination } from '../';

export interface UserState extends EntityState<User, string> {
  totalCount: number;
  query: string;
  page: Page;
}

function createInitialState(page: Page): UserState {
  return {
    totalCount: 0,
    query: '',
    page
  };
}

@StoreConfig({ name: 'users' })
@Injectable({
  providedIn: 'root'
})

export class UserStore extends EntityStore<UserState> {
  constructor() {
    super(createInitialState(defaultPagination));
  }
}
