import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Task } from './tasks.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async get(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Get('/:id')
  async getById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.findOne(id);
  }

  @Post()
  async post(@Body() item: Task): Promise<Task> {
    return this.tasksService.save(item);
  }

  @Put()
  async put(@Body() task: Task): Promise<void> {
    return this.tasksService.update(task);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.tasksService.remove(id);
  }
}
