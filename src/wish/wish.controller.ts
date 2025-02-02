import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { WishService } from './wish.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { TelegramAuthenticatorGuard } from 'src/auth/auth.guard';
import { RequestGuard } from 'src/shared/types';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Wish } from './entities/wish.entity';

@Controller('wish')
export class WishController {
  constructor(private readonly wishService: WishService) {}

  @Post()
  @UseGuards(TelegramAuthenticatorGuard)
  @ApiOperation({
    summary: 'Создание желания',
    description: 'Доступно только авторизованным пользователям.',
  })
  @ApiResponse({
    status: 201,
    description: 'Желание успешно создано.',
    type: Wish,
  })
  @ApiResponse({ status: 401, description: 'Неавторизованный доступ.' })
  create(@Body() createWishDto: CreateWishDto, @Request() req: RequestGuard) {
    return this.wishService.create(createWishDto, req.user.id);
  }

  @Get('public')
  @UseGuards(TelegramAuthenticatorGuard)
  @ApiOperation({
    summary: 'Получение всех публичных желаний',
    description: 'Доступно для всех пользователей.',
  })
  @ApiResponse({
    status: 200,
    description: 'Список публичных желаний успешно получен.',
    type: [Wish],
  })
  findAllPublic() {
    return this.wishService.findAllPublic();
  }

  @Get('user')
  @UseGuards(TelegramAuthenticatorGuard)
  @ApiOperation({
    summary: 'Получение желаний пользователя',
    description: 'Доступно только авторизованным пользователям.',
  })
  @ApiResponse({
    status: 200,
    description: 'Список желаний пользователя успешно получен.',
    type: [Wish],
  })
  findAllUser(@Request() req: RequestGuard) {
    return this.wishService.findAllByUserId(req.user.id);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Получение желания по ID',
    description: 'Доступно для всех пользователей.',
  })
  @ApiResponse({
    status: 200,
    description: 'Желание успешно получено.',
    type: Wish,
  })
  @ApiResponse({ status: 404, description: 'Желание не найдено.' })
  findOne(@Param('id') id: string) {
    return this.wishService.findOnePublic(+id);
  }

  @Patch(':id')
  @UseGuards(TelegramAuthenticatorGuard)
  @ApiOperation({
    summary: 'Обновление желания',
    description: 'Доступно только авторизованным пользователям.',
  })
  @ApiResponse({
    status: 200,
    description: 'Желание успешно обновлено.',
    type: Wish,
  })
  @ApiResponse({ status: 404, description: 'Желание не найдено.' })
  @ApiResponse({ status: 401, description: 'Неавторизованный доступ.' })
  update(
    @Param('id') id: string,
    @Body() updateWishDto: UpdateWishDto,
    @Request() req: RequestGuard,
  ) {
    return this.wishService.update(+id, updateWishDto, req.user.id);
  }

  @Delete(':id')
  @UseGuards(TelegramAuthenticatorGuard)
  @ApiOperation({
    summary: 'Удаление желания',
    description: 'Доступно только авторизованным пользователям.',
  })
  @ApiResponse({
    status: 200,
    description: 'Желание успешно удалено.',
    type: Wish,
  })
  @ApiResponse({ status: 404, description: 'Желание не найдено.' })
  @ApiResponse({ status: 401, description: 'Неавторизованный доступ.' })
  remove(@Param('id') id: string, @Request() req: RequestGuard) {
    return this.wishService.remove(+id, req.user.id);
  }
}
