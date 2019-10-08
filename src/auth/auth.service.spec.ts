import { Test } from '@nestjs/testing';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';
import { UnauthorizedException } from '@nestjs/common';

const mockUserRepository = () => ({
  signIn: jest.fn(),
  signUp: jest.fn(),
  validateUserPassword: jest.fn(),
});

const mockJwtService = () => ({ sign: jest.fn() });

describe('AuthService', () => {
  const authCredentialsDto: AuthCredentialsDto = {
    username: 'TestUser',
    password: 'TestPassword123',
  };
  let userRepository;
  let jwtService;
  let authService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserRepository, useFactory: mockUserRepository },
        { provide: JwtService, useFactory: mockJwtService },
      ],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
    jwtService = module.get<JwtService>(JwtService);
    authService = module.get<AuthService>(AuthService);
  });

  describe('signUp', () => {
    it('calls userRepository with the authCredentialsDto', async () => {
      await authService.signUp(authCredentialsDto);
      expect(userRepository.signUp).toHaveBeenCalledWith(authCredentialsDto);
    });
  });

  describe('signIn', () => {
    it('returns a jwt access token on successful sign in', async () => {
      userRepository.validateUserPassword.mockResolvedValue('testUser');
      jwtService.sign.mockReturnValue('testUserJwt');

      const jwt = await authService.signIn(authCredentialsDto);

      expect(jwt).toEqual({ accessToken: 'testUserJwt' });
    });

    it('throws an UnauthorizedException if the password is incorrect', async () => {
      userRepository.validateUserPassword.mockResolvedValue(null);
      await expect(authService.signIn(authCredentialsDto)).rejects.toThrow(UnauthorizedException);
    });
  });
});
