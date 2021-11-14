import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { UserParameters, UserResponse } from '@atenea/api-interfaces';
import { environment } from '../../../../environments/environment';
import { combineLatest } from 'rxjs';
import { UserQuery } from "./user.query";
import { UserStore } from "./user.store";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(
    private store: UserStore,
    private usersQuery: UserQuery, 
    private http: HttpClient
  ) {
    this.startParametersListener();
  }

  public setParameters(parameters: Partial<UserParameters>): void {
    this.store.update({ ...parameters });
  }

  private startParametersListener() {
    combineLatest([ this.usersQuery.query$, this.usersQuery.page$ ])
      .subscribe(([ query, page ]) => this.getUsers({ query, page }));
  }

  private getUsers(userParameters: Partial<UserParameters>): void {
    const url = environment.apis.user;
    const params = this.getParameters(userParameters);

    this.store.setLoading(true);
    this.http.get<UserResponse>(url, { params })
      .subscribe(
        (response: UserResponse) => {
          this.store.update({ ...response});
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
