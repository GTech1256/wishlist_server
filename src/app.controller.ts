import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('app')
@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Проверка состояния сервиса' })
  @ApiResponse({
    status: 200,
    description: 'Сервис работает корректно.',
  })
  getHello(): string {
    return 'Сервис работает корректно!';
  }
}
