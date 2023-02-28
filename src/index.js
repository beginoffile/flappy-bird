import './styles.css';

if ('serviceWorker' in navigator){
    window.addEventListener('load', () =>{
        navigator.serviceWorker.register('./service-worker.js').then(registration =>{
            console.log('SW registered', registration)
        }).catch(registrationError =>{
            console.log('Sw Registration failed', registrationError);
        });
    })
}


const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext("2d");
const titleGame = document.getElementById('title-game');
const endMenu = document.getElementById('end-menu');
const btnStart = document.getElementById('restart-button');
const scoreDisplay = document.getElementById('score-display');

const gameContainer = document.getElementById('game-container');
const flappyImg = new Image();
flappyImg.src = './assets/images/flappy_dunk.png';

const audioSnd = document.getElementById('idsound');

//Game constants
const FLAP_SPEED = -5;
const BIRD_WIDTH = 40;
const BIRD_HEIGHT= 30;
const PIPE_WIDTH = 50;
const PIPE_GAP   = 125;

// Bird variables
let birdX = 50;
let birdY = 50;
let birdVelocity = 0;
let birdAcceleration = 0.1;

// Pipe variables
let pipeX = 400;
let pipeY = canvas.height - 200;

let bPassHigRecord = false;

// score and highscore variables
let scoreDiv = document.getElementById('score-display');
let score = 0;
let highScore = 0;

// we add a bool variable
let scored = false;

const SOUND_GAMESTART = 'game-start-6104.mp3';
const SOUND_PASS_PIPE = 'short-success-sound-glockenspiel-treasure-video-game-6346.mp3';
const SOUND_PASS_10 = 'success-fanfare-trumpets-6185.mp3';
const SOUND_GAMEOVER = 'videogame-death-sound-43894.mp3';
const SOUND_PASS_RECORD = 'winfantasia-6912.mp3';

let bStartedGame = false;
titleGame.innerHTML = 'Press to Start...';
btnStart.innerHTML = 'Start';
scoreDisplay.style.display='none';


// control the bird with the space key
document.body.onkeyup = (e)=>{
    if (e.code == 'Space'){
        birdVelocity = FLAP_SPEED;
    }
}

canvas.addEventListener('click',()=>{
    birdVelocity = FLAP_SPEED;
});


// restart the gale if we hit game over
btnStart.addEventListener('click',()=>{
    playSound(SOUND_GAMESTART);
    if (!bStartedGame){
        bStartedGame = true;
        canvas.style.display = 'block';
        endMenu.style.display = 'none';
        titleGame.innerHTML = 'Game-Over!'
        btnStart.innerHTML = 'Restart'
        scoreDisplay.style.display='block';
        loop();


    }else{
        hideEndMenu();
        resetGame();
        loop();
        
    }
})
function increaseScore(){
    if (birdX > pipeX + PIPE_WIDTH && 
        (birdY < pipeY +  PIPE_GAP || 
         birdY + BIRD_HEIGHT > pipeY + PIPE_GAP) &&
         !scored){
            score++;
            scoreDiv.innerHTML = score;
            scored = true;
            if (score > highScore && !bPassHigRecord && highScore>0){
                // setTimeout(() => {
                    
                    // }, 1000);
                    
                    playSound(SOUND_PASS_RECORD);
                    bPassHigRecord = true;
            }else{
                playSound(SOUND_PASS_PIPE);
            }
    }

       


    // reset the flag if bird passes the pipes
    if (birdX < pipeX + PIPE_WIDTH){
        scored = false;
        
    }
}

function collisionCheck(){
    const birdBox = {
        x: birdX,
        y: birdY,
        width: BIRD_WIDTH,
        height: BIRD_HEIGHT
    }
    const topPipeBox = {
        x: pipeX,
        y: pipeY - PIPE_GAP + BIRD_HEIGHT,
        width: PIPE_WIDTH,
        height: pipeY
    }

    const bottomPipeBox = {
        x: pipeX,
        y: pipeY + PIPE_GAP + BIRD_HEIGHT,
        width: PIPE_WIDTH,
        height: canvas.height - pipeY- PIPE_GAP
    }

    // Check for the collision with pipe box
    if (birdBox.x + birdBox.width > topPipeBox.x &&
        birdBox.y + topPipeBox.x + topPipeBox.width &&
        birdBox.y < topPipeBox.y){
            return true;
        }
    // check for collision with lower pipe box 
    if (birdBox.x  + birdBox.width > bottomPipeBox.x &&
        birdBox.x < bottomPipeBox.x + bottomPipeBox.width &&
        birdBox.y + birdBox.height > bottomPipeBox.y){
            return true;
        }
    // check if bird hits boundaries
    
    if (birdY < 0 || birdY + BIRD_HEIGHT > canvas.height){
        return true;
    }

    return false;
}

function hideEndMenu(){
    document.getElementById('end-menu').style.display = 'none';
    gameContainer.classList.remove('backdrop-blur');
    
}

function showEndMenu(){
    document.getElementById('end-menu').style.display = 'block';
    gameContainer.classList.add('backdrop-blur');
    document.getElementById('end-score').innerHTML = score;
    // This way we update alway our highScore at the end of our gameContainer
    if (highScore < score){
        highScore = score;
    }

    document.getElementById('best-score').innerHTML = highScore;
}
// rset the vaues to the begining so we start
function resetGame(){
    // Bird variables
    birdX = 50;
    birdY = 50;
    birdVelocity = 0;
    birdAcceleration = 0.1;

    // Pipe variables
    pipeX = 400;
    pipeY = canvas.height - 200;
    score = 0;
    scoreDiv.innerHTML = score;
    bPassHigRecord = false;
}

function endGame(){
    playSound(SOUND_GAMEOVER);
    showEndMenu();
}

function playSound(audiofile){
    audioSnd.src = `./assets/sounds/${audiofile}`;
    audioSnd.play();
}

function loop(){
    // reset the ctx after every iteration
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);

    // Draw flappy Bird
    ctx.drawImage(flappyImg, birdX, birdY);

    // Draw Pipes
    ctx.fillStyle = '#333';
    ctx.fillRect(pipeX, -100, PIPE_WIDTH, pipeY);
    ctx.fillRect(pipeX, pipeY + PIPE_GAP, PIPE_WIDTH, canvas.height - pipeY);

    //collision
    if (collisionCheck()){
        endGame();
        return;
    }

    pipeX -= 1.5;

    if (pipeX < -50){
        pipeX = 400;
        pipeY = Math.random() * (canvas.height - PIPE_GAP) + PIPE_WIDTH;
    }

    // apply gravity to the bird and let it move
    birdVelocity += birdAcceleration;
    birdY += birdVelocity;
    // console.log(birdVelocity, birdY)

    increaseScore();
    // Draw pipes
    requestAnimationFrame(loop);
}

