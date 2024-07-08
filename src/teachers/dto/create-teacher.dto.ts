import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTeacherDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  email: string;
}
