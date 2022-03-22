import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { mockValidCreateUserPayload } from 'test/mocks/unit/users.mock';
import { UserController } from './users.controller';
import { UserService } from './users.service';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const user: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, PrismaService],
    }).compile();

    userController = user.get<UserController>(UserController);
    userService = user.get<UserService>(UserService);
  });

  describe('create user', () => {
    beforeEach(jest.clearAllMocks);

    it('should return the created user with ID', () => {
      userService.createUser = jest
        .fn()
        .mockReturnValue({ ...mockValidCreateUserPayload });
      expect(
        userController.createUser(mockValidCreateUserPayload),
      ).toStrictEqual({
        ...mockValidCreateUserPayload,
      });
    });

    it('should throw if user service returns an unexpected error', () => {
      userService.createUser = jest
        .fn()
        .mockReturnValue(Promise.reject('error'));
      return expect(
        userController.createUser(mockValidCreateUserPayload),
      ).rejects.toEqual('error');
    });
  });
});
