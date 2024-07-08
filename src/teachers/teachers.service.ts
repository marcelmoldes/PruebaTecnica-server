import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Teacher } from './entities/teacher.entity';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) {}

  async create(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    const newTeacher = this.teacherRepository.create(createTeacherDto);
    return this.teacherRepository.save(newTeacher);
  }

  async findAll(): Promise<Teacher[]> {
    return this.teacherRepository.find();
  }

  async findOne(id: string): Promise<Teacher> {
    const teacher = await this.teacherRepository.findOne({ where: { id } });
    if (!teacher) {
      throw new NotFoundException(`Teacher with ID ${id} not found`);
    }
    return teacher;
  }

  async update(
    id: string,
    updateTeacherDto: UpdateTeacherDto,
  ): Promise<Teacher> {
    const teacher = await this.findOne(id);
    const updatedTeacher = Object.assign(teacher, updateTeacherDto);
    return this.teacherRepository.save(updatedTeacher);
  }

  async remove(id: string): Promise<{ message: string }> {
    const teacher = await this.findOne(id);
    await this.teacherRepository.remove(teacher);
    return { message: `Teacher with ID ${id} has been removed successfully` };
  }
}
