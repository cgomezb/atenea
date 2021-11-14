import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';

import { User, UserParameters, UserResponse } from '@atenea/api-interfaces';
import { Delay } from './../shared/decorators';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('users')
  @Delay(1000)
  getUsers(@Query() userParameters: UserParameters): UserResponse {
    return this.appService.getUsers(userParameters);
  }

  @Post('users')
  @Delay(1000)
  createUser(@Body() user: User): User {
    return this.appService.createUser(user);
  }

  @Delete('users')
  @Delay(1000)
  deleteUser(@Body() userId: string): string {
    return this.appService.deleteUser(userId);
  }
}
