import { ITask } from '../models/Task.entity';

export interface ITaskRepository {

    create(task: ITask): Promise<ITask>;
    findAll(): Promise<ITask[]>;
    findById(id: string): Promise<ITask | null>;
    update(id: string, task: ITask): Promise<ITask | null>;
    delete(id: string, ): Promise<ITask | null>;

}