import { IsOptional, IsPositive, Max, Min } from "class-validator";

export class PaginationQueryDto {
    @IsOptional()
    @IsPositive()
    limit?: number = 10;

    @IsOptional()
    @Min(0)
    @Max(Number.MAX_SAFE_INTEGER)
    offset?: number;
}