import { IsInt, IsDefined, IsString, IsBoolean } from "class-validator";
import { Author, Interaction, TagsOnPosts } from "./";

export class Post {
    @IsDefined()
    @IsInt()
    id!: number;

    @IsDefined()
    author!: Author;

    @IsDefined()
    interactions!: Interaction[];

    @IsDefined()
    @IsInt()
    authorId!: number;

    @IsDefined()
    @IsString()
    title!: string;

    @IsDefined()
    @IsBoolean()
    published!: boolean;

    @IsDefined()
    @IsString()
    text!: string;

    @IsDefined()
    @IsString()
    status!: string;

    @IsDefined()
    @IsString()
    media!: string;

    @IsDefined()
    TagsOnPosts!: TagsOnPosts[];
}
