import {
  Body,
  Controller, Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { TaskService } from './shared/task/task.service';
import { TaskDto } from './shared/task/dto/task.dto';
import { CreateTaskCommand } from './shared/task/dto/commands/create-task.command';
import { Response } from 'express';

@Controller('tasks')
export class AppController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getTasks(): Promise<TaskDto[]> {
    const tasks = await this.taskService.findAll();
    return tasks.map((task) => {
      return {
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
      } as TaskDto;
    });
  }

  @Post()
  async createTask(
    @Body() command: CreateTaskCommand,
    @Res() res: Response,
  ): Promise<any> {
    try {
      await this.taskService.createTask(command);
      return res.status(HttpStatus.CREATED);
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() command: CreateTaskCommand,
  ): Promise<TaskDto> {
    await this.taskService.updateTask(id, command);
    return this.taskService.findOne(id);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string): Promise<any> {
    await this.taskService.deleteTask(id);
  }
}
