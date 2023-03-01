import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'people' })
export class Person {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column()
    readonly name: string;

    @Column()
    readonly height: number;
    
    @Column()
    readonly mass: number;
    
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

    @Column()
    readonly homeworld: string; // Planet
    
    @Column('text', { array: true })
    readonly films: string[]; // Film[]
    
    @Column('text', { array: true })
    readonly species: string[]; // Species[]
    
    @Column('text', { array: true })
    readonly vehicles: string[]; // Vehicle[]
    
    @Column('text', { array: true })
    readonly starships: string[]; // Starship[]
}