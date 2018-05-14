import { createServer, Server } from 'http';
import * as express from 'express';
// import * as firebase from 'firebase';
import * as BodyParser from 'body-parser';
import { celebrate, Joi, errors } from 'celebrate';
import { firebaseAPI } from '../firebase.api';
// var firebase = require('firebase');
var db = require('firebase/database');
var firebase = require('firebase-admin');
var serviceAccount = require('../hero-contacts-firebase-adminsdk-nhml8-f623286974.json');

export class HeroServer {
  private app: express.Application;
  private server: Server;
  private port: string | number = 3080;
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
      let allowedOrigins = ['http://localhost:4200'];
      let origin: any = req.headers.origin;
      if (allowedOrigins.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
      }
      res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.header('Access-Control-Allow-Credentials', 'true');
      return next();
    });
  }

  private defineRoutes() {
    console.log('Defining Routes');
    // basic test route
    this.app.get('/test', (req, res) => {
      res.send({test: 'success'});
    });
    // initial POST route for adding new Hero
    this.app.post('/hero', celebrate({
      body: this.valid_hero_schema
    }), (req, res) => {
      // replace '.' which are not allowed in an ID for Firebase
      const emailId = req.body.email.replace('.', '%2E');
      // Create a deep copy of the data object with JSON.parse(JSON.stringify(obj))
      const heroData = JSON.parse(JSON.stringify({
        name: {
          first: req.body.first,
          last: req.body.last
        },
        email: req.body.email,
        age: req.body.age,
        faveFood: req.body.faveFood
      }));
      // // write the data to our database
      firebase.database().ref('heroes/' + emailId).set(heroData)
      .then((success) => {
        console.log('promise + ', success);
        // let user know it worked out
        res.send({status: 'success', request: req.body});
      }).catch((failure) => {
        console.log('promise - ', failure);
        // let user know it worked out
        res.send({status: 'failure', request: req.body});
      });
    });
    this.app.use(errors());
  }

  private initializeFirebase() {
    // const config = {
    //   apiKey: firebaseAPI.apiKey,
    //   authDomain: firebaseAPI.authDomain,
    //   credential: firebase.credential.cert(serviceAccount),
    //   databaseURL: firebaseAPI.databaseURL,
    //   projectId: firebaseAPI.projectId,
    //   storageBucket: firebaseAPI.storageBucket,
    //   messagingSenderId: firebaseAPI.messagingSenderId
    // }
    // firebase.initializeApp(config);
    // Need admin certification, has not been accepting my token
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
