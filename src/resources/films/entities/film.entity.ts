import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Person } from "../../people/entities/person.entity";
import { Planet } from "../../planets/entities/planet.entity";
import { Species } from "../../species/entities/species.entity";
import { Vehicle } from "../../vehicles/entities/vehicle.entity";
import { Starship } from "../../starships/entities/starship.entity";

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

    // People-Films
    @ManyToMany(
        type => Person,
        person => person.films
    )
    readonly characters: Person[];

    // Films-Planets
    @ManyToMany(
        type => Planet,
        planet => planet.films
    )
    @JoinTable()
    readonly planets: Planet[];

    // Films-Species
    @ManyToMany(
        type => Species,
        species => species.films
    )
    @JoinTable()
    readonly species: Species[];
    
    // Films-Vehicles
    @ManyToMany(
        type => Vehicle,
        vehicles => vehicles.films
    )
    @JoinTable()
    readonly vehicles: Vehicle[];
    
    // Films - Starships
    @ManyToMany(
        type => Starship,
        starships => starships.films
    )
    @JoinTable()
    readonly starships: Starship[];
}