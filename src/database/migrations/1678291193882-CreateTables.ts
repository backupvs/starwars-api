import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1678291193882 implements MigrationInterface {
    name = 'CreateTables1678291193882'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "planets" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "rotationPeriod" character varying NOT NULL, "orbitalPeriod" character varying NOT NULL, "diameter" character varying NOT NULL, "gravity" character varying NOT NULL, "population" character varying NOT NULL, "climate" character varying NOT NULL, "terrain" character varying NOT NULL, "surfaceWater" character varying NOT NULL, CONSTRAINT "UQ_70a170f032a2ca04a6ec6eb2d98" UNIQUE ("name"), CONSTRAINT "PK_d5fbc2513a6d4909fe31938b0fd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "species" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "classification" character varying NOT NULL, "designation" character varying NOT NULL, "averageHeight" character varying NOT NULL, "averageLifespan" character varying NOT NULL, "eyeColors" character varying NOT NULL, "hairColors" character varying NOT NULL, "skinColors" character varying NOT NULL, "language" character varying NOT NULL, "homeworldId" integer, CONSTRAINT "UQ_1adf701cac3b2c0f8bacb54774b" UNIQUE ("name"), CONSTRAINT "PK_ae6a87f2423ba6c25dc43c32770" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vehicles" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "model" character varying NOT NULL, "vehicleClass" character varying NOT NULL, "manufacturer" character varying NOT NULL, "length" character varying NOT NULL, "costInCredits" character varying NOT NULL, "crew" character varying NOT NULL, "passengers" character varying NOT NULL, "maxAtmospheringSpeed" character varying NOT NULL, "cargoCapacity" character varying NOT NULL, "consumables" character varying NOT NULL, CONSTRAINT "UQ_aa397b791341ed3615397050d4b" UNIQUE ("name"), CONSTRAINT "PK_18d8646b59304dce4af3a9e35b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "starships" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "model" character varying NOT NULL, "starshipClass" character varying NOT NULL, "manufacturer" character varying NOT NULL, "costInCredits" character varying NOT NULL, "length" character varying NOT NULL, "crew" character varying NOT NULL, "passengers" character varying NOT NULL, "maxAtmospheringSpeed" character varying NOT NULL, "hyperdriveRating" character varying NOT NULL, "mglt" character varying NOT NULL, "cargoCapacity" character varying NOT NULL, "consumables" character varying NOT NULL, CONSTRAINT "UQ_41580e76da7903fb3827a3510eb" UNIQUE ("name"), CONSTRAINT "PK_10c86d0ac9be05d3f986287a092" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "films" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "episodeId" integer NOT NULL, "openingCrawl" character varying NOT NULL, "director" character varying NOT NULL, "producer" character varying NOT NULL, "releaseDate" date NOT NULL, CONSTRAINT "UQ_ef6e0245decf772d1dd66f158ae" UNIQUE ("title"), CONSTRAINT "PK_697487ada088902377482c970d1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "people" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "height" character varying NOT NULL, "mass" character varying NOT NULL, "hairColor" character varying NOT NULL, "skinColor" character varying NOT NULL, "eyeColor" character varying NOT NULL, "birthYear" character varying NOT NULL, "gender" character varying NOT NULL, "homeworldId" integer, CONSTRAINT "UQ_e7ec00b080e693706a6eaa6d317" UNIQUE ("name"), CONSTRAINT "PK_aa866e71353ee94c6cc51059c5b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "species_people_people" ("speciesId" integer NOT NULL, "peopleId" integer NOT NULL, CONSTRAINT "PK_4e29c7c9d8235a1b0737874ce6a" PRIMARY KEY ("speciesId", "peopleId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_62c0a74121aa06cdea24bc1e58" ON "species_people_people" ("speciesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4c896768b50c46acd8b611917e" ON "species_people_people" ("peopleId") `);
        await queryRunner.query(`CREATE TABLE "films_planets_planets" ("filmsId" integer NOT NULL, "planetsId" integer NOT NULL, CONSTRAINT "PK_a5a8f53f9e8b8e7a870dc8a6160" PRIMARY KEY ("filmsId", "planetsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_59f34f486757575a016c375061" ON "films_planets_planets" ("filmsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_956e9e10fd96ed618538bb2b96" ON "films_planets_planets" ("planetsId") `);
        await queryRunner.query(`CREATE TABLE "films_species_species" ("filmsId" integer NOT NULL, "speciesId" integer NOT NULL, CONSTRAINT "PK_b16e4a6a250dfe1872c561203d0" PRIMARY KEY ("filmsId", "speciesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_be1d816ce6bdc4677080067eb4" ON "films_species_species" ("filmsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_6042e3f9819bb64e4264509f73" ON "films_species_species" ("speciesId") `);
        await queryRunner.query(`CREATE TABLE "films_vehicles_vehicles" ("filmsId" integer NOT NULL, "vehiclesId" integer NOT NULL, CONSTRAINT "PK_78db1bf247c879baf20c6c9c2af" PRIMARY KEY ("filmsId", "vehiclesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_21c53d0d80b975c872a4ca4ada" ON "films_vehicles_vehicles" ("filmsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a623eaa88213329f69118cdea5" ON "films_vehicles_vehicles" ("vehiclesId") `);
        await queryRunner.query(`CREATE TABLE "films_starships_starships" ("filmsId" integer NOT NULL, "starshipsId" integer NOT NULL, CONSTRAINT "PK_f7c410e6e8b54adc51f99e0f386" PRIMARY KEY ("filmsId", "starshipsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3965a3d69c030eca6799a06d9d" ON "films_starships_starships" ("filmsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e79353f238988153784b207757" ON "films_starships_starships" ("starshipsId") `);
        await queryRunner.query(`CREATE TABLE "people_films_films" ("peopleId" integer NOT NULL, "filmsId" integer NOT NULL, CONSTRAINT "PK_a42b8c227444fd500c1b78979da" PRIMARY KEY ("peopleId", "filmsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_be3d4bf0a2a829c091594359de" ON "people_films_films" ("peopleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_80ce66926f5e215472c235a3a6" ON "people_films_films" ("filmsId") `);
        await queryRunner.query(`CREATE TABLE "people_vehicles_vehicles" ("peopleId" integer NOT NULL, "vehiclesId" integer NOT NULL, CONSTRAINT "PK_69addbf10105a9276f277fae411" PRIMARY KEY ("peopleId", "vehiclesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a7b8cbe95c602d58ade9845ce6" ON "people_vehicles_vehicles" ("peopleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f872d6f9465604601135f41970" ON "people_vehicles_vehicles" ("vehiclesId") `);
        await queryRunner.query(`CREATE TABLE "people_starships_starships" ("peopleId" integer NOT NULL, "starshipsId" integer NOT NULL, CONSTRAINT "PK_fd849a9c3ab64a62004d47402bb" PRIMARY KEY ("peopleId", "starshipsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_78e90ed25ace2390fa2c7a4d50" ON "people_starships_starships" ("peopleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0a5517fc734c462fc3a0d32eb9" ON "people_starships_starships" ("starshipsId") `);
        await queryRunner.query(`ALTER TABLE "species" ADD CONSTRAINT "FK_3427f7c92316561d7131c296bc6" FOREIGN KEY ("homeworldId") REFERENCES "planets"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "people" ADD CONSTRAINT "FK_8f79bb098a482fa585da15ef3a6" FOREIGN KEY ("homeworldId") REFERENCES "planets"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "species_people_people" ADD CONSTRAINT "FK_62c0a74121aa06cdea24bc1e584" FOREIGN KEY ("speciesId") REFERENCES "species"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "species_people_people" ADD CONSTRAINT "FK_4c896768b50c46acd8b611917e1" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "films_planets_planets" ADD CONSTRAINT "FK_59f34f486757575a016c3750616" FOREIGN KEY ("filmsId") REFERENCES "films"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "films_planets_planets" ADD CONSTRAINT "FK_956e9e10fd96ed618538bb2b96c" FOREIGN KEY ("planetsId") REFERENCES "planets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "films_species_species" ADD CONSTRAINT "FK_be1d816ce6bdc4677080067eb4b" FOREIGN KEY ("filmsId") REFERENCES "films"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "films_species_species" ADD CONSTRAINT "FK_6042e3f9819bb64e4264509f73e" FOREIGN KEY ("speciesId") REFERENCES "species"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "films_vehicles_vehicles" ADD CONSTRAINT "FK_21c53d0d80b975c872a4ca4ada3" FOREIGN KEY ("filmsId") REFERENCES "films"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "films_vehicles_vehicles" ADD CONSTRAINT "FK_a623eaa88213329f69118cdea5d" FOREIGN KEY ("vehiclesId") REFERENCES "vehicles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "films_starships_starships" ADD CONSTRAINT "FK_3965a3d69c030eca6799a06d9d7" FOREIGN KEY ("filmsId") REFERENCES "films"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "films_starships_starships" ADD CONSTRAINT "FK_e79353f238988153784b207757c" FOREIGN KEY ("starshipsId") REFERENCES "starships"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "people_films_films" ADD CONSTRAINT "FK_be3d4bf0a2a829c091594359de7" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "people_films_films" ADD CONSTRAINT "FK_80ce66926f5e215472c235a3a61" FOREIGN KEY ("filmsId") REFERENCES "films"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "people_vehicles_vehicles" ADD CONSTRAINT "FK_a7b8cbe95c602d58ade9845ce63" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "people_vehicles_vehicles" ADD CONSTRAINT "FK_f872d6f9465604601135f419704" FOREIGN KEY ("vehiclesId") REFERENCES "vehicles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "people_starships_starships" ADD CONSTRAINT "FK_78e90ed25ace2390fa2c7a4d50c" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "people_starships_starships" ADD CONSTRAINT "FK_0a5517fc734c462fc3a0d32eb99" FOREIGN KEY ("starshipsId") REFERENCES "starships"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "people_starships_starships" DROP CONSTRAINT "FK_0a5517fc734c462fc3a0d32eb99"`);
        await queryRunner.query(`ALTER TABLE "people_starships_starships" DROP CONSTRAINT "FK_78e90ed25ace2390fa2c7a4d50c"`);
        await queryRunner.query(`ALTER TABLE "people_vehicles_vehicles" DROP CONSTRAINT "FK_f872d6f9465604601135f419704"`);
        await queryRunner.query(`ALTER TABLE "people_vehicles_vehicles" DROP CONSTRAINT "FK_a7b8cbe95c602d58ade9845ce63"`);
        await queryRunner.query(`ALTER TABLE "people_films_films" DROP CONSTRAINT "FK_80ce66926f5e215472c235a3a61"`);
        await queryRunner.query(`ALTER TABLE "people_films_films" DROP CONSTRAINT "FK_be3d4bf0a2a829c091594359de7"`);
        await queryRunner.query(`ALTER TABLE "films_starships_starships" DROP CONSTRAINT "FK_e79353f238988153784b207757c"`);
        await queryRunner.query(`ALTER TABLE "films_starships_starships" DROP CONSTRAINT "FK_3965a3d69c030eca6799a06d9d7"`);
        await queryRunner.query(`ALTER TABLE "films_vehicles_vehicles" DROP CONSTRAINT "FK_a623eaa88213329f69118cdea5d"`);
        await queryRunner.query(`ALTER TABLE "films_vehicles_vehicles" DROP CONSTRAINT "FK_21c53d0d80b975c872a4ca4ada3"`);
        await queryRunner.query(`ALTER TABLE "films_species_species" DROP CONSTRAINT "FK_6042e3f9819bb64e4264509f73e"`);
        await queryRunner.query(`ALTER TABLE "films_species_species" DROP CONSTRAINT "FK_be1d816ce6bdc4677080067eb4b"`);
        await queryRunner.query(`ALTER TABLE "films_planets_planets" DROP CONSTRAINT "FK_956e9e10fd96ed618538bb2b96c"`);
        await queryRunner.query(`ALTER TABLE "films_planets_planets" DROP CONSTRAINT "FK_59f34f486757575a016c3750616"`);
        await queryRunner.query(`ALTER TABLE "species_people_people" DROP CONSTRAINT "FK_4c896768b50c46acd8b611917e1"`);
        await queryRunner.query(`ALTER TABLE "species_people_people" DROP CONSTRAINT "FK_62c0a74121aa06cdea24bc1e584"`);
        await queryRunner.query(`ALTER TABLE "people" DROP CONSTRAINT "FK_8f79bb098a482fa585da15ef3a6"`);
        await queryRunner.query(`ALTER TABLE "species" DROP CONSTRAINT "FK_3427f7c92316561d7131c296bc6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0a5517fc734c462fc3a0d32eb9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_78e90ed25ace2390fa2c7a4d50"`);
        await queryRunner.query(`DROP TABLE "people_starships_starships"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f872d6f9465604601135f41970"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a7b8cbe95c602d58ade9845ce6"`);
        await queryRunner.query(`DROP TABLE "people_vehicles_vehicles"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_80ce66926f5e215472c235a3a6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_be3d4bf0a2a829c091594359de"`);
        await queryRunner.query(`DROP TABLE "people_films_films"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e79353f238988153784b207757"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3965a3d69c030eca6799a06d9d"`);
        await queryRunner.query(`DROP TABLE "films_starships_starships"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a623eaa88213329f69118cdea5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_21c53d0d80b975c872a4ca4ada"`);
        await queryRunner.query(`DROP TABLE "films_vehicles_vehicles"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6042e3f9819bb64e4264509f73"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_be1d816ce6bdc4677080067eb4"`);
        await queryRunner.query(`DROP TABLE "films_species_species"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_956e9e10fd96ed618538bb2b96"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_59f34f486757575a016c375061"`);
        await queryRunner.query(`DROP TABLE "films_planets_planets"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4c896768b50c46acd8b611917e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_62c0a74121aa06cdea24bc1e58"`);
        await queryRunner.query(`DROP TABLE "species_people_people"`);
        await queryRunner.query(`DROP TABLE "people"`);
        await queryRunner.query(`DROP TABLE "films"`);
        await queryRunner.query(`DROP TABLE "starships"`);
        await queryRunner.query(`DROP TABLE "vehicles"`);
        await queryRunner.query(`DROP TABLE "species"`);
        await queryRunner.query(`DROP TABLE "planets"`);
    }

}
