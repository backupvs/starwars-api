import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Planet } from "../../planets/entities/planet.entity";
import { Person } from "../../people/entities/person.entity";
import { Film } from "../../films/entities/film.entity";

@Entity({ name: 'species' })
export class Species {

    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column()
    readonly name: string;

    @Column()
    readonly classification: string;

    @Column()
    readonly designation: string;

    @Column()
    readonly averageHeight: string;

    @Column()
    readonly averageLifespan: string;

    @Column()
    readonly eyeColors: string;

    @Column()
    readonly hairColors: string;

    @Column()
    readonly skinColors: string;

    @Column()
    readonly language: string;

    // Planet - Species
    @ManyToOne(
        type => Planet,
        {
            nullable: true,
            onDelete: "SET NULL"
        }
    )
    readonly homeworld: Planet;

    // Species - People
    @ManyToMany(
        type => Person,
        person => person.species,
    )
    @JoinTable()
    readonly people: Person[];

    // Films - Species
    @ManyToMany(
        type => Film,
        film => film.species
    )
    readonly films: Film[];
}