import {
  BadRequestException,
  Injectable,
  Logger
} from '@nestjs/common';


import { UserDocument } from './user.model';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {

  constructor(
    private userRepository: UserRepository,
  ) { }
  private readonly logger = new Logger(UserService.name);

  get(id: string): Promise<UserDocument> {
    try {
      return this.userRepository.get(id);
    } catch (err) {
      this.logger.log('Error finding user', err);
      throw new BadRequestException(
        'Something went wrong while finding user',
      );
    }
  }

  // Fetches all users (For showing in postman)
  getAllUsers(): Promise<UserDocument[]> {
    try {
      return this.userRepository.findAll({});
    } catch (err) {
      this.logger.log('Error finding user', err);
      throw new BadRequestException(
        'Something went wrong while finding user',
      );
    }
  }
}
