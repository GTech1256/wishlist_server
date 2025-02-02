import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WishService {
  constructor(
    @InjectRepository(Wish)
    private readonly wishRepository: Repository<Wish>,
  ) {}

  async create(createWishDto: CreateWishDto, userId: number): Promise<Wish> {
    const wish = this.wishRepository.create({
      user: { id: userId },
      ...createWishDto,
    });

    return this.wishRepository.save(wish);
  }

  findOnePublic(id: number): Promise<Wish | null> {
    return this.wishRepository.findOneBy({ id, isPublic: true });
  }

  private findOneWishGuardUser(
    id: number,
    userId: number,
  ): Promise<Wish | null> {
    return this.wishRepository.findOneBy({ id, user: { id: userId } });
  }

  findAllByUserId(userID: number): Promise<Wish[]> {
    return this.wishRepository.find({ where: { user: { id: userID } } });
  }

  async update(
    id: number,
    updateWishDto: UpdateWishDto,
    userId: number,
  ): Promise<Wish> {
    const wish = await this.findOneWishGuardUser(id, userId);
    if (!wish) {
      throw new NotFoundException();
    }

    Object.assign(wish, updateWishDto);

    return this.wishRepository.save(wish);
  }

  async remove(id: number, userId: number): Promise<Wish> {
    const wish = await this.findOneWishGuardUser(id, userId);
    if (!wish) {
      throw new NotFoundException();
    }

    return this.wishRepository.remove(wish);
  }

  findAllPublic(): Promise<Wish[]> {
    return this.wishRepository
      .createQueryBuilder('wish')
      .where({ isPublic: true })
      .orderBy('wish.id', 'ASC')
      .leftJoin('wish.user', 'user')
      .select(['wish', 'user'])
      .getMany();
  }
}
