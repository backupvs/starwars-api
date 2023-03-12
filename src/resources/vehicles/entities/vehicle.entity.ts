import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Person } from "../../people/entities/person.entity";
import { Film } from "../../films/entities/film.entity";
import { Image } from "../../../images/entities/image.entity";

@Entity({ name: 'vehicles' })
export class Vehicle {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column({ unique: true })
    readonly name: string;

    @Column()
    readonly model: string;

    @Column()
    readonly vehicleClass: string;

    @Column()
    readonly manufacturer: string;

    @Column()
    readonly length: string;

    @Column()
    readonly costInCredits: string;

    @Column()
    readonly crew: string;

    @Column()
    readonly passengers: string;

    @Column()
    readonly maxAtmospheringSpeed: string;

    @Column()
    readonly cargoCapacity: string;

    @Column()
    readonly consumables: string;

    // Films-Vehicles
    @ManyToMany(
        type => Film,
        films => films.vehicles,
        { cascade: ['insert'] }
    )
    readonly films: Film[]; // Film[]

    // People-Vehicles
    @ManyToMany(
        type => Person,
        people => people.vehicles,
        { cascade: ['insert'] }
    )
    readonly pilots: Person[];

    // Images
    @OneToMany(
        type => Image,
        image => image.vehicle
    )
    @JoinTable()
    readonly images: Image[];
}
