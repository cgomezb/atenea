import { Injectable } from '@nestjs/common';
import { LearningStatus, User, UserParameters, UserResponse } from '@atenea/api-interfaces';

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

  getUsers(userParameters: UserParameters): UserResponse {
    console.log(userParameters);

    return {
      users: this.users,
      totalCount: this.users.length
     };
  }
}
