const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 3000;
const numGenerator=require('./randomNumber');
let stateRandomNumber ;
let stateHistory =[]
// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

let min=1;
let max=25;

// GET & POST Routes go here
app.post('/minMax', (req, res) => {
  min = req.body.min;
  max = req.body.max;
  res.send('201');
  ///MAKE SURE TO UPDATE STATUS CODE!!!
} );

app.get('/getRandomNum',(req,res)=>{
  // console.log('in getRandomNum');
  // stateRandomNumber=getRandomNumber();
  stateRandomNumber = numGenerator(Number(min), Number(max));
  // console.log('RandomNumber is',stateRandomNumber);
  stateHistory=[];
  res.send({stateRandomNumber});
});

app.get('/getHistory', (req, res)=> {
  console.log('in /getHistory GET');
  res.send(stateHistory);
});

app.post('/getHistory', (req, res)=>{
  console.log('in /getHistory POST');
  let botGuess=numGenerator(Number(min), Number(max));
  let newHistoryItem ={
    p1: req.body.p1,
    p1Result: whoWins(req.body.p1), //calculate something
    p2: req.body.p2,
    p2Result: whoWins(req.body.p2), //calculate something
    roundCounter: req.body.thisRound,
    randum: stateRandomNumber,
    pBot: botGuess, //calc //TODO : continue from here on friday
    pBotResult: whoWins(botGuess) //calc
  };
  stateHistory.push(newHistoryItem);
  // stateRandomNumber=getRandomNumber();
  console.log(stateHistory);
  res.send('201');
});

app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
});

function whoWins(player){
  console.log('in whoWins');

  //check if p1 or p2 wins or if they are too low or high
  // console.log('player is', player);
  // console.log('rando is', rando);
  if(player==stateRandomNumber){
    return 'WIN! 🔥'
  }
  else if(player>stateRandomNumber){
    return 'Too High ⏫'
  }
  else{
    return 'Too Low 😦'
  }
}
// function getRandomNumber(){
//   return (Math.ceil(Math.random()*25));
// }