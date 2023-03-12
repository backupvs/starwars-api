import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Film } from "../../films/entities/film.entity";
import { Planet } from "../../planets/entities/planet.entity";
import { Species } from "../../species/entities/species.entity";
import { Vehicle } from "../../vehicles/entities/vehicle.entity";
import { Starship } from "../../starships/entities/starship.entity";
import { Image } from "../../../images/entities/image.entity";

@Entity({ name: 'people' })
export class Person {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column({ unique: true })
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

    // Planet-People
    @ManyToOne(
        type => Planet,
        planet => planet.residents,
        {
            nullable: true,
            onDelete: "SET NULL"
        }
    )
    readonly homeworld: Planet;

    // People-Films
    @ManyToMany(
        type => Film,
        film => film.characters,
    )
    @JoinTable()
    readonly films: Film[];

    // Species-People
    @ManyToMany(
        type => Species,
        species => species.people,
    )
    readonly species: Species[];

    // People-Vehicles
    @ManyToMany(
        type => Vehicle,
        vehicles => vehicles.pilots,
    )
    @JoinTable()
    readonly vehicles: Vehicle[];

    // People - Starships
    @ManyToMany(
        type => Starship,
        starships => starships.pilots,
    )
    @JoinTable()
    readonly starships: Starship[];

    // Images
    @OneToMany(
        type => Image,
        image => image.person
    )
    @JoinTable()
    readonly images: Image[];
}