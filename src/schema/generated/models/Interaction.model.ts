import { IsInt, IsDefined, IsString, IsBoolean } from 'class-validator'
import { Author, Post } from './'

export class Interaction {
  @IsDefined()
  @IsInt()
  id!: number

  @IsDefined()
  author!: Author

  @IsDefined()
  post!: Post

  @IsDefined()
  @IsString()
  text!: string

  @IsDefined()
  @IsBoolean()
  share!: boolean

  @IsDefined()
  @IsBoolean()
  like!: boolean

  @IsDefined()
  @IsInt()
  authorId!: number

  @IsDefined()
  @IsInt()
  postId!: number
}
