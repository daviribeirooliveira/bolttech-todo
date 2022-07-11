import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Project } from '../projects/projects.entity';

@Entity()
export class Task {
  @PrimaryColumn({ default: () => 'newid()' })
  id: string;

  @Column()
  projectId: string;

  @Column()
  description: string;

  @Column({ default: 0 })
  checked: boolean;

  @Column({ default: () => 'getdate()' })
  creationDate: Date;

  @Column({ nullable: true })
  finishDate: Date;

  @ManyToOne(() => Project, (project) => project.tasks, { onDelete: 'CASCADE' })
  project: Project;
}
