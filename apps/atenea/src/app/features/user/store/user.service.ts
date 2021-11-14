import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { User, UserParameters, UserResponse } from '@atenea/api-interfaces';
import { environment } from '../../../../environments/environment';
import { combineLatest, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserQuery } from "./user.query";
import { UserStore } from "./user.store";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private url = '';

  constructor(
    private store: UserStore,
    private usersQuery: UserQuery, 
    private http: HttpClient
  ) {
    this.setupService();
  }

  public setParameters(parameters: Partial<UserParameters>): void {
    this.store.update({ ...parameters });
  }

  public createUser(user: User): Observable<User> {
    return this.http.post<User>(this.url, user)
      .pipe(tap((user: User) => this.store.add([user])));
  }

  private setupService(): void {
    this.setupUrlPath();
    this.startParametersListener();
  }

  private setupUrlPath(): void {
    this.url = environment.apis.user;
  }

  private startParametersListener() {
    combineLatest([ this.usersQuery.query$, this.usersQuery.page$ ])
      .subscribe(([ query, page ]) => this.getUsers({ query, page }));
  }

  private getUsers(userParameters: Partial<UserParameters>): void {
    const params = this.getParameters(userParameters);

    this.store.setLoading(true);
    this.http.get<UserResponse>(this.url, { params })
      .subscribe(
        ({ users }: UserResponse) => {
          this.store.set(users);
          this.store.setLoading(false);
        },
        () => {
          this.store.update({ users: [], totalCount: 0 });
          this.store.setLoading(false);
        }
      );
  }

  private getParameters({ query, page }: Partial<UserParameters>): HttpParams {
    return new HttpParams({ fromObject: { query: query ? query : '', ...page } });
  }
}
