import { ITask } from '../models/Task.entity';
import { ITaskRepository } from '../repositories/ITaskRepository';

export class TaskService {
  private repository: ITaskRepository;

  constructor(repository: ITaskRepository) {
    this.repository = repository;
  }

  public async createTask(task: ITask): Promise<ITask> {
    try{

        return await this.repository.create(task);
    }catch(error){
        throw error;
    }
  }

  public async getAllTasks(): Promise<ITask[]> {
    try {
          
          return await this.repository.findAll();
    } catch (error) {
        throw error;

    }
        
  }

  public async getTaskById(id: string): Promise<ITask | null> {
    try {
        return await this.repository.findById(id);
    } catch (error) {
        throw error;

    }
  }

  public async updateTask(id: string, task: ITask): Promise<ITask | null> {
    try {
        
        return await this.repository.update(id, task);
    } catch (error) {
        throw error;
        
    }
  }

  public async deleteTask(id: string): Promise<ITask | null> {
    try {
        
        return await this.repository.delete(id);
    } catch (error) {
        
        throw error;
    }
  }
}
