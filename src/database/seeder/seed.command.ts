import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { SeederService } from './seeder.service';

@Injectable()
export class SeedCommand {
    constructor(
        private readonly seederService: SeederService
    ) {}

    @Command({ command: 'seeder:seed', describe: 'Seeds database with data from swapi.dev' })
    async seed(): Promise<void> {
        try {
            let start = Date.now();
            await this.seederService.seed();
            console.log(`Success. Estimated: ${(Date.now() - start) / 1000}s`);
        } catch (err) {
            console.log('Error', err.message);
        }
    }
}