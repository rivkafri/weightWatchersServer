const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const db = require('./models/db');

const usersController = require('./controllers/users.controller');
const diaryController = require('./controllers/diary.controller');
const accountController = require('./controllers/account.controller');
const meetingControllers = require('./controllers/meeting.controller');

const port = process.env.PORT || 8000;
db.connect();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', usersController);
app.use('/diary', diaryController);
app.use('/account', accountController);
app.use('/meeting', meetingControllers);

app.use(express.static('public'));

//
const FS = require('fs');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
// const customCss = FS.readFileSync((process.cwd() + "/swagger.css"), 'utf8');
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { customCss }));
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);
//

app.listen(port, function () {
    console.log(`Example app listening at http://localhost:${port}`)
});