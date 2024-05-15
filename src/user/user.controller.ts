import {
  Controller,
  Get,
  // Post,
  // Body,
  // Patch,
  // Param,
  // Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { TelegramAuthenticatorGuard } from 'src/auth/auth.guard';
import { RequestGuard } from 'src/shared/types';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('auth/data')
  @UseGuards(TelegramAuthenticatorGuard)
  userData(@Request() req: RequestGuard) {
    this.userService.createIfNotExist(req.user);

    return req.user;
  }

  @Get('stats')
  @UseGuards(TelegramAuthenticatorGuard)
  getStats(@Request() req: RequestGuard) {
    return this.userService.getStats(req.user.id);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }
}
