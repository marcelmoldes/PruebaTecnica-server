import { IsNotEmpty, IsArray, ArrayNotEmpty, IsInt } from 'class-validator';

export class AssignStudentsDto {
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  studentId: number[];
}
