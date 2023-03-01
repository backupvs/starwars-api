export class CreatePersonDto {
    readonly name: string;
    readonly height: number;
    readonly mass: number;
    readonly hairColor: string;
    readonly skinColor: string;
    readonly eyeColor: string;
    readonly birthYear: string;
    readonly gender: string;
    readonly homeworld: string; // Planet
    readonly films: string[]; // Film[]
    readonly species: string[]; // Species[]
    readonly vehicles: string[]; // Vehicle[]
    readonly starships: string[]; // Starship[]
}