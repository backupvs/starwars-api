import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { Command } from 'nestjs-command';
import { DataSource } from 'typeorm';

@Injectable()
export class TruncateDataCommand {
    constructor(
        @InjectDataSource()
        private readonly dataSource: DataSource
    ) {}

    @Command({ command: 'truncate:tables', describe: 'Removes each rows in entities tables' })
    async truncateAllTables(): Promise<void> {
        try {
            await this.dataSource.query(
                    `DO $$
                    DECLARE
                        tabname RECORD;
                    BEGIN
                    FOR tabname IN (
                        SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename IN (
                            'people', 'planets', 'films', 'species', 'vehicles', 'starships'
                        )
                    )
                        LOOP
                            EXECUTE 'TRUNCATE TABLE ' || tabname.tablename || ' CASCADE;';
                        END LOOP;   
                    END $$;`
            );
            await this.removeResourcesSeederStatus();
            console.log('Success');
        } catch (err) {
            console.log('Error', err.message);
        }
    }

    removeResourcesSeederStatus() {
        return this.dataSource.query(`DELETE FROM seeders WHERE name = 'resources'`);
    }
}
