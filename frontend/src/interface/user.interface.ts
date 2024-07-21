export interface IUser {
  _id?: any;
  createdAt?: number;
  updatedAt?: number;
  username?: string;
  email?: string;
  fullName: string;
  description?: string;
  phoneNumber?: number;
  avatar?: string;
  role: string;
  socialMedia: {
    telegram?: string;
    whatsapp?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
  company?: string;
  job?: string;
  officeAddress?: string;
  officeNumber?: number;
  location?: string;
  subscription?: any;
  favorites?: [any];
  properties?: [any];
}
