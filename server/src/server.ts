import { createServer, Server } from 'http';
import * as express from 'express';
import * as BodyParser from 'body-parser';
import { celebrate, Joi, errors } from 'celebrate';
var db = require('firebase/database');
var firebase = require('firebase-admin');
var serviceAccount = require('../hero-contacts-firebase-adminsdk-nhml8-f623286974.json');

export class HeroServer {
  private app: express.Application;
  private server: Server;
  private port: string | number = process.env.PORT || 3080;
  private valid_hero_schema = Joi.object().keys({
    name: Joi.object().keys({
      first: Joi.string().required(),
      last: Joi.string().required()
    }),
    age: Joi.number().min(1).max(1000).required(),
    email: Joi.string().required(),
    faveFood: Joi.string().required()
  });

  constructor() {
    this.createApp();
    this.createServer();
    this.listen();
    this.changeApiAccess();
    this.defineRoutes();
    this.initializeFirebase();
  }

  private createApp(): void {
    console.log('Creating App');
    this.app = express();
    this.app.use(BodyParser.json()); // parse incoming json for POST routes
  }

  private createServer(): void {
    console.log('Creating Server');
    this.server = createServer(this.app);
  }

  private listen(): void {
    this.server.listen(this.port, () => {
      console.log('Running server on port %s', this.port);
    });
  }

  private changeApiAccess() {
    // Add headers
    this.app.use(function (req, res, next) {
      let allowedOrigins = ['http://localhost:4200', 'http://hero-contacts.bitballoon.com'];
      let origin: any = req.headers.origin;
      if (allowedOrigins.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
      }
      // res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.header('Access-Control-Allow-Credentials', 'true');
      // intercept OPTIONS method
      if ('OPTIONS' == req.method) {
        res.send(200);
      } else {
        next();
      }
    });
  }

  private defineRoutes() {
    console.log('Defining Routes');
    // GET for heroes database
    this.app.get('/heroes', (req, res) => {
      let userDbInfo: any;
      firebase.database().ref('heroes').once('value', (data) => {
        userDbInfo = data.val();
        console.log('GET heroes', userDbInfo);
        res.send(userDbInfo);
      });
    });
    // POST route for adding new Hero
    this.app.post('/hero', celebrate({
      body: this.valid_hero_schema
    }), (req, res) => {
      // replace '.' which are not allowed in an ID for Firebase
      const emailId = req.body.email.toLowerCase().replace('.', '%2E');
      // Format data to post for Firebase
      const heroData = {
        name: {
          first: req.body.name.first,
          last: req.body.name.last
        },
        email: req.body.email,
        age: req.body.age,
        faveFood: req.body.faveFood
      };
      // write the data to our database
      firebase.database().ref('heroes/' + emailId).set(heroData)
      .then((success) => {
        // upon success grab the updated DB for the front-end
        firebase.database().ref('heroes').once('value', (data) => {
          let userDbInfo = data.val();
          // respond to front-end with the updated DB
          res.send({status: 'success', data: userDbInfo});
        });
      }).catch((failure) => {
        console.log('promise - ', failure);
        // let user know it worked out
        res.send({status: 'failure', data: req.body});
      });
    });
    // DELETE a hero from the DB
    this.app.delete('/hero/:email', (req, res) => {
      console.log('DELETE request: ', req);
      // replace '.' which are not allowed in an ID for Firebase
      const emailId = req.params.email.replace('.', '%2E');
      // write the data to our database
      firebase.database().ref('heroes/' + emailId).remove()
      .then((success) => {
        // upon success grab the updated DB for the front-end
        firebase.database().ref('heroes').once('value', (data) => {
          let userDbInfo = data.val();
          // respond to front-end with the updated DB
          res.send({status: 'success', data: userDbInfo});
        });
      }).catch((failure) => {
        console.log('promise - ', failure);
        // let user know it worked out
        res.send({status: 'failure', data: req.body});
      });
    });
    // include errors from Joi
    this.app.use(errors());
  }

  private initializeFirebase() {
    // Needed to switch from firebase to Admin SDK certification, Firebase would not accept my token
    firebase.initializeApp({
      credential: firebase.credential.cert(serviceAccount),
      databaseURL: 'https://hero-contacts.firebaseio.com'
    });
    firebase.database.enableLogging(true);
  }

  public getApp(): express.Application {
    return this.app;
  }
}
