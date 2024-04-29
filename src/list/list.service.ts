import { Injectable, NotFoundException } from '@nestjs/common';
import { List } from './entities/list.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateListDto } from './dto/update-list.dto';
import { CreateListDto } from './dto/create-list.dto';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List)
    private readonly listRepository: Repository<List>,
  ) {}

  async create(createListDto: CreateListDto) {
    const list = this.listRepository.create(createListDto);

    return this.listRepository.save(list);
  }

  findOne(id: number) {
    return this.listRepository.findOneBy({ id });
  }

  findAllByUserId(userID: number) {
    return this.listRepository.find({ where: { user: { id: userID } } });
  }

  async update(id: number, updateListDto: UpdateListDto) {
    const list = await this.findOne(id);
    if (!list) {
      throw new NotFoundException();
    }

    Object.assign(list, updateListDto);

    return this.listRepository.save(list);
  }

  async remove(id: number) {
    const list = await this.findOne(id);
    if (!list) {
      throw new NotFoundException();
    }

    return this.listRepository.remove(list);
  }
}
