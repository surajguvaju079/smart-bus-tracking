export interface AuthTypes {
  signIn: {
    emailOrPhone: string;
    password: string;
  };
  signUp: {
    firstName: string;
    lastName: string;
    emailOrPhone?: string;
    password: string;
  };
}
