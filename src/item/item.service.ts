import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async create(createItemDto: CreateItemDto) {
    const item = this.itemRepository.create(createItemDto);

    return this.itemRepository.save(item);
  }

  findOne(id: number) {
    return this.itemRepository.findOneBy({ id });
  }

  findAllByUserId(userID: number) {
    return this.itemRepository.find({ where: { user: { id: userID } } });
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    const item = await this.findOne(id);
    if (!item) {
      throw new NotFoundException();
    }

    Object.assign(item, updateItemDto);

    return this.itemRepository.save(item);
  }

  async remove(id: number) {
    const item = await this.findOne(id);
    if (!item) {
      throw new NotFoundException();
    }

    return this.itemRepository.remove(item);
  }
}
