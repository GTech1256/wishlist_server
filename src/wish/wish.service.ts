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

  async create(createWishDto: CreateWishDto, userId: number) {
    const wish = this.wishRepository.create({
      user: { id: userId },
      ...createWishDto,
    });

    return this.wishRepository.save(wish);
  }

  findOnePublic(id: number) {
    return this.wishRepository.findOneBy({ id, isPublic: true });
  }

  private findOneWishGuardUser(id: number, userId: number) {
    return this.wishRepository.findOneBy({ id, user: { id: userId } });
  }

  findAllByUserId(userID: number) {
    return this.wishRepository.find({ where: { user: { id: userID } } });
  }

  async update(id: number, updateWishDto: UpdateWishDto, userId: number) {
    const wish = await this.findOneWishGuardUser(id, userId);
    if (!wish) {
      throw new NotFoundException();
    }

    Object.assign(wish, updateWishDto);

    return this.wishRepository.save(wish);
  }

  async remove(id: number, userId: number) {
    const wish = await this.findOneWishGuardUser(id, userId);
    if (!wish) {
      throw new NotFoundException();
    }

    return this.wishRepository.remove(wish);
  }

  findAllPublic() {
    return this.wishRepository.find({ where: { isPublic: true } });
  }
}
