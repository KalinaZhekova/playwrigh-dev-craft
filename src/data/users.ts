const pwd = process.env.TEST_PASSWORD || 'default_test_pwd';
const pwd_empty = '';

function generateUniqueEmail(): string {
  const timestamp = Date.now();
  return `bla+${timestamp}@email.com`;
}

export const users: Users = {    
    new_user: {
      username: generateUniqueEmail(),
      password: pwd
    },
    invalid_email_user: {
      username: 'invalid_user',
      password: pwd
    },
    existing_user: {
      username: 'bazinga@gmail.com',
      password: pwd
    },
    missing_pwd_user: {
        username: generateUniqueEmail(),
        password: pwd_empty
    }


  } as const;

  export type Users = Record<'new_user' | 'invalid_email_user' | 'existing_user' | 'missing_pwd_user', User>;

  export interface User {
    username: string;
    password: string;    
  }