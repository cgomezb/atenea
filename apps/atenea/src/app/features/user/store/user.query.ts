import { QueryEntity } from '@datorama/akita';
import { Injectable } from "@angular/core";
import { UserState, UserStore } from "./user.store";

@Injectable({
  providedIn: 'root'
})

export class UserQuery extends QueryEntity<UserState> {
  public users$ = this.selectAll();
  public totalCount$ = this.select('totalCount');
  public query$ = this.select('query');
  public page$ = this.select('page');
  public loading$ = this.selectLoading();

  constructor(protected store: UserStore) {
    super(store);
  }
}
