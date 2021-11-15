import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { SearchControlComponent } from './search-control/search-control.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoaderComponent,
    SearchControlComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    LoaderComponent,
    SearchControlComponent
  ]
})

export class SharedModule {}
