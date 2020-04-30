const mongoose = require('mongoose');

const {HOST, DATABASE} = process.env;
const URI = `mongodb://${HOST}/${DATABASE}`;

mongoose.connect(URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(db => console.log('Conexión establecida correctamente: '))
  .catch(err => console.error(err));