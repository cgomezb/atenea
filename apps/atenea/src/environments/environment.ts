const origin = 'http://localhost:4200';

export const environment = {
  production: false,
  apis: {
    user: `${origin}/api/users`,
    learning: `${origin}/api/learning`
  }
};
