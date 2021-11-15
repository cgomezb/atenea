import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { SearchControlComponent } from './search-control/search-control.component';
import { FormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [
    LoaderComponent,
    SearchControlComponent,
    ListComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    LoaderComponent,
    SearchControlComponent,
    ListComponent,
    PaginationComponent
  ]
})

export class SharedModule {}
