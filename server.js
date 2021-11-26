const path = require('path');
const express = require('express');
const sequelize = require('./config/connection');
const session = require('express-session');
const exphbs = require('express-handlebars');

const routes = require('./controllers');

const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  cookie:
  {maxAge: 300000},
  secret: 'Super secret secret',
  resave: true,
  rolling: true,
  saveUninitialized: false,
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening on http://localhost:3001/'));
});


