import { Component, ChangeDetectionStrategy, OnDestroy, OnInit } from '@angular/core';
import { Page, User } from '@atenea/api-interfaces';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { UserService, UserQuery, defaultPagination } from '.';
import { PageOption, pageOptions } from '../../shared/pagination/pagination-model';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { CreateUserDialogComponent } from './create-user-dialog/create-user-dialog.component';
import { DeleteDialogComponent } from '../../shared/delete-dialog/delete-dialog.component';
import { LearningDialogComponent } from './learning-dialog/learning-dialog.component';

@Component({
  selector: 'atenea-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UserComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<string>();
  headers: string[] = ['Avatar', 'Name', 'Email', 'Actions'];
  pageOptions: PageOption[] = pageOptions;

  createDialogConfig: MatDialogConfig = new MatDialogConfig();
  deleteDialogConfig: MatDialogConfig = new MatDialogConfig();
  learningDialogConfig: MatDialogConfig = new MatDialogConfig();

  constructor(
    private userService: UserService,
    public userQuery: UserQuery,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userService.setParameters({ page: defaultPagination });
    this.setCreateDialogConfiguration();
    this.setDeleteDialogConfiguration();
  }

  onSearchChanged(query: string): void {
    this.userService.setParameters({ query, page: defaultPagination });
  }

  onPageChanged(page: Page): void {
    this.userService.setParameters({ query: this.userQuery.currentQuery(), page });
  }

  onUserCreated(): void {
    const dialogRef = this.dialog.open(CreateUserDialogComponent, this.createDialogConfig);
    
    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        filter(user => Boolean(user))
      )
      .subscribe((user: User) => this.createUser(user));
  }

  onUserDeleted({ id }: User): void {
    if (!id) { return; }

    const dialogRef = this.dialog.open(DeleteDialogComponent, this.deleteDialogConfig);
    
    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        filter(toDelete => Boolean(toDelete))
      )
      .subscribe(() => this.deleteUser(id));
  }

  onLearningDialogOpened({ learnings }: User) {
    if (!learnings?.length) {
      return;
    }

    this.learningDialogConfig = {
      disableClose: true,
      autoFocus: true,
      data: {
        learnings
      }
    }

    this.dialog.open(LearningDialogComponent, this.learningDialogConfig);
  }

  private setCreateDialogConfiguration(): void {
    this.createDialogConfig = {
      disableClose: true,
      autoFocus: true,
      width: '300px',
      height: '330px'
    };
  }

  private setDeleteDialogConfiguration(): void {
    this.deleteDialogConfig = {
      disableClose: true,
      autoFocus: true,
      data: {
        title: 'Delete user',
        message: `Are you sure do you want to delete the user?`
      }
    };
  }

  private createUser(user: User): void {  
    this.userService.createUser(user)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          console.log('Created');
        },
        (err) => console.log(`Error deleting user: ${err}`)
      );
  }

  private deleteUser(id: string): void {
    if (!id) { return; }
  
    this.userService.deleteUser(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          console.log('Deleted');
        },
        (err) => console.log(`Error deleting user: ${err}`)
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
