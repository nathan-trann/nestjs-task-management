import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from '../model/tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from '../dto/create-task.dto';
import { GetTasksFilterDto } from '../dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: uuid(),
      title: 'Clean my room',
      description: 'So Lazy',
      status: TaskStatus.OPEN,
    },

    {
      id: uuid(),
      title: 'Learn French',
      description: 'Get B2 and Go to Canada!!!!',
      status: TaskStatus.OPEN,
    },
  ];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilter(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();

    if (status) {
      tasks = this.filterByStatus(tasks, status);
    }

    if (search) {
      tasks = this.filterBySearch(tasks, search);
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((t) => t.id === id);
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  deleteTaskById(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  updateTaskStatus(id: string, updatedStatus: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = updatedStatus;
    return task;
  }

  private filterByStatus(tasks: Task[], status: string): Task[] {
    return tasks.filter((task) => task.status === status);
  }

  private filterBySearch(tasks: Task[], search: string): Task[] {
    const lowerCaseSearch = search.toLowerCase();
    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(lowerCaseSearch) ||
        task.description.toLowerCase().includes(lowerCaseSearch),
    );
  }
}
