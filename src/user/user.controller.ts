import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { TelegramAuthenticatorGuard } from 'src/auth/auth.guard';
import { RequestGuard } from 'src/shared/types';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserStatsDto } from './dto/user-stats.dto';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('auth/data')
  @UseGuards(TelegramAuthenticatorGuard)
  @ApiOperation({
    summary: 'Получение данных пользователя',
    description: 'Доступно только авторизованным пользователям.',
  })
  @ApiResponse({
    status: 200,
    description: 'Данные пользователя успешно получены.',
    type: UserDto,
  })
  @ApiResponse({ status: 401, description: 'Неавторизованный доступ.' })
  userData(@Request() req: RequestGuard): UserDto {
    this.userService.createIfNotExist(req.user);

    return req.user;
  }

  @Get('stats')
  @UseGuards(TelegramAuthenticatorGuard)
  @ApiOperation({
    summary: 'Получение статистики пользователя',
    description: 'Доступно только авторизованным пользователям.',
  })
  @ApiResponse({
    status: 200,
    description: 'Статистика пользователя успешно получена.',
    type: UserStatsDto,
  })
  @ApiResponse({ status: 401, description: 'Неавторизованный доступ.' })
  getStats(@Request() req: RequestGuard) {
    return this.userService.getStats(req.user.id);
  }

  @Get()
  @ApiOperation({
    summary: 'Получение всех пользователей',
    description: 'Доступно только авторизованным пользователям.',
  })
  @ApiResponse({
    status: 200,
    description: 'Список пользователей успешно получен.',
    type: [UserDto],
  })
  findAll() {
    return this.userService.findAll();
  }
}
