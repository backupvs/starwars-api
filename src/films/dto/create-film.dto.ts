export class CreateFilmDto {
    readonly title: string;
    readonly episodeId: number;
    readonly openingCrawl: string;
    readonly director: string;
    readonly producer: string;
    readonly releaseDate: Date;
    readonly characters: string[] // People[]
    readonly planets: string[] // Planet[]
    readonly starships: string[] // Starship[]
    readonly vehicles: string[] // Vehicle[]
    readonly species: string[] // Species[]
}