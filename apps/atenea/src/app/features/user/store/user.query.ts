import { Query } from '@datorama/akita';
import { Injectable } from "@angular/core";
import { UserState, UserStore } from "./user.store";

@Injectable({
  providedIn: 'root'
})

export class UserQuery extends Query<UserState> {
  public users$ = this.select('users');
  public totalCount$ = this.select('totalCount');
  public query$ = this.select('query');
  public page$ = this.select('page');

  constructor(protected store: UserStore) {
    super(store);
  }
}
