const balls = document.querySelectorAll('.ball');
let timeoutId;

function resetEyes() {
    balls.forEach(function(ball) {
        ball.style.left = '50%';
        ball.style.top = '50%';
    });
}

document.onmousemove = function(event) {
    clearTimeout(timeoutId);

    const eyeCenterX = 50;
    const eyeCenterY = 50;
    const maxOffset = 25;

    const xRatio = event.clientX / window.innerWidth - 0.5;
    const yRatio = event.clientY / window.innerHeight - 0.5;

    let xOffset = xRatio * 3 * maxOffset;
    let yOffset = yRatio * 3 * maxOffset;

    const distance = Math.sqrt(xOffset * xOffset + yOffset * yOffset);

    if (distance > maxOffset) {
        const scale = maxOffset / distance;
        xOffset *= scale;
        yOffset *= scale;
    }

    balls.forEach(function(ball) {
        ball.style.left = (eyeCenterX + xOffset) + '%';
        ball.style.top = (eyeCenterY + yOffset) + '%';
        ball.style.transform = 'translate(-50%, -50%)';
    });

    timeoutId = setTimeout(resetEyes, 2000);
};