
$(document).ready(handleReady);
let rando=0;

let history=[];

let round=1;

function handleReady() {
  console.log("jquery is loaded!")

  //register on submit
  getRandomNumbFromServer();
  $('#inputForm').on('submit', onSubmitGuess);
}

function getRandomNumbFromServer(){
  $.ajax({
    url: '/getRandomNum',
    method: 'GET'
  })
  .then((response)=>{
    console.log('in ajax /getRandomNum then');
    rando = response.stateRandomNumber;
    console.log('rando is',rando);
  })
  .catch((err)=>{
    console.log('/getRandomNum err',err);
  }); 
};

function onSubmitGuess(evt){
  evt.preventDefault();
  // rando = getRandomNumbFromServer();

  // console.log(rando);

  // console.log('in onSubmitGuess 🐈');
  //object creation to send to server
  let p1Choice=$('#inputPlayer1').val();
  let p2Choice=$('#inputPlayer2').val();
  let p1Result=whoWins($('#inputPlayer1').val());
  let p2Result=whoWins($('#inputPlayer2').val());
  let guesses={
    thisRound:round++,
    randomNumber: rando,
    p1: p1Choice,
    p2: p2Choice,
    resultP1: p1Result,
    resultP2: p2Result
    };
  
  $.ajax({
    url: '/getHistory',
    method: 'POST',
    data: guesses
  })
    .then((response)=> {
      // console.log('/getHistory POST');
      // console.log('this is response', response);
      if(response==201){
        getRandomNumbFromServer();
        updateHistory();
      };
      
    })
    .catch((err)=>{
      console.log('/getHistory err', err);
    });
    
}

function whoWins(player){
  console.log('in whoWins');

  //check if p1 or p2 wins or if they are too low or high
  // console.log('player is', player);
  // console.log('rando is', rando);
  if(player==rando){
    return 'WIN! 🔥'
  }
  else if(player>rando){
    return 'Too High ⏫'
  }
  else{
    return 'Too Low 😦'
  }
}

function updateHistory(){
  console.log('in updateHistory');

  $.ajax({
    url: '/getHistory',
    method: 'GET'
  })
    .then((response)=>{
      history=response;
      // console.log('history is', history);
      // if(response==201){
      //   render();
      // };
        if(response){
          render()
        };
    })
    .catch((err)=>{
      console.log('in /getHistory GET error', err);
    });
    
}


function render(){
  console.log('in Render');
    //PULL State
  $('#tableResult').empty();

  for( let round1 of history){
    console.log('in for loop');
    console.log('the round', round1); 
    $('#tableResult').append(`
      <tr>
        <td>${round1.thisRound}</td>
        <td>${round1.p1}</td>
        <td>${round1.resultP1} </td>
        <td>${round1.p2} </td>
        <td>${round1.resultP2} </td>
      </tr>
    `);
  }

}