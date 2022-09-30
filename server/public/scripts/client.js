
$(document).ready(handleReady);
let rando=0;

let history=[];

let round=1;

function handleReady() {
  console.log("jquery is loaded!")

  //register on submit
  SetRandomNumberOnServer();
  $('#inputForm').on('submit', onSubmitGuess);
  $('#numberMinMax').on('submit',onNewRandBtn);
}

function onNewRandBtn(evt){
  evt.preventDefault();
  setServerMinMax();
  SetRandomNumberOnServer();
  clearTable();

}

function setServerMinMax(){
  let newBoundary={
    min: $('#inputMin').val(),
    max: $('#inputMax').val()
  }

  $('.guessRange').attr('min', newBoundary.min);
  $('.guessRange').attr('max', newBoundary.max);

  $.ajax({
    url: '/minMax',
    method: 'POST',
    data: newBoundary
  })
    .then((response)=> {
      console.log('in /minMax POST');
    })
    .catch((err)=>{
      console.log('in /minMax Error', err);
    });
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
  
  if(p1Choice===p2Choice){
    alert('Must choose different numbers silly pants 🙁');
    return;
  }

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
        <td>${round1.p1Result}</td>
        <td>${round1.p2} </td>
        <td>${round1.p2Result}</td>
        <td>${round1.pBot}</td>
        <td>${round1.pBotResult}</td>
      </tr>
    `);
  }
  for(let td of $('#tableResult').children().children()){
    console.log(td);
    console.log(td.text);
    if($(td).text()==='WIN! 🔥'){
      
      $(td).addClass("font-effect-fire");
    }
  }


}
// function returnFireClass(isItFire){
//   if(isItFire=='WIN! 🔥'){
//     return 'class ="font-effect-fire"';
//   }
//   return '';

//   //${returnFireClass(round1.p1Result)}
// }