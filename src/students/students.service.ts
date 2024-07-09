import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly StudentRepository: Repository<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const newStudent = this.StudentRepository.create(createStudentDto);
    return this.StudentRepository.save(newStudent);
  }

  async findAll(): Promise<Student[]> {
    return this.StudentRepository.find();
  }

  async findOne(id: number): Promise<Student> {
    const student = await this.StudentRepository.findOne({ where: { id } });
    if (!Student) {
      throw new NotFoundException(`student with ID ${id} not found`);
    }
    return student;
  }

  async update(
    id: number,
    updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    const student = await this.findOne(id);
    const updatedStudent = Object.assign(student, updateStudentDto);
    return this.StudentRepository.save(updatedStudent);
  }

  async remove(id: number): Promise<{ message: string }> {
    const student = await this.findOne(id);
    await this.StudentRepository.remove(student);
    return { message: `student with ID ${id} has been removed successfully` };
  }
}
