var myScene = document.getElementById('scene');
var myCamera = document.getElementById('camera');

function getDirection(camera, speed) {
    var y = camera.getAttribute('rotation').y + 90;
    var x = camera.getAttribute('rotation').x;

    var moveX = Math.cos(y / 360 * (Math.PI * 2));
    var moveY = Math.sin(x / 360 * (Math.PI * 2));
    var moveZ = Math.sin(y / 360 * (Math.PI * 2));
    var moveXRatio = (Math.pow(moveX, 2)) / (Math.pow(moveX, 2) + Math.pow(moveZ, 2));
    var moveZRatio = (Math.pow(moveZ, 2)) / (Math.pow(moveX, 2) + Math.pow(moveZ, 2));

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
    const bullet = document.createElement("a-sphere");
    let pos = myCamera.getAttribute("position");
    bullet.setAttribute("position", pos);
    bullet.setAttribute("velocity", getDirection(myCamera, 10));
    bullet.setAttribute("dynamic-body", "shape:sphere");
    bullet.setAttribute("radius", 0.4);
    myScene.appendChild(bullet);
};
  
document.onkeydown = event => {
    if (event.which == 32) {
      shoot();
    }
};