const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const tasklist = require('./routes/api/tasklist.js');

app.use('/api/my_tasklist', tasklist);
//handle product
if(process.env.NODE_ENV === 'production'){
    // static folder
    app.use(express.static(__dirname + '/public/'));
    // Handle SPA 
    app.get(/.*/, (req,res)=>res.sendFile(__dirname + '/public/index.html'));
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));