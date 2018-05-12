import { createServer, Server } from 'http';
import * as express from 'express';

export class HeroServer {
  private app: express.Application;
  private server: Server;

  constructor() {
    this.createApp();
    this.createServer();
    this.defineRoutes();
  }

  private createApp(): void {
    console.log('Creating App');
    this.app = express();
  }

  private createServer(): void {
    console.log('Creating Server');
    this.server = createServer(this.app);
  }

  private defineRoutes() {
    console.log('Defining Routes');
    // basic test route
    this.app.get('/test', (req, res) => {
      res.send({test: 'success'});
    });
  }

  public getApp(): express.Application {
    return this.app;
  }
}
