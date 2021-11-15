import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserRoutingModule } from "./user-routing.module";
import { UserComponent } from '.';
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    UserRoutingModule,
    CommonModule,
    SharedModule
  ]
})

export class UserModule {}
