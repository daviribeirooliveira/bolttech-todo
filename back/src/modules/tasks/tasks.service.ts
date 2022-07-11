import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private itemRepository: Repository<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    return await this.itemRepository.find();
  }

  async findOne(id: string): Promise<Task> {
    return await this.itemRepository.findOneBy({ id });
  }

  async save(Task: Task): Promise<Task> {
    return await this.itemRepository.save(Task);
  }

  async update(task: Task): Promise<void> {
    await this.itemRepository.update(task.id, { ...task });
  }

  async remove(id: string): Promise<void> {
    await this.itemRepository.delete(id);
  }
}
