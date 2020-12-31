var myScene = document.getElementById('scene');
var myCamera = document.getElementById('camera');
var questionObj = document.getElementById('question');
var answer1Obj = document.getElementById('answer1Text');
var answer2Obj = document.getElementById('answer2Text');
var answer3Obj = document.getElementById('answer3Text');
var scoreObj = document.getElementById('score');
var question = [
    "2 + (-3) = …",
    "-5 + (-2) = …",
    "-7 + 3 + (-1) = …",
    "3 x 4 = ...",
    "32 : 8 = ...",
    "2 x 5 - 6 : 2 = …",
    "1, 3, 6, 10, 15, 21, …",
    "4.096, 2.048, 1.024, 512, 256, …",
    "50, 40, 31, 23, 16, …",
    "Berapa persenkah 280 dari 700?"
];
var answer = [
    ["1", "2", "-1"],
    ["-6", "-7", "-3"],
    ["4", "5", "-5"],
    ["10", "12", "14"],
    ["4", "6", "8"],
    ["2", "-1", "7"],
    ["26", "28", "32"],
    ["128", "132", "143"],
    ["12", "10", "8"],
    ["35%", "37%", "40%"]
];
var correctAnswer = [
    "-1",
    "-7",
    "-5",
    "12",
    "4",
    "7",
    "28",
    "128",
    "10",
    "40%"
];
var questionNum = 0;
var score = 0;

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        let time = minutes + ":" + seconds;
        display.setAttribute("value", time);

        if (--timer < 0) {
            console.log("finish");
            nextQuestion();
            timer = duration;
        }
    }, 1000);
}

function nextQuestion(){
    if (questionNum > 8){
        gameOver();
    }
    else{
        questionNum++;
        questionObj.setAttribute("value", question[questionNum]);
        answer1Obj.setAttribute("value", answer[questionNum][0]);
        answer2Obj.setAttribute("value", answer[questionNum][1]);
        answer3Obj.setAttribute("value", answer[questionNum][2]);
    }
}

function gameOver(){
    console.log("Game Over");
    clearInterval();
}

function scoreIncrement() {
    score++;
    let scoreText = "Score: " + score;
    scoreObj.setAttribute('value', scoreText);
}

function checkAnswer(answerNum) {
    // If correct answer
    if (answer[questionNum][answerNum-1] == correctAnswer[questionNum]){
        scoreIncrement();
    }
}

function getDirection(camera, speed) {
    let y = camera.getAttribute('rotation').y + 90;
    let x = camera.getAttribute('rotation').x;

    let moveX = Math.cos(y / 360 * (Math.PI * 2));
    let moveY = Math.sin(x / 360 * (Math.PI * 2));
    let moveZ = Math.sin(y / 360 * (Math.PI * 2));
    let moveXRatio = (Math.pow(moveX, 2)) / (Math.pow(moveX, 2) + Math.pow(moveZ, 2));
    let moveZRatio = (Math.pow(moveZ, 2)) / (Math.pow(moveX, 2) + Math.pow(moveZ, 2));

    if (moveX <= 0) {
        moveX = -Math.sqrt((1 - Math.pow(moveY, 2)) * moveXRatio);
    } else {
        moveX = Math.sqrt((1 - Math.pow(moveY, 2)) * moveXRatio);
    }

    if (moveZ <= 0) {
        moveZ = -Math.sqrt((1 - Math.pow(moveY, 2)) * moveZRatio);
    } else {
        moveZ = Math.sqrt((1 - Math.pow(moveY, 2)) * moveZRatio);
    }

    return { x: moveX * speed, y: moveY * speed, z: -moveZ * speed };
}

const shoot = () => {
    const ball = document.createElement("a-sphere");
    let camPos = myCamera.getAttribute("position");
    ball.setAttribute("position", camPos);
    ball.setAttribute("velocity", getDirection(myCamera, 10));
    ball.setAttribute("dynamic-body", "shape:sphere");
    ball.setAttribute("radius", 0.4);
    ball.setAttribute("color", "red");
    myScene.appendChild(ball);
    ball.addEventListener('collide', ballCollided);
};

const ballCollided = event => {
    if (event.detail.body.el.id === 'answer1') {
        console.log('Hit answer1');
        checkAnswer(1);
        event.detail.target.el.removeEventListener('collide', ballCollided);
        myScene.removeChild(event.detail.target.el);
    }
    else if (event.detail.body.el.id === 'answer2') {
        console.log('Hit answer2');
        checkAnswer(2);
        event.detail.target.el.removeEventListener('collide', ballCollided);
        myScene.removeChild(event.detail.target.el);
    }
    else if (event.detail.body.el.id === 'answer3') {
        console.log('Hit answer3');
        checkAnswer(3);
        event.detail.target.el.removeEventListener('collide', ballCollided);
        myScene.removeChild(event.detail.target.el);
    }
    
    console.log(score);
};
  
window.onload = function () {
    questionObj.setAttribute("value", question[0]);
    answer1Obj.setAttribute("value", answer[0][0]);
    answer2Obj.setAttribute("value", answer[0][1]);
    answer3Obj.setAttribute("value", answer[0][2]);
    var gameTimer = 5;
    var timerDisplay = document.getElementById('timer');
    startTimer(gameTimer, timerDisplay);
};

document.onkeydown = event => {
    if (event.which == 32) {
      shoot();
    }
};