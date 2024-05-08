import {
  Controller,
  Get
} from '@nestjs/common';

import { User } from './user.model';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly profilesService: UserService) { }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.profilesService.getAllUsers();
  }
}
