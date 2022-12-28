import { IsInt, IsDefined, IsString } from "class-validator";
import { TagsOnPosts } from "./";

export class Tag {
    @IsDefined()
    @IsInt()
    id!: number;

    @IsDefined()
    @IsString()
    text!: string;

    @IsDefined()
    posts!: TagsOnPosts;

    @IsDefined()
    @IsInt()
    tagsOnPostsPostId!: number;
}
