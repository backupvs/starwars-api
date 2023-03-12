import { Module } from '@nestjs/common';
import { StarshipsService } from './starships.service';
import { StarshipsController } from './starships.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Starship } from './entities/starship.entity';
import { Person } from '../people/entities/person.entity';
import { Film } from '../films/entities/film.entity';
import { Image } from '../../images/entities/image.entity';
import { ImagesModule } from '../../images/images.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Starship,
      Person,
      Film,
      Image
    ]),
    ImagesModule
  ],
  controllers: [StarshipsController],
  providers: [StarshipsService],
  exports: [StarshipsService]
})
export class StarshipsModule {}
