import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { CollectionService } from './collection.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';

@ApiTags('collections')
@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Post()
  @ApiOperation({ summary: 'Создание новой коллекции' })
  @ApiResponse({ status: 201, description: 'Создана новая коллекция.' })
  create(@Body() createCollectionDto: CreateCollectionDto) {
    return this.collectionService.create(createCollectionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получение всех коллекций' })
  @ApiResponse({ status: 200, description: 'Получены все коллекции.' })
  findAll() {
    return this.collectionService.findAllByUserId(0);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получение коллекции по ID' })
  @ApiResponse({ status: 200, description: 'Получена коллекция по ID.' })
  @ApiResponse({ status: 404, description: 'Коллекция не найдена.' })
  findOne(@Param('id') id: string) {
    return this.collectionService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновление коллекции' })
  @ApiResponse({ status: 200, description: 'Обновлена коллекция.' })
  @ApiResponse({ status: 404, description: 'Коллекция не найдена.' })
  update(
    @Param('id') id: string,
    @Body() updateCollectionDto: UpdateCollectionDto,
  ) {
    return this.collectionService.update(+id, updateCollectionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление коллекции' })
  @ApiResponse({ status: 200, description: 'Удалена коллекция.' })
  @ApiResponse({ status: 404, description: 'Коллекция не найдена.' })
  remove(@Param('id') id: string) {
    return this.collectionService.remove(+id);
  }
}
