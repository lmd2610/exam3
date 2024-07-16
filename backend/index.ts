import express from 'express';
import json from 'body-parser';
import  mongoose, { ConnectOptions } from 'mongoose';
import {loginRouter} from './server/routes/login';
import { UserRouters } from './server/routes/user';
import { PostRouters } from './server/routes/post';
import cors from  'cors'

const app =  express()
app.use(cors())
app.use(json());
app.use(loginRouter);
app.use(UserRouters);
app.use(PostRouters);
mongoose.connect('mongodb://localhost:27017/exam1', { useNewUrlParser: true, useUnifiedTopology: true }as ConnectOptions)
  .then(()=> {
    console.log('Database connected');
  })
  .catch((error)=> {
    console.log('Error connecting to database');
  });
app.listen(5000,()=>{
    console.log('server run now 5000')
})
