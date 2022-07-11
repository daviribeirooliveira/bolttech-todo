import {
  Body,
  Controller,
  Get,
  Delete,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Project } from './projects.entity';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  async get(): Promise<Project[]> {
    return this.projectsService.findAll();
  }

  @Get('/:id')
  async getById(@Param('id') id: string): Promise<Project> {
    return this.projectsService.findOne(id);
  }

  @Post()
  async post(@Body() project: Project): Promise<Project> {
    return this.projectsService.save(project);
  }

  @Put()
  async put(@Body() project: Project): Promise<void> {
    return this.projectsService.update(project);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.projectsService.remove(id);
  }
}
