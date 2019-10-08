import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';

const mockAuthService = () => ({
  signUp: jest.fn(),
  signIn: jest.fn(),
});

describe('Auth Controller', () => {
  const authCredentialsDto: AuthCredentialsDto = {
    username: 'TestUser',
    password: 'TestPassword123',
  };
  let controller: AuthController;
  let authService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useFactory: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('calls the AuthService.signUp function with the authCredentialsDto', () => {
    controller.signUp(authCredentialsDto);

    expect(authService.signUp).toHaveBeenCalledWith(authCredentialsDto);
  });

  it('returns a jwt access token on a successful sign in', () => {
    authService.signIn.mockReturnValue({ accessToken: '123456' });

    const token = controller.signIn(authCredentialsDto);

    expect(token).toEqual({ accessToken: '123456' });
  });
});
