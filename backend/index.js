
const users = require('./users.json');
const fs = require('fs');
const {gen_Endpoint, baseSchema} = require('./generate-Schema');

const dbPath = 'db.json';
const port = 3010;
const JWT_SECRET = 'secret_JWT_$#@%$#';

const pathToSwaggerUi = require('swagger-ui-dist').absolutePath();
const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');

const server = jsonServer.create()
const router = jsonServer.router(dbPath)

const middlewares = jsonServer.defaults({
  static: pathToSwaggerUi,
  noCors: false,
})

let withDelay = false;
let withAuth = false;

const delay = (req, res, next) => {
  if(!withDelay){
    return next();
  }

  const delayMs = 500 + Math.random() * 2000 ;
  setTimeout(() => {
    res.setHeader('DELAY', delayMs);
    next();
  }, delayMs);
};


server.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
})

server.get('/bootstrap.css', (req, res) => {
  res.sendFile(__dirname + '/node_modules/bootstrap/dist/css/bootstrap.min.css');
})



server.use(middlewares);
server.use(jsonServer.bodyParser)


server.get('/swagger.json', (req, res) => {
  let db =  JSON.parse(fs.readFileSync(dbPath));
  let result = baseSchema;
  for(let endPoint in db){
    result = gen_Endpoint(endPoint, db[endPoint][0], result)
  }
  res.json(result);
})

server.get('/config/delay', (req, res) => {
  res.send(withDelay);
})
server.post('/config/delay', (req, res) => {
  withDelay = !withDelay;
  res.send(withDelay);
})

server.get('/config/auth', (req, res) => {
  res.send(withAuth);
})
server.post('/config/auth', (req, res) => {
  withAuth = !withAuth;
  res.send(withAuth);
})


server.post('/auth/register', register());
server.post('/auth/login', login());

server.use(delay);
server.use(authorize);
server.use(router);
server.listen(port, () => {
  console.log(`JSON Server is running at http://localhost:${port}`)
})


function authorize(req, res, next) {
	if(!withAuth){
		return next();
	}
  let token = req.headers['token'];
  try {
    var decoded = jwt.verify(token, JWT_SECRET);
    res.setHeader('X-USER', decoded.email);
    next();
  } catch (err) {
    return res.status(401).send(err);
  }
};


function login() {
  return (req, res) => {
    let user = { email: req.body.email, password: req.body.password };
    let registeredUser = users.find(x => x.email === user.email);
    if (!registeredUser) {
      res.send(404, { error: 'user not found ' + user.email });
      return;
    }
    if (registeredUser.password !== user.password) {
      res.send(401, { error: 'wrong password' });
      return;
    }
    const token = jwt.sign({ email: registeredUser.email }, JWT_SECRET, { expiresIn: '30d' });
    res.send({ token });
  };
}

function register() {
  return (req, res) => {
    let user = { email: req.body.email, password: req.body.password };
    if (users.find(x => x.email === user.email)) {
      res.send(403, { error: 'user exist' });
      return;
    }
    users.push(user);
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
    const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '30d' });
    res.send({ token });
  };
}