import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Page } from '@atenea/api-interfaces';
import { UserService, UserQuery } from '.';

@Component({
  selector: 'atenea-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UserComponent {

  constructor(
    private userService: UserService,
    public userQuery: UserQuery
  ) {}

  onSearchChanged(): void {
    const query = 'test';
    this.userService.setParameters({ query });
  }

  onPageChanged(): void {
    const page: Page = { page: 2, offset: 10, count: 10 };
    this.userService.setParameters({ page });
  }
}
