import { Controller, Get, Query } from '@nestjs/common';

import { UserParameters, UserResponse } from '@atenea/api-interfaces';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('users')
  getUsers(@Query() userParameters: UserParameters): UserResponse {
    return this.appService.getUsers(userParameters);
  }
}
