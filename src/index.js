require('dotenv').config({ path: __dirname + `/config/.env` });
require('express-async-errors');
const cors = require('cors');
const express = require('express');

const app = express();
const port = process.env.PORT || 4000;

require('./db')();
app.use(cors());
app.use(express.json());
app.use('/api/files', require('./routes/file'));
app.use('/api/users', require('./routes/user'));
app.use(require('./middlewares/error'));

app.listen(port, () => console.log(`Server running at port ${port}`));
