import { Injectable } from '@nestjs/common';
import { LearningStatus, User, UserParameters, UserResponse } from '@atenea/api-interfaces';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AppService {
  private users: User[] = [
    {
      id: '1',
      name: 'John Smith',
      email: 'jsmith@email.com',
      learnings: [
        {
          id: '1',
          name: 'Angular',
          status: LearningStatus.archive
        }
      ]
    }
  ];

  public getUsers(userParameters: UserParameters): UserResponse {
    console.log(userParameters);

    return {
      users: this.users,
      totalCount: this.users.length
    };
  }

  public createUser(user: User): User {
    console.log(user);

    user.id = this.generateId();
    this.users.push(user);

    return { ...user };
  }

  public deleteUser(userId: string): string {
    console.log(userId);
  
    this.users = this.users.filter(user => user.id !== userId);
  
    return userId;
  }

  private generateId(): string {
    return uuid();
  }
}
