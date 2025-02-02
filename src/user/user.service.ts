import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UserStatsDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from 'src/wish/entities/wish.entity';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserStatsDto } from './dto/user-stats.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Wish)
    private readonly itemRepository: Repository<Wish>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getStats(userId: number): Promise<UserStatsDto> {
    const total = await this.itemRepository.findAndCount({
      where: { user: { id: userId } },
    });

    const wishPublic = await this.itemRepository.findAndCount({
      where: { user: { id: userId }, isPublic: true },
    });

    return {
      wishComplete: 0,
      wishPublic: wishPublic[1],
      wishTotal: total[1],
    };
  }

  findAll() {
    return this.userRepository.find();
  }

  public async createIfNotExist(createUserDto: CreateUserDto) {
    const user = await this.findOne(createUserDto.id);

    if (!user) {
      console.log('create user', createUserDto);
      this.create(createUserDto);
    }
  }

  private findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  private create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);

    return this.userRepository.save(user);
  }
}
