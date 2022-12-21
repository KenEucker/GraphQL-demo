import { IsInt, IsDefined, IsString } from "class-validator";
import "./";

export class Author {
    @IsDefined()
    @IsInt()
    id!: number;

    @IsDefined()
    @IsString()
    email!: string;

    @IsDefined()
    @IsString()
    handle!: string;

    @IsDefined()
    @IsString()
    name!: string;

    @IsDefined()
    @IsString()
    avatar!: string;

    @IsDefined()
    @IsString()
    banner!: string;
}
