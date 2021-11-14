import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { UsersQuery } from "./user.query";
import { UsersStore } from "./user.store";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(
    private store: UsersStore,
    private searchQuery: UsersQuery, 
    private http: HttpClient
  ) {}
}
