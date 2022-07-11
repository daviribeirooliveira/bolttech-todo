import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Task } from '../tasks/tasks.entity';

@Entity()
export class Project {
  @PrimaryColumn({ default: () => 'newid()' })
  id: string;

  @Column({ length: 100 })
  description: string;

  @Column({ default: () => 'getdate()' })
  creationDate: Date;

  @OneToMany(() => Task, (item) => item.project)
  tasks: Task[];
}
