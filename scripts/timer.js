var timerInterval;

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    timerInterval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        let time = minutes + ":" + seconds;
        display.setAttribute("value", time);

        if (--timer < 0) {
            revealAnswer();
            setTimeout(nextQuestion, 1000);
            timer = duration;
        }
    }, 1000);
}