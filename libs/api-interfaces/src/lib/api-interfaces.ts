export interface Message {
  message: string;
}

// User
export interface User {
  id?: string;
  avatar: string;
  name: string;
  email: string;
  learnings?: string[];
}

export interface UserQueryParameters {
  query: string;
  page: string;
  offset: string;
  count: string;
}

// Parameters
export interface UserParameters {
  query: string;
  page: Page;
}

// Response
export interface UserResponse {
  users: User[];
  totalCount: number;
}

export interface CreateUserResponse {
  user: User;
}

export interface DeleteUserResponse {
  userId: string;
}


// Learning
export interface Learning {
  id: string;
  name: string;
  status: LearningStatus;
}

export enum LearningStatus {
  archive = 'archive',
  unarchive = 'unarchive'
}


//
export interface Page {
  page: number;
  count: number;
  offset: number;
}
