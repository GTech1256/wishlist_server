import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WishModule } from './wish/wish.module';
import { ListModule } from './list/list.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wish } from './wish/entities/wish.entity';
import { User } from './user/entities/user.entity';
import { List } from './list/entities/list.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'wishlist',
      entities: [User, Wish, List],
      synchronize: true,
    }),
    WishModule,
    ListModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
