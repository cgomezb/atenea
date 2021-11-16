import { Injectable } from '@nestjs/common';
import { CreateUserResponse, DeleteUserResponse, User, UserParameters, UserResponse } from '@atenea/api-interfaces';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AppService {
  private users: User[] = [
    {
      id: 'de45deee-f0d4-4ead-a0d8-644d4ccda8c6',
      name: 'John Smith',
      email: 'jsmith@email.com',
      learnings: ['Angular', 'React']
    },
    {
      id: 'de45deee-f0d4-4ead-a0d8-644d4ccda0d8',
      name: 'Clare Smith',
      email: 'csmith@email.com',
      learnings: []
    }
  ];

  public getUsers(userParameters: UserParameters): UserResponse {
    console.log(userParameters);

    return {
      users: this.users,
      totalCount: this.users.length
    };
  }

  public createUser(user: User): CreateUserResponse {
    user.id = this.generateId();
    this.users.push(user);

    return { user };
  }

  public deleteUser(userId: string): DeleteUserResponse {
    this.users = this.users.filter(user => user.id !== userId);
  
    return { userId };
  }

  private generateId(): string {
    return uuid();
  }
}
