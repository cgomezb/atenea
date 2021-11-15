import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { SearchControlComponent } from './search-control/search-control.component';
import { FormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';
import { PaginationComponent } from './pagination/pagination.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
  declarations: [
    LoaderComponent,
    SearchControlComponent,
    ListComponent,
    PaginationComponent,
    DeleteDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule
  ],
  exports: [
    LoaderComponent,
    SearchControlComponent,
    ListComponent,
    PaginationComponent,
    DeleteDialogComponent
  ]
})

export class SharedModule {}
