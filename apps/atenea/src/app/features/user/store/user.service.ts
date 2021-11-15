import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { CreateUserResponse, DeleteUserResponse, Page, User, UserParameters, UserResponse } from '@atenea/api-interfaces';
import { environment } from '../../../../environments/environment';
import { combineLatest, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserQuery } from "./user.query";
import { UserStore } from "./user.store";
import { defaultPagination } from '..';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private baseUrl = '';

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

  public createUser(user: User): Observable<CreateUserResponse> {
    return this.http.post<CreateUserResponse>(this.baseUrl, user)
      .pipe(tap(() => this.reloadUsers()));
  }

  public deleteUser(userId: string): Observable<DeleteUserResponse> {
    return this.http.delete<DeleteUserResponse>(`${this.baseUrl}${userId}`)
      .pipe(tap(() => this.reloadUsers()));
  }

  private setupService(): void {
    this.setupUrlPath();
    this.startParametersListener();
  }

  private setupUrlPath(): void {
    this.baseUrl = environment.apis.user;
  }

  private startParametersListener() {
    combineLatest([ this.usersQuery.query$, this.usersQuery.page$ ])
      .subscribe(([ query, page ]) => this.getUsers({ query, page }));
  }

  private reloadUsers(): void {
    const page: Page = defaultPagination;
    this.getUsers({ page });
  }

  private getUsers(userParameters: Partial<UserParameters>): void {
    const params = this.getParameters(userParameters);

    this.store.setLoading(true);
    this.http.get<UserResponse>(this.baseUrl, { params })
      .subscribe(
        ({ users, totalCount }: UserResponse) => {
          this.store.set(users);
          this.store.update({ totalCount });
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
