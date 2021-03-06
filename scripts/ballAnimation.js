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
    }
    else {
        moveX = Math.sqrt((1 - Math.pow(moveY, 2)) * moveXRatio);
    }

    if (moveZ <= 0) {
        moveZ = -Math.sqrt((1 - Math.pow(moveY, 2)) * moveZRatio);
    }
    else {
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
    ball.setAttribute("material", "src:#ballMtl");
    ball.setAttribute("radius", 0.5);
    myScene.appendChild(ball);
    ballAudio.play();
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
};