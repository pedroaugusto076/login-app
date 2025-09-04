const express = require('express');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
  store: new SQLiteStore({ db: 'sessions.db', dir: './' }),
  secret: 'super-secreto',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 } // 7 dias
}));

// Registro
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);

  db.run('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hash], function(err){
    if(err){
      return res.json({ error: 'Usuário já existe!' });
    }
    res.json({ success: true });
  });
});

// Login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
    if(err || !user) return res.json({ error: 'Usuário ou senha incorretos!' });

    bcrypt.compare(password, user.password).then(match => {
      if(!match) return res.json({ error: 'Usuário ou senha incorretos!' });

      req.session.user = { id: user.id, username: user.username };
      res.json({ success: true });
    });
  });
});

// Dashboard
app.get('/api/dashboard', (req, res) => {
  if(!req.session.user) return res.json({ error: 'Não autenticado!' });
  res.json({ user: req.session.user });
});

// Logout
app.get('/api/logout', (req,res) => {
  req.session.destroy();
  res.json({ success: true });
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
