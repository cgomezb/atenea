import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { CreateUserResponse, DeleteUserResponse, Page, User, UserParameters, UserResponse } from '@atenea/api-interfaces';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserStore } from "./user.store";
import { defaultPagination } from '..';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private baseUrl = '';

  constructor(
    private store: UserStore,
    private http: HttpClient
  ) {
    this.setupUrlPath();
  }

  public setParameters(parameters: Partial<UserParameters>): void {
    this.store.update({ ...parameters });
    this.getUsers({ ...parameters });
  }

  public createUser(user: User): Observable<CreateUserResponse> {
    return this.http.post<CreateUserResponse>(this.baseUrl, user)
      .pipe(tap(() => this.reloadUsers()));
  }

  public deleteUser(userId: string): Observable<DeleteUserResponse> {
    return this.http.delete<DeleteUserResponse>(`${this.baseUrl}${userId}`)
      .pipe(tap(() => this.reloadUsers()));
  }

  private setupUrlPath(): void {
    this.baseUrl = environment.apis.user;
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
        (response: UserResponse) => {
          this.store.update({ ...response });
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
