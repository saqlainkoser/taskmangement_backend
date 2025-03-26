const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./db/mongoose');
const userRouter = require('./routes/user');
const taskRouter = require('./routes/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Task Manager API' });
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});
