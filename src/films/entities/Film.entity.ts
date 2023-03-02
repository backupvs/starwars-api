import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'films' })
export class Film {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column()
    readonly title: string;

    @Column()
    readonly episodeId: number;

    @Column()
    readonly openingCrawl: string;

    @Column()
    readonly director: string;

    @Column()
    readonly producer: string;

    @Column('date')
    readonly releaseDate: Date;

    @Column('text', { array: true })
    readonly characters: string[] // People[]

    @Column('text', { array: true })
    readonly planets: string[] // Planet[]

    @Column('text', { array: true })
    readonly starships: string[] // Starship[]

    @Column('text', { array: true })
    readonly vehicles: string[] // Vehicle[]

    @Column('text', { array: true })
    readonly species: string[] // Species[]
}