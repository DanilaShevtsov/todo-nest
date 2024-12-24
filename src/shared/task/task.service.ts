import { Injectable } from '@nestjs/common';
import { TaskModel } from './task.model';
import { TaskRepository } from './task.repository';
import { CreateTaskCommand } from './dto/commands/create-task.command';

@Injectable()
export class TaskService {
  constructor(private readonly repository: TaskRepository) {}

  public async createTask(dto: CreateTaskCommand): Promise<any> {
    return this.repository.createTask(dto);
  }

  public async findAll(): Promise<TaskModel[]> {
    return this.repository.findAll();
  }

  public async findOne(id: string): Promise<TaskModel> {
    return this.repository.find(id);
  }

  public async updateTask(
    id: string,
    command: CreateTaskCommand,
  ): Promise<any> {
    return this.repository.updateTask(id, command);
  }

  public async deleteTask(id: string): Promise<any> {
    return this.repository.deleteTask(id);
  }
}
