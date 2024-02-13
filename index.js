
const express = require('express')
const app = express()
const port = 5000

const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const loadBalancerMiddleware = require('./middlewares/loadBalancer');
const uploadMiddleware = require('./middlewares/mutler-middleware');

const userServiceRoute =  require('./routes/userServiceRoute');
const soalServiceRoute = require('./routes/soalServiceRoute');
const modulServiceRoute = require('./routes/modulServiceRoute');
const taskServiceRoute = require('./routes/taskServiceRoute');

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));
app.use(uploadMiddleware);

// Gunakan loadBalancerMiddleware untuk semua permintaan di '/api'
//app.use('/api', loadBalancerMiddleware);
app.use('/api/soal', soalServiceRoute);
app.use('/api/user', userServiceRoute);
app.use('/api/modul', modulServiceRoute);
app.use('/api/task', taskServiceRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})