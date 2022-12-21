import { IsInt, IsDefined, IsString } from "class-validator";
import "./";

export class Post {
    @IsDefined()
    @IsInt()
    id!: number;

    @IsDefined()
    @IsString()
    title!: string;

    @IsDefined()
    @IsString()
    text!: string;

    @IsDefined()
    @IsString()
    tags!: string;
}
