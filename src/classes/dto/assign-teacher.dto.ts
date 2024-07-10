import { IsNotEmpty, IsInt } from 'class-validator';

export class AssignTeacherDto {
  @IsNotEmpty()
  @IsInt()
  teacherId: number;
}
