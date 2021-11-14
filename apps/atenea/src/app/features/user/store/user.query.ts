import { Query } from '@datorama/akita';
import { Injectable } from "@angular/core";
import { UsersState, UsersStore } from "./user.store";

@Injectable({
  providedIn: 'root'
})

export class UsersQuery extends Query<UsersState> {

  constructor(protected store: UsersStore) {
    super(store);
  }
}
