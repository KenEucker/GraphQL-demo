import { IsInt, IsDefined, IsString, IsBoolean, IsIn } from 'class-validator'
import { Post, Interaction } from './'
import { getEnumValues } from '../helpers'
import { Permissions } from '../enums'

export class Author {
  @IsDefined()
  @IsInt()
  id!: number

  @IsDefined()
  @IsString()
  handle!: string

  @IsDefined()
  @IsString()
  email!: string

  @IsDefined()
  @IsBoolean()
  verified!: boolean

  @IsDefined()
  posts!: Post[]

  @IsDefined()
  @IsIn(getEnumValues(Permissions))
  permissions!: Permissions[]

  @IsDefined()
  interactions!: Interaction[]

  @IsDefined()
  @IsString()
  name!: string

  @IsDefined()
  @IsString()
  avatar!: string

  @IsDefined()
  @IsString()
  banner!: string

  @IsDefined()
  @IsString()
  status!: string

  @IsDefined()
  @IsString()
  bio!: string

  @IsDefined()
  @IsString()
  website!: string

  @IsDefined()
  @IsString()
  location!: string

  @IsDefined()
  @IsString()
  birthday!: string
}
