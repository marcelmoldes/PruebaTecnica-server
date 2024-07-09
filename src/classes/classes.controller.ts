import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ClassService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { AssignTeacherDto } from './dto/assign-teacher.dto';
import { AssignStudentsDto } from './dto/assign-students.dto';
import { Class } from './entities/class.entity';
import { Student } from '../students/entities/student.entity';

@Controller('classes')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Post()
  create(@Body() createClassDto: CreateClassDto): Promise<Class> {
    return this.classService.create(createClassDto);
  }

  @Get()
  findAll(): Promise<Class[]> {
    return this.classService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Class> {
    return this.classService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClassDto: Partial<CreateClassDto>,
  ): Promise<Class> {
    return this.classService.update(id, updateClassDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.classService.remove(id);
  }

  @Post(':id/assign-teacher')
  assignTeacher(
    @Param('id', ParseIntPipe) id: number,
    @Body() assignTeacherDto: AssignTeacherDto,
  ): Promise<Class> {
    return this.classService.assignTeacher(id, assignTeacherDto);
  }

  @Post(':id/assign-students')
  assignStudents(
    @Param('id', ParseIntPipe) id: number,
    @Body() assignStudentsDto: AssignStudentsDto,
  ): Promise<Class> {
    return this.classService.assignStudents(id, assignStudentsDto);
  }

  @Get(':id/students')
  getStudents(@Param('id', ParseIntPipe) id: number): Promise<Student[]> {
    return this.classService.getStudents(id);
  }
}
