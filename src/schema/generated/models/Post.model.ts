import { IsInt, IsDefined, IsBoolean, IsString } from 'class-validator'
import { Author, Interaction } from './'

export class Post {
  @IsDefined()
  @IsInt()
  id!: number

  @IsDefined()
  @IsBoolean()
  published!: boolean

  @IsDefined()
  author!: Author

  @IsDefined()
  interactions!: Interaction[]

  @IsDefined()
  @IsString()
  tags!: string

  @IsDefined()
  @IsString()
  title!: string

  @IsDefined()
  @IsString()
  text!: string

  @IsDefined()
  @IsString()
  status!: string

  @IsDefined()
  @IsString()
  media!: string
}
