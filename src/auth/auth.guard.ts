import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { RequestUser } from './types';

const BOT_TOKEN = '6709137928:AAG4U2-yhB6nHh4y4EmfGNDfQelmuhB8GkA';

// const expirationTime = 300; // Adjust as needed, 300 seconds = 5 minutes

const verifyInitData = (telegramInitData: string): boolean => {
  const urlParams = new URLSearchParams(telegramInitData);

  const hash = urlParams.get('hash');
  urlParams.delete('hash');
  urlParams.sort();

  let dataCheckString = '';
  for (const [key, value] of urlParams.entries()) {
    dataCheckString += `${key}=${value}\n`;
  }
  dataCheckString = dataCheckString.slice(0, -1);

  const secret = crypto.createHmac('sha256', 'WebAppData').update(BOT_TOKEN);
  const calculatedHash = crypto
    .createHmac('sha256', secret.digest())
    .update(dataCheckString)
    .digest('hex');

  return calculatedHash === hash;
};

@Injectable()
export class TelegramAuthenticatorGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const telegramInitData = request.headers?.['init-data'];

      if (!telegramInitData) {
        return false;
      }

      const isVerify = verifyInitData(telegramInitData);

      if (isVerify) {
        const user = JSON.parse(
          new URLSearchParams(telegramInitData).get('user'),
        );
        const { id, first_name } = user;

        const requestUser: RequestUser = {
          id,
          name: first_name,
        };

        request.user = requestUser;
        return true;
      }

      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
