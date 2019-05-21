const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use('/', require('./routes/search-hashtag'));

app.listen(3001, function () {
    console.log('Example app listening on port 3001!');
});
