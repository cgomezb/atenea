import { Injectable } from '@nestjs/common';
import { CreateUserResponse, DeleteUserResponse, User, UserQueryParameters, UserResponse } from '@atenea/api-interfaces';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AppService {
  private users: User[] = [
    {
      id: 'de45deee-f0d4-4ead-a0d8-644d4ccda8c6',
      avatar: '1',
      name: 'John Smith',
      email: 'jsmith@email.com',
      learnings: ['Angular', 'React']
    }
  ];

  public getUsers({ query, offset, count }: UserQueryParameters): UserResponse {
    const filtered = this.users.filter(user => user.name.search(new RegExp(query, 'gi')) >= 0 ||
      user.email.search(new RegExp(query, 'gi')) >= 0);

    const paged = filtered.slice(parseInt(offset), parseInt(offset) + parseInt(count));

    return {
      users: paged,
      totalCount: filtered.length
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
