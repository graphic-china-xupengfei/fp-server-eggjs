import { provide } from 'midway';
import { IUserService, IUserOptions, IUserResult } from '../interface/user';

@provide('userService')
export default class UserService implements IUserService {
  async getUser(options: IUserOptions): Promise<IUserResult> {
    return {
      id: options.id,
      username: 'mockedName',
      phone: '12345678901',
      email: 'xxx.xxx@xxx.com',
    };
  }
}
