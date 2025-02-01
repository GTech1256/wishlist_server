import { ExecutionContext } from '@nestjs/common';
import { TelegramAuthenticatorGuard } from './auth.guard';
import * as crypto from 'crypto';

describe('TelegramAuthenticatorGuard', () => {
  let guard: TelegramAuthenticatorGuard;
  let mockContext: ExecutionContext;
  let mockRequest: any;

  beforeEach(() => {
    guard = new TelegramAuthenticatorGuard();
    mockRequest = {
      headers: {},
      user: null,
    };
    mockContext = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
    } as ExecutionContext;
  });

  it('должен возвращать false, если init-data отсутствует', () => {
    const result = guard.canActivate(mockContext);
    expect(result).toBe(false);
  });

  it('должен возвращать false при неверных данных инициализации', () => {
    mockRequest.headers['init-data'] = 'invalid_init_data';
    const result = guard.canActivate(mockContext);
    expect(result).toBe(false);
  });

  it('должен корректно устанавливать данные пользователя при валидной init-data', () => {
    const mockUser = {
      id: 123456789,
      first_name: 'John',
      last_name: 'Doe',
      username: 'johndoe',
    };

    const mockInitData = createMockInitData(mockUser);
    mockRequest.headers['init-data'] = mockInitData;

    const result = guard.canActivate(mockContext);

    expect(result).toBe(true);
    expect(mockRequest.user).toEqual({
      id: mockUser.id,
      name: mockUser.first_name,
      lastName: mockUser.last_name,
      username: mockUser.username,
    });
  });
});

function createMockInitData(user: any): string {
  const authDate = Math.floor(Date.now() / 1000);
  const params = new URLSearchParams({
    query_id: '123456',
    user: JSON.stringify(user),
    auth_date: authDate.toString(),
  });

  const dataCheckString = Array.from(params.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');

  const secret = crypto
    .createHmac('sha256', 'WebAppData')
    .update('6709137928:AAG4U2-yhB6nHh4y4EmfGNDfQelmuhB8GkA');
  const hash = crypto
    .createHmac('sha256', secret.digest())
    .update(dataCheckString)
    .digest('hex');

  params.append('hash', hash);
  return params.toString();
}
