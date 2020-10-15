const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require ('dotenv').config();
const app = express();
const Port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false })
.catch(err=>{
    console.log(err)
})

const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("Successfully connected to Database")
})

const signupRouter = require('./routes/signup');
const loginRouter = require('./routes/login');

app.use('/users', signupRouter);
app.use('/users', loginRouter);
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('./client/build'))
}
app.listen(Port, () => console.log('Server Started on port: '+Port));

