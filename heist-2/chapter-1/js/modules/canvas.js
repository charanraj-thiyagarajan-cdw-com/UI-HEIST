// Module for game canvas animation
let animationId = null;
let ctx, canvas;
let x, y, dx, dy, radius;

export function startCanvasAnimation() {
  if (animationId) return;
  const $canvas = $(".game-canvas");
  canvas = $canvas[0];
  if (!canvas || !canvas.getContext) return;
  ctx = canvas.getContext("2d");
  x = 20;
  y = 40;
  dx = 2;
  dy = 2;
  radius = 20;
  draw();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = "#ae0a15";
  ctx.fill();
  ctx.closePath();

  if (x + dx > canvas.width - radius || x + dx < radius) dx = -dx;
  if (y + dy > canvas.height - radius || y + dy < radius) dy = -dy;
  x += dx;
  y += dy;
  animationId = requestAnimationFrame(draw);
}

export function stopCanvasAnimation() {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
  if (ctx && canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}
