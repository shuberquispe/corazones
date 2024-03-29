// Get the canvas element
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Set canvas width and height
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Array to store heart particles
const hearts = [];

// Random color generator
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}

// Function to create a single heart particle
function createHeart(x, y, size, speedX, speedY) {
  return {
    x: x,
    y: y,
    size: size,
    speedX: speedX,
    speedY: speedY
  };
}

// Function to draw a single heart
function drawHeart(heart) {
  ctx.fillStyle = "red";
  ctx.beginPath();
  var topCurveHeight = heart.size * 0.3;
  ctx.moveTo(heart.x, heart.y + topCurveHeight);
  
  // top left curve
  ctx.bezierCurveTo(
    heart.x, heart.y, 
    heart.x - heart.size / 2, heart.y, 
    heart.x - heart.size / 2, heart.y + topCurveHeight
  );

  // bottom left curve
  ctx.bezierCurveTo(
    heart.x - heart.size / 2, heart.y + (heart.size + topCurveHeight) / 2, 
    heart.x, heart.y + (heart.size + topCurveHeight) / 2, 
    heart.x, heart.y + heart.size
  );

  // bottom right curve
  ctx.bezierCurveTo(
    heart.x, heart.y + (heart.size + topCurveHeight) / 2, 
    heart.x + heart.size / 2, heart.y + (heart.size + topCurveHeight) / 2, 
    heart.x + heart.size / 2, heart.y + topCurveHeight
  );

  // top right curve
  ctx.bezierCurveTo(
    heart.x + heart.size / 2, heart.y, 
    heart.x, heart.y, 
    heart.x, heart.y + topCurveHeight
  );

  ctx.closePath();
  ctx.fillStyle = "red";
  ctx.strokeStyle = "darkred";
	ctx.stroke();
  ctx.fill();
}

// Function to update heart particles
function updateHearts() {
  for (let i = 0; i < hearts.length; i++) {
    const heart = hearts[i];
    heart.x += heart.speedX;
    heart.y += heart.speedY;
    heart.size -= 0.2;
		heart.speedY += 0.1; // Add gravity to simulate falling

    // Remove hearts that have become too small
    if (heart.size <= 0 || heart.y > canvas.height) {
      hearts.splice(i, 1);
      i--;
    }
  }
}

// Function to animate the scene
function animate() {
  requestAnimationFrame(animate);

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update and draw hearts
  updateHearts();
  hearts.forEach(drawHeart);
}

function pushHeart(x, y, numParticles, blastSize) {
	  for (let i = 0; i < numParticles; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 4 + 1;
    const speedX = Math.cos(angle) * speed;
    const speedY = Math.sin(angle) * speed;
    const size = Math.random() * blastSize + 10;
    hearts.push(createHeart(x, y, size, speedX, speedY));
  }
}

// Event listener for mouse click
canvas.addEventListener("click", function (event) {
  const numParticles = 30; // Number of hearts in the blast
  const blastSize = 30; // Size of the blast
  const mouseX = event.clientX;
  const mouseY = event.clientY;

	pushHeart(mouseX, mouseY, numParticles, blastSize)
});

// Startup
pushHeart(canvas.width / 2, canvas.height / 2, 300, 50);

// Start the animation
animate();