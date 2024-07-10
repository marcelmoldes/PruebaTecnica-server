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
import { AssignTeacherDto } from './dto/assign-teacher.dto';
import { AssignStudentsDto } from './dto/assign-students.dto';
import { Class } from './entities/class.entity';
import { Student } from '../students/entities/student.entity';

@Controller('classes')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  // Endpoint to create a new class
  @Post()
  create(@Body() createClassDto: CreateClassDto): Promise<Class> {
    return this.classService.create(createClassDto);
  }

  // Endpoint to retrieve all classes
  @Get()
  findAll(): Promise<Class[]> {
    return this.classService.findAll();
  }

  // Endpoint to retrieve a single class by its ID
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Class> {
    return this.classService.findOne(id);
  }

  // Endpoint to update a class by its ID
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClassDto: Partial<CreateClassDto>,
  ): Promise<Class> {
    return this.classService.update(id, updateClassDto);
  }

  // Endpoint to delete a class by its ID
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.classService.remove(id);
  }

  // Endpoint to assign a teacher to a class
  @Post(':id/assign-teacher')
  assignTeacher(
    @Param('id', ParseIntPipe) id: number,
    @Body() assignTeacherDto: AssignTeacherDto,
  ): Promise<Class> {
    return this.classService.assignTeacher(id, assignTeacherDto);
  }

  // Endpoint to assign students to a class
  @Post(':id/assign-students')
  assignStudents(
    @Param('id', ParseIntPipe) id: number,
    @Body() assignStudentsDto: AssignStudentsDto,
  ): Promise<Class> {
    return this.classService.assignStudents(id, assignStudentsDto);
  }

  // Endpoint to get students of a class
  @Get(':id/students')
  getStudents(@Param('id', ParseIntPipe) id: number): Promise<Student[]> {
    return this.classService.getStudents(id);
  }
}
