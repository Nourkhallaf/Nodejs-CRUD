

import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import mongoose, { ConnectOptions } from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import { TaskController } from './controller/TaskController';

class Server {
  public app: Application;
  private taskController: TaskController;

  constructor() {
    this.app = express();
    this.taskController = new TaskController();
    this.config();
    this.routes();
    this.connectToDatabase();
    // this.handleError();
  }

  private config() {
    this.app.use(bodyParser.json());
  }

  private routes() {
    this.app.get('/', (req: Request, res: Response) => {
      res.send('Welcome to the Task Manager API!');
    });

    this.app.post('/tasks', this.taskController.create.bind(this.taskController));
    this.app.get('/tasks', this.taskController.findAll.bind(this.taskController));
    this.app.get('/tasks/:id', this.taskController.findById.bind(this.taskController));
    this.app.put('/tasks/:id', this.taskController.update.bind(this.taskController));
    this.app.delete('/tasks/:id', this.taskController.delete.bind(this.taskController));
  }

  private connectToDatabase() {
    mongoose
      .connect('mongodb://127.0.0.1:27017/Tasks', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions)
      .then(() => console.log('Connected to database'))
      .catch((err) => console.log(err));
  }




//   private handleError() {
//     this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//       errorHandler(err, req, res, next);
//     });

//     this.app.use((req: Request, res: Response, next: NextFunction) => {
//       notFoundHandler(req, res, next);
//     });
//   }
}

const server = new Server();

server.app.listen(3000, () => {
  console.log('Server started on port 3000');
});
