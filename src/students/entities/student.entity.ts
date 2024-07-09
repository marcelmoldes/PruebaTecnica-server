import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Class } from '../../classes/entities/class.entity';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 50 })
  firstName: string;

  @Column({ type: 'varchar', length: 50 })
  lastName: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @ManyToMany(() => Class, (classEntity) => classEntity.students)
  classes: Class[];
}
