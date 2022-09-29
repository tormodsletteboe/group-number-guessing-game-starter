const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 3000;

let stateRandomNumber ;
let stateHistory =[]
// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// GET & POST Routes go here
app.get('/getRandomNum',(req,res)=>{
  // console.log('in getRandomNum');
  // stateRandomNumber=getRandomNumber();
  stateRandomNumber = (Math.ceil(Math.random()*25));
  // console.log('RandomNumber is',stateRandomNumber);
  res.send({stateRandomNumber});
});

app.get('/getHistory', (req, res)=> {
  console.log('in /getHistory GET');
  res.send(stateHistory);
});

app.post('/getHistory', (req, res)=>{
  console.log('in /getHistory POST');
  stateHistory.push(req.body);
  // stateRandomNumber=getRandomNumber();
  console.log(stateHistory);
  res.send('201');
});

app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
});


// function getRandomNumber(){
//   return (Math.ceil(Math.random()*25));
// }