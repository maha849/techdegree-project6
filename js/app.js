
const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const phraseUl = document.querySelector('#phrase ul');
const buttons = document.getElementsByTagName('button');
const startGame = document.querySelector('.btn__reset');
const overlay = document.querySelector('#overlay');
const title = document.querySelector('.title');
const tries = document.querySelectorAll('.tries')
const phrases = ['cercei lannister','ned stark','theon greyjoy','robert baratheon','khal drogo'];
const letters = document.getElementsByClassName('letter');
const showLtr = document.getElementsByClassName('show');

let missed;

// function declarations

function getRandomPhraseAsArray(arr){
   const randomPhrase = arr[Math.floor(Math.random()*phrases.length)];
   return randomPhrase.split('');
}

function addPhraseToDisplay(arr){
    for(let i=0; i<arr.length; i++){
      let li = document.createElement('li');
      li.textContent = arr[i];
      phraseUl.appendChild(li);
      if( arr[i] !== ' '){
        li.classList.add('letter');
      }else{
        li.classList.add('space');
      }
    }
}

function checkLetter(button){
  var theLetter;
  for(let i=0; i<letters.length; i++){
    const letter = letters[i];
    if(button.textContent === letter.textContent){
      letter.classList.add('show');
      theLetter = letter;
      }
    }
  return (theLetter)?theLetter:null;
}

function new_phraseArray(){
  while(phraseUl.lastElementChild){
    phraseUl.removeChild( phraseUl.lastElementChild );
  }
  phraseArray = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(phraseArray);
}

function disableButtons(){
    for(let i=0; i<buttons.length; i++){
      buttons[i].disabled = true;
    }
}

function checkWin(){
  if(letters.length === showLtr.length || missed >= 5){
    disableButtons();
    startGame.textContent = 'start again';
  }
  if( letters.length === showLtr.length ){
      setTimeout(function() {
          overlay.style.display = '';
          overlay.classList.add('win');
          title.textContent = 'YOU WON';
        }, 600);
      }else if( missed >= 5){
          setTimeout( function(){
            overlay.style.display = '';
            overlay.classList.add('lose');
            title.textContent = 'YOU LOST';
        }, 600);
    }

}

// event listeners

startGame.addEventListener('click', () => {
        overlay.classList.remove('lose', 'win');
        overlay.style.display = 'none';
        new_phraseArray();
        missed = 0;
        for(let i=0; i<tries.length; i++){
          tries[i].style.display = '';
        }
        for(let i=0; i<buttons.length; i++){
          buttons[i].disabled = false;
          buttons[i].style.backgroundColor = '#E5E5E5';
        }

 });


qwerty.addEventListener('click', (e) => {
    const button = e.target;
    if(button.tagName === 'BUTTON'){
        button.classList.add('choosen');
        button.setAttribute('disabled', true);
        const letterFound = checkLetter(button);
        if(letterFound === null){
          missed+=1;
          tries[tries.length-missed].style.display = 'none';
          button.style.backgroundColor = '#D94545';
        }else{
          button.style.backgroundColor = '#78CF82';
          for(let i=0; i<showLtr.length; i++){
            showLtr[i].classList.add('animated', 'heartBeat');
          }
        };
    }
    checkWin();
});
