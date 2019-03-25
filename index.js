
const DODGER = document.getElementById('dodger');
const GAME = document.getElementById('game');
const GAME_HEIGHT = 400;
const GAME_WIDTH = 400;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const ROCKS = [];
const START = document.getElementById('start');

var gameInterval = null;



function checkCollision(rock) {
  
  const top = positionToInteger(rock.style.top);


  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);

 
    const dodgerRightEdge = dodgerLeftEdge+ 40;

    const rockLeftEdge = positionToInteger(rock.style.left);

    
    const rockRightEdge = rockLeftEdge + 20;

     if ((rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge) || (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) || (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge)
        ){
      return true;
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div');

  rock.className = 'rock';
  rock.style.left = `${x}px`;

  
  var top = 0;
  
  rock.style.top = `${top}px`;
  
  GAME.appendChild(rock);

 function moveRock(){
   rock.style.top = `${top += 2}px`;
   
   if (checkCollision(rock)){
     return endGame();
   }
   else if (top < GAME_HEIGHT){
      window.requestAnimationFrame(moveRock);
    }
    else {
      rock.remove();
    } 
   }
  window.requestAnimationFrame(moveRock);
  ROCKS.push(rock);
  return rock;
  
}
function endGame() {
  clearInterval(gameInterval);
 ROCKS.forEach(function(rock) { rock.remove() }) 
  
  window.removeEventListener('keydown', moveDodger)
  START.innerHTML = 'Play again?'
  START.style.display = 'inline'
  alert('You Have Lost!')
}


function moveDodger(e) {
  /**  calles preventDefault and stopPropagation for every item in the array that equates to e.which
   *  > -1 just means if it exists in the array(0,1,2,etc)
   * const code = e.which

  if ([LEFT_ARROW, RIGHT_ARROW].indexOf(code) > -1) {
    e.preventDefault()
    e.stopPropagation()
  }
   * 
    **/
  if (e.which === LEFT_ARROW){
    moveDodgerLeft();
    e.preventDefault();
    e.stopPropagation();
  }
  if (e.which === RIGHT_ARROW){
    moveDodgerRight();
    e.preventDefault();
    e.stopPropagation();
  }
}

function moveDodgerLeft() {
  /** These can be done efficiently:
   * calling window.requestAnimationFrame and passing it a function we define within
   
   * then creating a constant within the function which represents left using the code for a constant we have defined for dodger.style.left before. 
   
   * Finally we move the DODGER-LEFT-Edge as usual by providing a requirement and interpolating the left edge adding or subtracting and appending a position with 'px' at the end
   
   * E.g:
   * window.requestAnimationFrame(function(){
     const left = positionToInteger(DODGER.style.left) 
     if (left > 0){
       DODGER.style.left = `${left - 4}px`
     }
   })
   }
   * 
   * 
   **/

    var leftNumbers = dodger.style.left.replace('px','');
    var left = parseInt(leftNumbers, 10);
  if (left > 0){
    dodger.style.left = `${left - 4}px`;
    window.requestAnimationFrame(moveDodgerLeft);
  }
}

function moveDodgerRight() {
 var rightNumbers = dodger.style.left.replace('px', '');
 var right = parseInt(rightNumbers, 10);
 if (right < 360){
   dodger.style.left = `${ right + 4}px`;
   window.requestAnimationFrame(moveDodgerRight);
 }
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0;
}

function start() {
  window.addEventListener('keydown', moveDodger);

  START.style.display = 'none';

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)));
  }, 1000);
}