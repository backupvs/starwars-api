import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { Person } from './entities/person.entity';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';

@Module({
    imports: [TypeOrmModule.forFeature([Person])],
    controllers: [PeopleController],
    providers: [PeopleService]
})
export class PeopleModule {}