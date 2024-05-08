import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let userServiceMock: Partial<UserService>;

  beforeEach(async () => {
    userServiceMock = {
      getAllUsers: jest.fn().mockResolvedValue([
        {
          _id: '1',
          email: 'user1@example.com',
          name: 'User 1',
        },
        {
          _id: '2',
          email: 'user2@example.com',
          name: 'User 2',
        },
      ]),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: userServiceMock }],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllUsers', () => {
    it('should return an array of users', async () => {
      const users = await controller.getAllUsers();
      expect(users).toHaveLength(2);
      expect(users[0]).toHaveProperty('_id', '1');
      expect(users[1]).toHaveProperty('_id', '2');
    });
  });
});
