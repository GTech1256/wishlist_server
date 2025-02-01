import { Injectable, NotFoundException } from '@nestjs/common';
import { Collection } from './entities/collection.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { CreateCollectionDto } from './dto/create-collection.dto';

@Injectable()
export class CollectionService {
  constructor(
    @InjectRepository(Collection)
    private readonly collectionRepository: Repository<Collection>,
  ) {}

  async create(createCollectionDto: CreateCollectionDto) {
    const collection = this.collectionRepository.create(createCollectionDto);

    return this.collectionRepository.save(collection);
  }

  findOne(id: number) {
    return this.collectionRepository.findOneBy({ id });
  }

  findAllByUserId(userID: number) {
    return this.collectionRepository.find({ where: { user: { id: userID } } });
  }

  async update(id: number, updateCollectionDto: UpdateCollectionDto) {
    const collection = await this.findOne(id);
    if (!collection) {
      throw new NotFoundException();
    }

    Object.assign(collection, updateCollectionDto);

    return this.collectionRepository.save(collection);
  }

  async remove(id: number) {
    const collection = await this.findOne(id);
    if (!collection) {
      throw new NotFoundException();
    }

    return this.collectionRepository.remove(collection);
  }
}
