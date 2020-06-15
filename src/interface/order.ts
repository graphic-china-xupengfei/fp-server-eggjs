/**
 * @description User-Service parameters
 */
export interface IOrderOptions {
  id: number;
}

/**
 * @description User-Service response
 */
export interface IOrderResult {
  id: number;
  username: string;
  phone: string;
  email?: string;
}

/**
 * @description User-Service abstractions
 */
export interface IOrderService {
  list(): Promise<IOrderResult>;
}
