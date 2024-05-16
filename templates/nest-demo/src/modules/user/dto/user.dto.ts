import { IsPositive } from "class-validator";

export class QueryUserDto {
    @IsPositive({ message: 'id must be positive' })
    id: number;
}