import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';

import { CreateUserResponse, DeleteUserResponse, User, UserParameters, UserResponse } from '@atenea/api-interfaces';
import { Delay } from './../shared/decorators';
import { AppService } from './app.service';

@Controller('users/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Delay(1000)
  getUsers(@Query() userParameters: UserParameters): UserResponse {
    return this.appService.getUsers(userParameters);
  }

  @Post()
  @Delay(1000)
  createUser(@Body() user: User): CreateUserResponse {
    return this.appService.createUser(user);
  }

  @Delete(':id')
  @Delay(1000)
  deleteUser(@Param('id') userId: string): DeleteUserResponse {
    return this.appService.deleteUser(userId);
  }
}
