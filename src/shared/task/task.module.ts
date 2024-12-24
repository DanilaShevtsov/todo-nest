import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {TaskDto} from "./dto/task.dto";
import {TaskService} from "./task.service";
import {TaskRepository} from "./task.repository";
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRoot({
      retryAttempts: 1000,
      autoLoadEntities: true,
      type: 'postgres',
      url: process.env.DB_URL,
      migrations: ['dist/src/migration/**/*.ts'],
      entities: ['dist/src/**/*.model.js'],
      migrationsRun: true,
      synchronize: true,
      logging: true,
    }),
  ],
  providers: [TaskService, TaskRepository],
  exports: [TaskService],
})
export class TaskModule {}
