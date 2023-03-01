import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PeopleModule } from './people/people.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    PeopleModule,
    ConfigModule.forRoot(),
    DatabaseModule
  ]
})
export class AppModule {}
