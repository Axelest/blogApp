import * as express from 'express';
import * as bodyParser from 'body-parser';
import {Request, Response, NextFunction} from 'express';
import * as fs from 'fs';
import * as path from 'path';

class App {
     public app : express.Application;
     protected file : any;
     private dataFilePath : string;
     private staticProdFilePath : string;
     private staticDir : string;

     constructor() {
          this.dataFilePath = path.join(__dirname, '../data/db.json');
          this.staticProdFilePath = path.join(__dirname, '../../blog-post/build/index.html');
          this.staticDir = path.join(__dirname, '../../blog-post/build');
          this.app = express();
          this.config();
          this.routes();
          this.prepareFile();
     }

     /** Open the db file for now */
     public prepareFile() : void {
          // Open up the file
          fs.readFile(this.dataFilePath, 'utf8', (error, data) : void => {
               // It does not exist then create it
               if (error) {
                    fs.writeFile(this.dataFilePath, JSON.stringify({data: []}), {
                         flag: 'rwx'
                    }, (err) => {
                         // Error creating the file
                         if (err) {
                              throw err;
                         }
                         console.log('File created successfuly.');
                    });
               } else { // Bingo file exists then open it up and pars it.
                    this.file = JSON.parse(data);
               }
          });
     }

     /** Configure the express app */
     config() : void {
          this
               .app
               .use(bodyParser.json());
          this
               .app
               .use(bodyParser.urlencoded({extended: false}));
          this
               .app
               .use(express.static(this.staticDir));
     }

     /** Implement routes here */
     private routes() : void {
          const router = express.Router();

          /** Testing route for now */
          router.get('/', (req : Request, res : Response) => {
               res
                    .status(200)
                    .sendFile(this.staticProdFilePath);
          });

          router.get('/post', async(req : Request, res : Response) => {
               const id = parseInt(req.query.id, 10); // Make sure it is a number
               const post = await this
                    .file
                    .data
                    .find((item : any) => item.id === id); // find the post

               if (post !== undefined) { // post found then serve it
                    return res
                         .status(200)
                         .json({data: post});

               }

               // no post was found now send a 40X code
               return res
                    .status(402)
                    .json({data: 'post not found'});

          });

          /** Get all the posts do not filer for the the ones with a publish status */
          router.get('/all', (req : Request, res : Response) => {
               return res
                    .status(200)
                    .json({data: this.file});
          });

          /** Send all posts that have publish status, so filter the data */
          router.get('/posts', (req : Request, res : Response) => {
               const tempData = {
                    data: []
               }

               // Got new array with filtered posts
               const filteredPosts = this
                    .file
                    .data
                    .filter((item : any) => item.status === 'publish');

               // Make sure there is valid data
               if (filteredPosts !== undefined) {
                    tempData.data = filteredPosts;
                    return res
                         .status(200)
                         .json({data: tempData});
               }

               // Send a 40x code
               return res
                    .status(402)
                    .json({data: 'no data available'});
          });

          /** Edit route find item by id and update the file */
          router.post('/edit', (req : Request, res : Response) => {
               const id = req.body.id;
               let postIndex = this
                    .file
                    .data
                    .findIndex((item : any) => item.id === id); // find post index to update

               // Make sure it has been found
               if (postIndex !== -1) {
                    req.body.updatedDate = new Date();
                    this.file.data[postIndex] = req.body;
                    const data = JSON.stringify(this.file); // Prepare the data to be saved into the file
                    fs.writeFile(this.dataFilePath, data, 'utf8', err => {
                         if (err) {
                              return console.log(err, ' error ocurred saving the updated file.');
                         }

                         return res
                              .status(200)
                              .json({data: 'post saved'});
                    });
               }
          });

          /** Edit route find item by id and update the file */
          router.post('/addComment', (req : Request, res : Response) => {
               const id = req.body.id;
               let postIndex = this
                    .file
                    .data
                    .findIndex((item : any) => item.id === id); // find post index to update

               // Make sure it has been found
               if (postIndex !== -1) {
                    req.body.updatedDate = new Date();
                    this.file.data[postIndex] = req.body;
                    const data = JSON.stringify(this.file); // Prepare the data to be saved into the file
                    fs.writeFile(this.dataFilePath, data, 'utf8', err => {
                         if (err) {
                              return console.log(err, ' error ocurred saving the updated file.');
                         }

                         return res
                              .status(200)
                              .json({data: 'post saved'});
                    });
               }
          });

          /** Remove post by Id find it and remove it */
          router.post('/remove', (req : Request, res : Response) => {
               const id = req.body.id;
               const postIndex = this
                    .file
                    .data
                    .findIndex((item : any) => item.id === id);

               // Make sure the index was found
               if (postIndex !== -1) {
                    const result = this
                         .file
                         .data
                         .splice(1, postIndex); // Remove it from the data array
                    this.file.data = result; // Re assaign the new array
                    const data = JSON.stringify(this.file); // Prepare the json doc

                    // Lets write the file once more to update the data
                    fs.writeFile(this.dataFilePath, data, 'utf8', err => {
                         if (err) {
                              return console.log(err, ' error ocurred saving the updated file.');
                         }
                         return res
                              .status(200)
                              .json({data: 'post saved'});
                    });
               }
          });

          /** Save new post */
          router.post('/save', (req : Request, res : Response) => {
               const post = req.body;
               post.id = new Date().getTime();
               post.createdDate = new Date();
               post.updatedDate = new Date();
               this
                    .file
                    .data
                    .push(post); // Add the new post into the general data array
               const data = JSON.stringify(this.file); // Prepare the data to be saved into the file

               // Lets write the file once more to update the data
               fs.writeFile(this.dataFilePath, data, 'utf8', err => {
                    if (err) {
                         return console.log(err, ' error ocurred saving the updated file.');
                    }

                    return res
                         .status(200)
                         .json({data: 'post saved'});
               });
          });

          /** Make sure we allow the CRUD request methods here */
          this
               .app
               .use((req : Request, res : Response, next : NextFunction) => {
                    res.header('Access-Control-Allow-Origin', '*');
                    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                    res.header('Access-Control-Allow-Headers', 'Content-Type');
                    next();
               });
          this
               .app
               .use('/', router);

     }
}

export default new App().app;
