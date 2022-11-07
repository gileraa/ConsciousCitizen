export interface IActor {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  city: string;
  street: string;
  building: string;
  apartment: string;
  login: string;
  password: string;
  status: boolean;
  newsletter: boolean;
  role: IRole;
}

export interface IRole {
  id: number;
  name: string;
}
