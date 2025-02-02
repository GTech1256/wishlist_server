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

  async create(createCollectionDto: CreateCollectionDto): Promise<Collection> {
    const collection = this.collectionRepository.create(createCollectionDto);

    return this.collectionRepository.save(collection);
  }

  async findOne(id: number): Promise<Collection | null> {
    return this.collectionRepository.findOneBy({ id });
  }

  async findAllByUserId(userID: number): Promise<Collection[]> {
    return this.collectionRepository.find({ where: { user: { id: userID } } });
  }

  async update(
    id: number,
    updateCollectionDto: UpdateCollectionDto,
  ): Promise<Collection> {
    const collection = await this.findOne(id);
    if (!collection) {
      throw new NotFoundException();
    }

    Object.assign(collection, updateCollectionDto);

    return this.collectionRepository.save(collection);
  }

  async remove(id: number): Promise<Collection> {
    const collection = await this.findOne(id);
    if (!collection) {
      throw new NotFoundException();
    }

    return this.collectionRepository.remove(collection);
  }
}
