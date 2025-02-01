import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WishModule } from './wish/wish.module';
import { CollectionModule } from './collection/collection.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wish } from './wish/entities/wish.entity';
import { User } from './user/entities/user.entity';
import { Collection } from './collection/entities/collection.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'wishlist',
      entities: [User, Wish, Collection],
      synchronize: true,
    }),
    WishModule,
    CollectionModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
