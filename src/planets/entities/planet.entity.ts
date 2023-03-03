import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Film } from "../../films/entities/film.entity";
import { Person } from "../../people/entities/person.entity";

@Entity({ name: 'planets' })
export class Planet {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column()
    readonly name: string;

    @Column()
    readonly rotationPeriod: string;

    @Column()
    readonly orbitalPeriod: string;

    @Column()
    readonly gravity: string;

    @Column()
    readonly population: string;

    @Column()
    readonly climate: string;

    @Column()
    readonly terrain: string;

    @Column()
    readonly surfaceWater: string;

    @OneToMany(
        type => Person,
        person => person.homeworld,
        { cascade: ['insert'] }
    )
    readonly residents: Person[];

    @ManyToMany(
        type => Film,
        film => film.planets,
        { cascade: ['insert'] }
    )
    readonly films: Film[];
}