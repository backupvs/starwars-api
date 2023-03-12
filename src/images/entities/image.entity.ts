import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Planet } from "../../resources/planets/entities/planet.entity";
import { Species } from "../../resources/species/entities/species.entity";
import { Film } from "../../resources/films/entities/film.entity";
import { Person } from "../../resources/people/entities/person.entity";
import { Starship } from "../../resources/starships/entities/starship.entity";
import { Vehicle } from "../../resources/vehicles/entities/vehicle.entity";

@Entity({ name: 'images' })
export class Image {
    
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column({ unique: true })
    readonly key: string;
    
    @Column()
    readonly imageUrl: string;

    @ManyToOne(
        type => Film,
        film => film.images
    )
    readonly film: Film;

    @ManyToOne(
        type => Person,
        person => person.images
    )
    readonly person: Person;

    @ManyToOne(
        type => Planet,
        planet => planet.images
    )
    readonly planet: Planet;

    @ManyToOne(
        type => Species,
        species => species.images
    )
    readonly species: Species;

    @ManyToOne(
        type => Starship,
        starship => starship.images
    )
    readonly starship: Starship;

    @ManyToOne(
        type => Vehicle,
        vehicle => vehicle.images
    )
    readonly vehicle: Vehicle;
}