import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Person } from "../../people/entities/person.entity";
import { Planet } from "../../planets/entities/planet.entity";
import { Species } from "../../species/entities/species.entity";

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

    @ManyToMany(
        type => Person,
        person => person.films,
        { cascade: ['insert'] }
    )
    readonly characters: Person[];

    @ManyToMany(
        type => Planet,
        planet => planet.films,
        { cascade: ['insert'] }
    )
    @JoinTable()
    readonly planets: Planet[];

    @ManyToMany(
        type => Species,
        species => species.films,
        { cascade: ['insert'] }
    )
    @JoinTable()
    readonly species: Species[];

    @Column('text', { array: true })
    readonly starships: string[]; // Starship[]

    @Column('text', { array: true })
    readonly vehicles: string[] // Vehicle[]
}