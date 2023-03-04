import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Film } from "../../films/entities/film.entity";
import { Planet } from "../../planets/entities/planet.entity";
import { Species } from "../../species/entities/species.entity";

@Entity({ name: 'people' })
export class Person {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column()
    readonly name: string;

    @Column()
    readonly height: string;

    @Column()
    readonly mass: string;

    @Column()
    readonly hairColor: string;

    @Column()
    readonly skinColor: string;

    @Column()
    readonly eyeColor: string;

    @Column()
    readonly birthYear: string;

    @Column()
    readonly gender: string;

    @ManyToOne(
        type => Planet,
        planet => planet.residents,
        { cascade: ['insert'] }
    )
    readonly homeworld: Planet;

    @ManyToMany(
        type => Film,
        film => film.characters,
        { cascade: ['insert'] }
    )
    @JoinTable()
    readonly films: Film[];

    @ManyToMany(
        type => Species,
        species => species.people,
        { cascade: ['insert'] }
    )
    readonly species: Species[];

    @Column('text', { array: true })
    readonly vehicles: string[]; // Vehicle[]

    @Column('text', { array: true })
    readonly starships: string[]; // Starship[]
}