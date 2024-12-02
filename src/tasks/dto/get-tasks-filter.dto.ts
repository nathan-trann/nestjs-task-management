import { TaskStatus } from '../model/tasks.model';

export class GetTasksFilterDto {
  status?: TaskStatus;
  search?: string;
}
