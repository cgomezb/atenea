import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Page, User } from '@atenea/api-interfaces';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserService, UserQuery } from '.';

@Component({
  selector: 'atenea-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UserComponent implements OnDestroy {
  destroy$ = new Subject<string>();

  constructor(
    private userService: UserService,
    public userQuery: UserQuery
  ) {}

  onSearchChanged(query: string): void {
    this.userService.setParameters({ query });
  }

  onPageChanged(): void {
    const page: Page = { page: 2, offset: 10, count: 10 };
    this.userService.setParameters({ page });
  }

  onUserCreated(): void {
    const user: User = {
      name: "Jackson Lee", 
      email: "jlee@email.com"
    };
  
    this.userService.createUser(user)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => console.log('Created'),
        (err) => console.log(`Error deleting user: ${err}`)
      );
  }

  onUserDeleted(): void {
    const userId = 'de45deee-f0d4-4ead-a0d8-644d4ccda8c6';
  
    this.userService.deleteUser(userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => console.log('Deleted'),
        (err) => console.log(`Error deleting user: ${err}`)
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
