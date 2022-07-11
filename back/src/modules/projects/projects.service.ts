import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './projects.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async findAll(): Promise<Project[]> {
    return await this.projectRepository
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.tasks', 'tasks')
      .getMany();
  }

  async findOne(id: string): Promise<Project> {
    return await this.projectRepository.findOneBy({ id });
  }

  async save(project: Project): Promise<Project> {
    return await this.projectRepository.save(project);
  }

  async update(project: Project): Promise<void> {
    await this.projectRepository.update(project.id, { ...project });
  }

  async remove(id: string): Promise<void> {
    await this.projectRepository.delete(id);
  }
}
