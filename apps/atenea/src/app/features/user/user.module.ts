import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserRoutingModule } from "./user-routing.module";
import { UserComponent } from '.';
import { SharedModule } from "../../shared/shared.module";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { CreateUserDialogComponent } from './create-user-dialog/create-user-dialog.component';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    UserComponent,
    CreateUserDialogComponent
  ],
  imports: [
    UserRoutingModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ]
})

export class UserModule {}
