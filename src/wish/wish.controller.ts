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

@Controller('wish')
export class WishController {
  constructor(private readonly wishService: WishService) {}

  @Post()
  @UseGuards(TelegramAuthenticatorGuard)
  create(@Body() createWishDto: CreateWishDto, @Request() req: RequestGuard) {
    return this.wishService.create(createWishDto, req.user.id);
  }

  @Get('user')
  @UseGuards(TelegramAuthenticatorGuard)
  findAll(@Request() req: RequestGuard) {
    return this.wishService.findAllByUserId(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wishService.findOnePublic(+id);
  }

  @Patch(':id')
  @UseGuards(TelegramAuthenticatorGuard)
  update(
    @Param('id') id: string,
    @Body() updateWishDto: UpdateWishDto,
    @Request() req: RequestGuard,
  ) {
    return this.wishService.update(+id, updateWishDto, req.user.id);
  }

  @Delete(':id')
  @UseGuards(TelegramAuthenticatorGuard)
  remove(@Param('id') id: string, @Request() req: RequestGuard) {
    return this.wishService.remove(+id, req.user.id);
  }
}
