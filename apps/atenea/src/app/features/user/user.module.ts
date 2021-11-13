import { NgModule } from "@angular/core";
import { UserRoutingModule } from "./user-routing.module";
import { UserComponent } from '.';

@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [UserRoutingModule]
})

export class UserModule {}
