import { DataState } from '../enum/datastate.enum';
import { Role } from './Role';
import { Category } from './category';
import { Customer } from './customer';
import { Events } from './event';
import { Product } from './product';
import { User } from './user';

export interface LoginState {
  dataState: DataState;
  loginSuccess?: boolean;
  error?: string;
  message?: string;
  isUsingMfa?: boolean;
  phone?: string;
}

export interface CustomHttpResponse<T> {
  timestamp: Date;
  statuscode: number;
  status: string;
  message: string;
  reason?: string;
  developerMessage?: string;
  data?: T;
}

export interface Profile {
  user: User;
  events?: Events[];
  roles?: Role[];
  access_token?: string;
  refresh_token?: string;
}

export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
  size: number;
  number: number;
}

export interface CustomerState {
  user: User;
  customer: Customer;
}

export interface ProductState {
  user: User;
  product: Product;
  category: Category;
}

export interface RegisterState {
  dataState: DataState;
  registerSuccess?: boolean;
  error?: string;
  message?: string;
}

export type AccountType = 'account' | 'password';

export interface VerifyState {
  dataState: DataState;
  verifySuccess?: boolean;
  error?: string;
  message?: string;
  title?: string;
  type?: AccountType;
}
