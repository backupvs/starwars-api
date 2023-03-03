import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { Person } from './entities/person.entity';
import { Film } from '../films/entities/film.entity';
import { Planet } from '../planets/entities/planet.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Person,
            Film,
            Planet
        ])
    ],
    controllers: [PeopleController],
    providers: [PeopleService]
})
export class PeopleModule {}
