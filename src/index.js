import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import api from './api/v1';
import config from './config.json';
import 'source-map-support/register';


let app = express();

// logger
app.use(morgan('dev'));

app.use(cors({
	exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
	limit : config.bodyLimit
}));

// api router
app.use('/api/v1', api);

//is Alive
app.get('/isAlive',(req,res) =>{
  res.send('true');
});

const port = process.env.PORT || config.port;
app.listen(port, () => {
  console.log(`Started on port ${port}`);
});
