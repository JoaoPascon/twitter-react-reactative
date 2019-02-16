const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const port = 3000;
const app = express();

const server = require('http').Server(app);

// para habilitar que nossa aplicação ouça protoco ws(web socket)
const io = require('socket.io')(server);


mongoose.connect('mongodb://Jnpascon:teste1234@ds221435.mlab.com:21435/jn-twitter-backend'
,{
    useNewUrlParser: true
});

// para deixar acessivel a todos os req do nosso app
app.use((req, res, next) => {
    req.io = io;
    return next();
})

// para poder utilizar o json em requisição via express
app.use(express.json());

// módulo de segurança para habilitar acesso do front 
app.use(cors());

app.use(require('./routes'));

server.listen(port, () => {
    console.log('Server Started on port 3000 =)')
})