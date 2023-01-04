import { IsInt, IsDefined, IsString, IsBoolean, IsDate } from 'class-validator'
import { Author, Post } from './'

export class Interaction {
  @IsDefined()
  @IsInt()
  id!: number

  @IsDefined()
  author!: Author

  @IsDefined()
  @IsInt()
  authorId!: number

  @IsDefined()
  @IsInt()
  postId!: number

  @IsDefined()
  post!: Post

  @IsDefined()
  @IsString()
  text!: string

  @IsDefined()
  @IsBoolean()
  like!: boolean

  @IsDefined()
  @IsBoolean()
  love!: boolean

  @IsDefined()
  @IsBoolean()
  repost!: boolean

  @IsDefined()
  @IsBoolean()
  share!: boolean

  @IsDefined()
  @IsDate()
  createdAt!: Date

  @IsDefined()
  @IsDate()
  updatedAt!: Date
}
