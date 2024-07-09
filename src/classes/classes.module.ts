// class.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from './entities/class.entity';
import { ClassService } from './classes.service';
import { ClassController } from './classes.controller';
import { Teacher } from '../teachers/entities/teacher.entity';
import { Student } from '../students/entities/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Class, Teacher, Student])],
  providers: [ClassService],
  controllers: [ClassController],
})
export class ClassModule {}
