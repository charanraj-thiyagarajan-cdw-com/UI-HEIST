// Module for game canvas animation
let animationId = null;
let ctx, canvas;
let player, platforms;
let scrollOffset = 0;

const keys = {
  right: false,
  left: false,
};
const ENDPOINT = 1000;

class Platform {
  constructor({ x, y }) {
    this.width = 100;
    this.height = 10;
    this.color = "#fff";
    this.position = { x, y };
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

class Player {
  constructor() {
    this.width = 10;
    this.height = 10;
    this.color = "#ae0a15";
    this.gravity = 0.2;
    this.position = { x: 20, y: canvas.height - this.height };
    this.velocity = { x: 0, y: 0 };
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.draw();
    if (this.position.y + this.height + this.velocity.y < canvas.height) {
      this.velocity.y += this.gravity;
    } else {
      this.velocity.y = 0;
    }
  }
  move(direction, event) {
    this.velocity = { x: 0, y: 0 };
    switch (direction) {
      case "up":
        if (this.position.y + this.height + this.velocity.y > 0) {
          this.velocity.y -= 50;
        }
        break;
      case "down":
        if (this.position.y + this.height + this.velocity.y < canvas.height) {
          this.velocity.y += 25;
        }
        break;
      case "left":
        keys.left = event === "down" ? true : false;
        break;
      case "right":
        keys.right = event === "down" ? true : false;
        break;
      case "a":
        this.color = "#4caf50";
        break;
      case "b":
        this.color = "#ae0a15";
        break;
    }
    this.update();
    this.velocity = { x: 0, y: 0 };
  }
}

export function startCanvasAnimation() {
  if (animationId || !canvas || !canvas.getContext) return;
  ctx = canvas.getContext("2d");
  player = new Player();
  platforms = [new Platform({ x: 300, y: 100 }), new Platform({ x: 100, y: 50 })];
  draw();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  animationId = requestAnimationFrame(draw);
  player.update();
  platforms.forEach((platform) => {
    platform.draw();
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y > platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      player.velocity.y = 0;
    }
  });
  if (keys.left && player.position.x > 20) {
    player.velocity.x = -2.5;
  } else if (keys.right && player.position.x < 120) {
    player.velocity.x = 2.5;
  } else {
    player.velocity.x = 0;
    if (keys.right && scrollOffset < ENDPOINT) {
      scrollOffset += 2.5;
      platforms.forEach((platform) => (platform.position.x -= 2.5));
    } else if (keys.left) {
      scrollOffset -= 2.5;
      platforms.forEach((platform) => (platform.position.x += 2.5));
    }
  }
  if (scrollOffset >= ENDPOINT) {
    console.log("Reached endpoint");
  }
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

export function movePlayer(direction, event) {
  if (player) {
    player.move(direction, event);
  }
}

export function showCanvas() {
  if (!canvas) {
    const $canvas = $(".game-canvas");
    canvas = $canvas[0];
    if (!canvas || !canvas.getContext) return;
    ctx = canvas.getContext("2d");
  }
  if (ctx && canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}
