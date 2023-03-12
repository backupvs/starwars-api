import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Film } from "../../films/entities/film.entity";
import { Person } from "../../people/entities/person.entity";
import { Image } from "../../../images/entities/image.entity";

@Entity({ name: 'planets' })
export class Planet {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column({ unique: true })
    readonly name: string;

    @Column()
    readonly rotationPeriod: string;

    @Column()
    readonly orbitalPeriod: string;

    @Column()
    readonly diameter: string

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

    // Planet - People
    @OneToMany(
        type => Person,
        person => person.homeworld
    )
    readonly residents: Person[];

    // Films - Planets
    @ManyToMany(
        type => Film,
        film => film.planets
    )
    readonly films: Film[];

    // Images
    @OneToMany(
        type => Image,
        image => image.planet
    )
    @JoinTable()
    readonly images: Image[];
}