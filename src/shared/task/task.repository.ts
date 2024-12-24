import { Injectable } from '@nestjs/common';
import { TaskModel } from './task.model';
import { DataSource } from 'typeorm';
import { CreateTaskCommand } from './dto/commands/create-task.command';

@Injectable()
export class TaskRepository {
  constructor(private readonly dataSource: DataSource) {}

  public async createTask(dto: Partial<TaskModel>): Promise<any> {
    console.log(dto);
    return this.dataSource.getRepository(TaskModel).insert(dto);
  }

  public async findAll(): Promise<TaskModel[]> {
    return this.dataSource.getRepository(TaskModel).find();
  }

  public async find(id: string): Promise<TaskModel> {
    return this.dataSource.getRepository(TaskModel).findOne({
      where: {
        id,
      },
    });
  }

  public async updateTask(
    id: string,
    command: CreateTaskCommand,
  ): Promise<any> {
    return this.dataSource.getRepository(TaskModel).update(id, command);
  }

  public async deleteTask(id: string) {
    return this.dataSource.getRepository(TaskModel).delete(id);
  }
}
