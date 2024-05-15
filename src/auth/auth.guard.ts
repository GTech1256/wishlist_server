import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

const BOT_TOKEN = '6709137928:AAG4U2-yhB6nHh4y4EmfGNDfQelmuhB8GkA';

const expirationTime = 300; // Adjust as needed, 300 seconds = 5 minutes

@Injectable()
export class TelegramAuthenticatorGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const dataReceived = request.headers?.['init-data'];
      const { hash: receivedHash } = dataReceived;

      if (!dataReceived || !receivedHash) {
        return false;
      }

      const sortedData = Object.keys(dataReceived)
        .sort()
        .map((key) => `${key}=${dataReceived[key]}`)
        .join('\n');

      const secretKey = crypto
        .createHmac('sha256', 'WebAppData')
        .update(BOT_TOKEN)
        .digest('hex');
      const calculatedHash = crypto
        .createHmac('sha256', secretKey)
        .update(sortedData)
        .digest('hex');

      if (calculatedHash === receivedHash) {
        const authDate = parseInt(dataReceived.auth_date);
        const currentTimestamp = Math.floor(Date.now() / 1000);

        if (currentTimestamp - authDate <= expirationTime) {
          request['user'] = { id: 0 };

          return true;
        }
      }

      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
