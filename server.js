const express = require('express');
var connectDB = require('./config/db');
 
const app = express();

//connect database
connectDB();

app.get('/', (req,res) =>
 res.json({msg:'Hellow   we are here'}));

//Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('api/auth', require('./routes/auth'));



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log ("serer runnings"));