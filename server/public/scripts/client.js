
$(document).ready(handleReady);
let rando=0;

let history=[];

let round=1;

function handleReady() {
  console.log("jquery is loaded!")

  //register on submit
  SetRandomNumberOnServer();
  $('#inputForm').on('submit', onSubmitGuess);
  $('#newRandomBtn').on('click',onNewRandBtn);
}

function onNewRandBtn(){
  SetRandomNumberOnServer();
  clearTable();
}

function SetRandomNumberOnServer(){
  $.ajax({
    url: '/getRandomNum',
    method: 'GET'
  })
  .then((response)=>{
    console.log('in ajax /getRandomNum then');
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
 
  let guesses={
    thisRound:round++,
    p1: p1Choice,
    p2: p2Choice,
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
        updateHistory();
      };
      
    })
    .catch((err)=>{
      console.log('/getHistory err', err);
    });
    
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
function clearTable(){
  $('#tableResult').empty();

}

function render(){
  console.log('in Render');
    //PULL State
  clearTable();
  for( let round1 of history){
    console.log('in for loop');
    console.log('the round', round1); 
    $('#tableResult').append(`
      <tr>
        <td>${round1.roundCounter}</td>
        <td>${round1.p1}</td>
        <td>${round1.p1Result} </td>
        <td>${round1.p2} </td>
        <td>${round1.p2Result} </td>
      </tr>
    `);
  }

}