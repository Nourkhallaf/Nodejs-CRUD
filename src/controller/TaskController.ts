// src/controllers/TaskController.ts

import { Request, Response, NextFunction } from 'express';
import { ITask } from '../models/Task.entity';
import { TaskRepository } from '../repositories/TaskRepository';
import { TaskService } from '../services/task.service';
import jwt from 'jsonwebtoken';


export class TaskController {
  private taskService: TaskService;
  
  constructor(
    getTaskService?: TaskService,

  ) {
    const taskRepository = new TaskRepository();
    this.taskService = getTaskService || new TaskService(taskRepository);
  }


  public async create(req: Request, res: Response, next: NextFunction){
    try {
      const task: ITask = req.body;
      const createdTask = await this.taskService.createTask(task);
      res.status(201).json(createdTask);
    } catch (error) {
      next(error);
    }
  };

  public async findAll (req: Request, res: Response, next: NextFunction){
    try {
      const tasks = await this.taskService.getAllTasks();
      res.status(200).json(tasks);
    } catch (error) {
      next(error);
    }
  };

  public async findById (req: Request, res: Response, next: NextFunction){
    try {
      const id = req.params.id;
      const task = await this.taskService.getTaskById(id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.status(200).json(task);
    } catch (error) {
      next(error);
    }
  };

  public async update (req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const task: ITask = req.body;
      const updatedTask = await this.taskService.updateTask(id, task);
      if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.status(200).json(updatedTask);
    } catch (error) {
      next(error);
    }
  };

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const deletedTask = await this.taskService.deleteTask(id);
      if (!deletedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };


  // JWT 

  // async authenticate(req: Request, res: Response) {
  //   const { email, password } = req.body;

  //   // TODO: Validate user input

  //   // Check if user exists in database
  //   const user = await this.taskService.getUserByEmail(email);

  //   if (!user) {
  //     return res.status(401).json({ message: 'Invalid credentials' });
  //   }

  //   // Check if password is correct
  //   const passwordMatch = await this.taskService.comparePasswords(
  //     password,
  //     user.password,
  //   );

  //   if (!passwordMatch) {
  //     return res.status(401).json({ message: 'Invalid credentials' });
  //   }

  //   // Generate JWT token
  //   const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
  //     expiresIn: '1h',
  //   });

  //   // Return token to client
  //   res.json({ token });
  // }
}

