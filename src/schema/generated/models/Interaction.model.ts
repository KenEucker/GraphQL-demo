import { IsInt, IsDefined, IsString, IsBoolean } from "class-validator";
import { Author, Post } from "./";

export class Interaction {
    @IsDefined()
    @IsInt()
    id!: number;

    @IsDefined()
    author!: Author;

    @IsDefined()
    @IsInt()
    authorId!: number;

    @IsDefined()
    post!: Post;

    @IsDefined()
    @IsInt()
    postId!: number;

    @IsDefined()
    @IsString()
    text!: string;

    @IsDefined()
    @IsBoolean()
    share!: boolean;

    @IsDefined()
    @IsBoolean()
    like!: boolean;
}
