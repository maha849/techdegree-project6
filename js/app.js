
const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const phraseUl = document.querySelector('#phrase ul');
const buttons = document.getElementsByTagName('button');
const letters = document.getElementsByClassName('letter');
const startGame = document.querySelector('.btn__reset');
const overlay = document.querySelector('#overlay');
const phrases = ['cercei lannister','ned stark','theon greyjoy','robert baratheon','khal drogo'];
let missed = 0;

function getRandomPhraseAsArray(phrases){
   const randomPhrase = phrases[Math.floor(Math.random()*phrases.length)];
   const result = randomPhrase.split('');
   return result;
}

function addPhraseToDisplay(chars){
    // 'array of characters' is passed in
    for(let i=0; i<chars.length; i++){
      let li = document.createElement('li');
      li.textContent = chars[i];
      phraseUl.appendChild(li);
      if( chars[i] !== ' '){
        li.className = 'letter';
      }
    }
}

function checkLetter(btn){
  for(let i=0; i<letters.length; i++){
    if(btn.textContent === letters[i].textContent){
      letters[i].className = 'show';
      let ltr = letters[i];
      return ltr;
    }else{
      return null;
    }
  }
}

const chars = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(chars);

// hide the start screen overlay
startGame.addEventListener('click', () => overlay.style.display = 'none' );

qwerty.addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON'){
        e.target.className = 'choosen';
        let choosen = document.querySelector('.choosen');
        choosen.setAttribute("disabled", "true");
        let letterFound = checkLetter(choosen);
        console.log(letterFound);
    }
});
