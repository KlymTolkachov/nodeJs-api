import { User, UserModel } from '../models';
import { HttpError } from '../common/errors';

export class UserService {
  async addUser(params: User): Promise<User> {
    const user = await UserModel.exists({ login: params.login });

    if (user) {
      throw new HttpError(
        409,
        'User with this name already exists',
        'Register',
      );
    }
    return UserModel.create({ ...params });
  }

  async userLogin(login: string, password: string): Promise<User | null> {
    const user = await UserModel.findOne({ login, password });
    if (!user) {
      throw new HttpError(404, 'User Not Found', 'Login');
    }
    return user;
  }
}

export const userService = new UserService();
