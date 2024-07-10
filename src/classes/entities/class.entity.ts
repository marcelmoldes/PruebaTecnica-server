import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Teacher } from '../../teachers/entities/teacher.entity';
import { Student } from '../../students/entities/student.entity';

/**
 * Represents a Class entity.
 */
@Entity()
export class Class {
  /**
   * The unique identifier for a class.
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * The name of the class.
   */
  @Column()
  name: string;

  /**
   * A brief description of the class.
   */
  @Column()
  description: string;

  /**
   * The teacher assigned to the class.
   * A class can have one teacher.
   */
  @ManyToOne(() => Teacher, (teacher) => teacher.classes)
  teacher: Teacher;

  /**
   * The students enrolled in the class.
   * A class can have many students.
   */
  @ManyToMany(() => Student, (student) => student.classes)
  @JoinTable()
  students: Student[];
}
