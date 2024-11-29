import { Module } from '@nestjs/common';
import { TasksController } from './tasks/controller/tasks.controller';
import { TasksService } from './tasks/service/tasks.service';
@Module({
  imports: [],
  controllers: [TasksController],
  providers: [TasksService],
})
export class AppModule {}
