// src/repositories/TaskRepository.ts

import Task, { ITask } from '../models/Task.entity';
import { ITaskRepository } from "./ITaskRepository";

export class TaskRepository  implements  ITaskRepository{
  public async create(task: ITask): Promise<ITask> {
    return Task.create(task);

  }

  public async findAll(): Promise<ITask[]> {
    const tasks = await Task.find();
    return tasks;
  }

  public async findById(id: string): Promise<ITask | null> {
    const task = await Task.findById(id);
    return task;
  }

  public async update(id: string, task: ITask): Promise<ITask | null> {
    const updatedTask = await Task.findByIdAndUpdate(id, task, { new: true });
    return updatedTask;
  }

  public async delete(id: string): Promise<ITask | null> {
    const deletedTask = await Task.findByIdAndDelete(id);
    return deletedTask;
  }
}
