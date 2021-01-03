var myScene = document.getElementById('scene');
var myCamera = document.getElementById('camera');
var titleObj = document.getElementById('title');
var instructionObj = document.getElementById('instruction');
var startObj = document.getElementById('start');
var questionObj = document.getElementById('question');
var questionNumObj = document.getElementById('questionNum');
var answer1Obj = document.getElementById('answer1Text');
var answer2Obj = document.getElementById('answer2Text');
var answer3Obj = document.getElementById('answer3Text');
var timerDisplay = document.getElementById('timer');
var scoreObj = document.getElementById('score');
var questionNum = 0;
var score = 0;
var gameTimer = 10;
var canShoot = false;
var isFinished = false;
var ballAudio = new Audio("audios/BallThrow.wav");
var bgm = new Audio("audios/music_box_midori_orgel_styx_helix_re_zero.mp3");
var gameOverText;

function initGame() {
    startObj.addEventListener("click", function() {
        myScene.removeChild(titleObj);
        myScene.removeChild(instructionObj);
        myScene.removeChild(startObj);
        startGame();
    });
}

function startGame() {
    if (isFinished){
        myCamera.removeChild(gameOverText);
    }
    questionNum = 0;
    score = -1;
    scoreIncrement();
    canShoot = true;
    isFinished = false;
    setQuestionText();
    startTimer(gameTimer, timerDisplay);
    bgm.play();
}

function setQuestionText() {
    let questionText = "Pertanyaan " + (questionNum+1);
    questionNumObj.setAttribute("value", questionText);
    questionObj.setAttribute("value", question[questionNum]);
    answer1Obj.setAttribute("value", answer[questionNum][0]);
    answer2Obj.setAttribute("value", answer[questionNum][1]);
    answer3Obj.setAttribute("value", answer[questionNum][2]);
    answer1Obj.setAttribute("color", "white");
    answer2Obj.setAttribute("color", "white");
    answer3Obj.setAttribute("color", "white");
}

function checkAnswer(answerNum) {
    // If correct answer
    if (answer[questionNum][answerNum-1] == correctAnswer[questionNum]){
        scoreIncrement();
    }
    revealAnswer();
    setTimeout(nextQuestion, 1000);
}

function nextQuestion(){
    if (questionNum > 8){
        gameOver();
    }
    else{
        clearInterval(timerInterval);
        questionNum++;
        setQuestionText();
        startTimer(gameTimer, timerDisplay);
    }
}

function revealAnswer(){
    if (answer[questionNum][0] == correctAnswer[questionNum]){
        answer1Obj.setAttribute("color", "green");
    }
    else if (answer[questionNum][1] == correctAnswer[questionNum]){
        answer2Obj.setAttribute("color", "green");
    }
    else{
        answer3Obj.setAttribute("color", "green");
    }
}

function gameOver(){
    clearInterval(timerInterval);
    isFinished = true;
    gameOverText = document.createElement("a-text");
    gameOverText.setAttribute("value", "Game Berakhir");
    gameOverText.setAttribute("position", "0 0.2 -1");
    gameOverText.setAttribute("align", "center");
    gameOverText.setAttribute("color", "black");
    myCamera.appendChild(gameOverText);
    bgm.pause();
    bgm.currentTime=0;
}

function scoreIncrement() {
    score++;
    let scoreText = "Score: " + score;
    scoreObj.setAttribute('value', scoreText);
}

window.onload = function () {
    initGame();
};

document.onkeydown = event => {
    if (event.which == 32 && canShoot && !isFinished) {
        canShoot = false;
        setTimeout( function() { canShoot = true; }, 1000);
        shoot();
    }
    else if (event.which == 82 && isFinished) {
        startGame();
    }
};