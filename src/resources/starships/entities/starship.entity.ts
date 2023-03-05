import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Film } from "../../films/entities/film.entity";
import { Person } from "../../people/entities/person.entity";

@Entity({ name: 'starships' })
export class Starship {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column()
    readonly name: string;

    @Column()
    readonly model: string;

    @Column()
    readonly starshipClass: string;

    @Column()
    readonly manufacturer: string;

    @Column()
    readonly costInCredits: string;

    @Column()
    readonly length: string;

    @Column()
    readonly crew: string;

    @Column()
    readonly passengers: string;

    @Column()
    readonly maxAtmospheringSpeed: string;

    @Column()
    readonly hyperdriveRating: string;

    @Column()
    readonly mglt: string;

    @Column()
    readonly cargoCapacity: string;

    @Column()
    readonly consumables: string;

    // Films - Starships
    @ManyToMany(
        type => Film,
        films => films.starships
    )
    readonly films: Film[];

    // People - Starships
    @ManyToMany(
        type => Person,
        person => person.starships
    )
    readonly pilots: Person[];
}
