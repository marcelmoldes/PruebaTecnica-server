import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class } from './entities/class.entity';
import { CreateClassDto } from './dto/create-class.dto';
import { AssignTeacherDto } from './dto/assign-teacher.dto';
import { AssignStudentsDto } from './dto/assign-students.dto';
import { Teacher } from '../teachers/entities/teacher.entity';
import { Student } from '../students/entities/student.entity';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>,
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  // Create a new class
  async create(createClassDto: CreateClassDto): Promise<Class> {
    const newClass = this.classRepository.create(createClassDto);
    return this.classRepository.save(newClass);
  }

  // Retrieve all classes with related teacher and students
  async findAll(): Promise<Class[]> {
    return this.classRepository.find({
      relations: ['teacher', 'students'],
    });
  }

  // Retrieve a class by its ID
  async findOne(id: number): Promise<Class> {
    const classEntity = await this.classRepository.findOne({
      where: { id },
      relations: ['teacher', 'students'],
    });
    if (!classEntity) {
      throw new NotFoundException(`Class with ID ${id} not found`);
    }
    return classEntity;
  }

  // Update a class by its ID
  async update(
    id: number,
    updateClassDto: Partial<CreateClassDto>,
  ): Promise<Class> {
    await this.classRepository.update(id, updateClassDto);
    return this.findOne(id);
  }

  // Remove a class by its ID
  async remove(id: number): Promise<void> {
    await this.classRepository.delete(id);
  }

  // Assign a teacher to a class
  async assignTeacher(
    id: number,
    assignTeacherDto: AssignTeacherDto,
  ): Promise<Class> {
    const classEntity = await this.findOne(id);
    const teacher = await this.teacherRepository.findOne({
      where: { id: assignTeacherDto.teacherId },
    });
    if (!teacher) {
      throw new NotFoundException(
        `Teacher with ID ${assignTeacherDto.teacherId} not found`,
      );
    }
    classEntity.teacher = teacher;
    return this.classRepository.save(classEntity);
  }

  // Assign students to a class
  async assignStudents(
    id: number,
    assignStudentsDto: AssignStudentsDto,
  ): Promise<Class> {
    const classEntity = await this.findOne(id);
    if (!assignStudentsDto.studentId) {
      throw new NotFoundException('Student IDs not provided');
    }
    const students = await this.studentRepository.find({
      where: assignStudentsDto.studentId.map((studentId) => ({
        id: studentId,
      })),
    });
    if (students.length !== assignStudentsDto.studentId.length) {
      throw new NotFoundException('Some students were not found');
    }
    classEntity.students = students;
    return this.classRepository.save(classEntity);
  }

  // Retrieve students of a class by class ID
  async getStudents(id: number): Promise<Student[]> {
    const classEntity = await this.findOne(id);
    return classEntity.students;
  }
}
