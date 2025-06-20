// Module for game canvas animation
import getSprite from "./image.js";
import { playJumpAudio, playDeathAudio, playFinishAudio } from "./volume.js";

let animationId = null;
let ctx, canvas;
let player, platforms, backgrounds;
let scrollOffset = 0;
let totalScreenWidth;
const keys = {
  right: false,
  left: false,
};
const ENDPOINT = 2000;
let currentCharacter = "mario";

function getCharacterSprites(character = currentCharacter) {
  if (character === "luigi") {
    return {
      rstand: getSprite("luigiRightStand"),
      lstand: getSprite("luigiLeftStand"),
      right: getSprite("luigiRight"),
      left: getSprite("luigiLeft"),
    };
  } else {
    return {
      rstand: getSprite("marioRightStand"),
      lstand: getSprite("marioLeftStand"),
      right: getSprite("marioRight"),
      left: getSprite("marioLeft"),
    };
  }
}

class Platform {
  constructor({ x, y, sprite }) {
    this.position = { x, y };
    this.sprite = sprite;
    this.width = sprite ? sprite.w : 100;
    this.height = sprite ? sprite.h : 10;
  }
  draw() {
    if (this.sprite && this.sprite.draw) {
      this.sprite.draw(ctx, this.position.x, this.position.y);
    }
  }
}

class Background {
  constructor({ x, y, sprite }) {
    this.position = { x, y };
    this.sprite = sprite;
    this.width = sprite ? sprite.w : 100;
    this.height = sprite ? sprite.h : 10;
  }
  draw() {
    if (this.sprite && this.sprite.draw) {
      this.sprite.draw(ctx, this.position.x, this.position.y);
    }
  }
}

class Player {
  constructor() {
    this.width = 16;
    this.height = 16;
    this.gravity = 0.2;
    this.speed = 2;
    this.position = { x: 20, y: canvas.height - this.height * 4 };
    this.velocity = { x: 0, y: 0 };
    this.onPlatform = false;
    this.frames = 1;
    this.frameTick = 0;
    this.frameRate = 16;
    this.currentSprite = "rstand";
    this.sprites = getCharacterSprites();
  }
  draw() {
    if (this.currentSprite === "left") {
      this.sprites.left.draw(ctx, -this.frames, this.position.x, this.position.y, this.width, this.height);
    } else if (this.currentSprite === "right") {
      this.sprites.right.draw(ctx, this.frames, this.position.x, this.position.y, this.width, this.height);
    } else if (this.currentSprite === "rstand") {
      this.sprites.rstand.draw(ctx, 1, this.position.x, this.position.y, this.width, this.height);
    } else {
      this.sprites.lstand.draw(ctx, 1, this.position.x, this.position.y, this.width, this.height);
    }
  }
  update() {
    this.frameTick++;
    if (this.frameTick % this.frameRate === 0) {
      this.frames++;
      if (this.frames >= 4) this.frames = 1;
    }
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
        if (this.position.y + this.height + this.velocity.y > 0 && this.onPlatform) {
          this.velocity.y -= 50;
          playJumpAudio();
        }
        break;
      case "down":
        if (!this.onPlatform && this.position.y + this.height + this.velocity.y < canvas.height) {
          this.velocity.y += 25;
        }
        break;
      case "left":
        if (event == "down") {
          keys.left = true;
          this.currentSprite = "left";
        } else {
          keys.left = false;
          this.currentSprite = "lstand";
        }
        break;
      case "right":
        if (event === "down") {
          keys.right = true;
          this.currentSprite = "right";
        } else {
          keys.right = false;
          this.currentSprite = "rstand";
        }
        break;
      case "a":
        currentCharacter = "mario";
        this.sprites = getCharacterSprites(currentCharacter);
        break;
      case "b":
        currentCharacter = "luigi";
        this.sprites = getCharacterSprites(currentCharacter);
        break;
    }
    this.update();
    this.velocity = { x: 0, y: 0 };
  }
}

function initGame() {
  totalScreenWidth = ENDPOINT + canvas.width;
  ctx = canvas.getContext("2d");
  player = new Player();
  const groundSprite = getSprite("ground");
  const mountainSprite = getSprite("mountain");
  const smallCloudSprite = getSprite("smallCloud");
  const mediumCloudSprite = getSprite("mediumCloud");
  const largeCloudSprite = getSprite("largeCloud");
  const shrubSprite = getSprite("shrub");
  const pipeSprite = getSprite("pipe");
  const waterSprite = getSprite("water");
  const brickSprite = getSprite("brick");
  const castleSprite = getSprite("castle");
  platforms = [];
  backgrounds = [];
  scrollOffset = 0;
  const tileW = groundSprite.w;
  const tileH = groundSprite.h;
  // Add mountains
  for (let i = 0; i < 10; i++) {
    let mx = Math.floor(Math.random() * totalScreenWidth);
    let my = canvas.height - 2 * tileH - mountainSprite.h;
    backgrounds.push(new Background({ x: mx, y: my, sprite: mountainSprite }));
  }
  // Add shrubs
  for (let i = 0; i < 15; i++) {
    let sx = Math.floor(Math.random() * totalScreenWidth);
    let sy = canvas.height - 2 * tileH - shrubSprite.h;
    backgrounds.push(new Background({ x: sx, y: sy, sprite: shrubSprite }));
  }
  // Add clouds
  const cloudSprites = [smallCloudSprite, mediumCloudSprite, largeCloudSprite];
  for (let i = 0; i < 15; i++) {
    let cx = Math.floor(Math.random() * totalScreenWidth);
    let cy = Math.floor(Math.random() * (canvas.height / 2));
    let sprite = cloudSprites[Math.floor(Math.random() * cloudSprites.length)];
    backgrounds.push(new Background({ x: cx, y: cy, sprite }));
  }
  // Add ground platforms (two stacked tiles)
  let x = 0;
  let lastWasWater = false;

  while (x < totalScreenWidth) {
    if (!lastWasWater && x > 100 && Math.random() < 0.15 && x + tileW * 4 < totalScreenWidth) {
      for (let wx = x; wx < x + tileW * 2; wx += waterSprite.w) {
        backgrounds.push(new Background({ x: wx, y: canvas.height - 2 * tileH, sprite: waterSprite }));
      }
      x += tileW * 2;
      lastWasWater = true;
      continue;
    }
    platforms.push(new Platform({ x: x, y: canvas.height - tileH, sprite: groundSprite }));
    platforms.push(new Platform({ x: x, y: canvas.height - 2 * tileH, sprite: groundSprite }));
    x += tileW;
    lastWasWater = false;
  }
  // Add pipes platforms
  for (let i = 0; i < 4; i++) {
    let px = Math.floor(Math.random() * (ENDPOINT - canvas.width)) + canvas.width;
    let py = canvas.height - 2 * tileH - pipeSprite.h;
    platforms.push(new Platform({ x: px, y: py, sprite: pipeSprite }));
  }
  // Add combinations of 3-5 bricks
  let lastWasBrick = false;
  x = Math.floor(canvas.width / 2);
  while (x < totalScreenWidth) {
    if (!lastWasBrick && Math.random() < 0.15) {
      const numBricks = Math.floor(Math.random() * 3) + 3;
      const brickY = Math.floor(canvas.height / 4 + Math.random() * (canvas.height / 4));
      for (let bx = 0; bx < numBricks; bx++) {
        platforms.push(new Platform({ x: x + bx * brickSprite.sw, y: brickY, sprite: brickSprite }));
      }
      x += numBricks * brickSprite.sw;
      lastWasBrick = true;
      continue;
    }
    x += tileW;
    lastWasBrick = false;
  }
  // Add castle
  platforms.push(
    new Platform({
      x: ENDPOINT + castleSprite.w,
      y: canvas.height - 2 * tileH - castleSprite.h,
      sprite: castleSprite,
    })
  );
}

export function startCanvasAnimation() {
  if (animationId || !canvas || !canvas.getContext) return;
  initGame();
  draw();
}

function resetGame() {
  cancelAnimationFrame(animationId);
  animationId = null;
  if (player) {
    player.velocity = { x: 0, y: 0 };
  }
  player = null;
  platforms = [];
  backgrounds = [];
  scrollOffset = 0;
  totalScreenWidth = 0;
  keys.left = false;
  keys.right = false;
  showGameOverScreen();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#64adff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  animationId = requestAnimationFrame(draw);
  backgrounds.forEach((background) => {
    background.draw();
  });
  player.onPlatform = false;
  platforms.forEach((platform) => {
    platform.draw();
    if (
      Math.abs(player.position.y + player.height - platform.position.y) < 2 &&
      player.position.x + player.width > platform.position.x &&
      player.position.x < platform.position.x + platform.width
    ) {
      player.onPlatform = true;
    }
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y > platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      player.velocity.y = 0;
    }
  });
  player.update();
  if (keys.left && player.position.x > 20) {
    player.velocity.x = -player.speed;
  } else if (keys.right && player.position.x < 120) {
    player.velocity.x = player.speed;
  } else {
    player.velocity.x = 0;
    if (keys.right && scrollOffset < ENDPOINT) {
      scrollOffset += player.speed;
      platforms.forEach((platform) => (platform.position.x -= player.speed));
      backgrounds.forEach((background) => {
        background.position.x -= background.sprite.name === "water" ? player.speed : player.speed * 0.66;
      });
    } else if (keys.left && scrollOffset > 0) {
      scrollOffset -= player.speed;
      platforms.forEach((platform) => (platform.position.x += player.speed));
      backgrounds.forEach((background) => {
        background.position.x += background.sprite.name === "water" ? player.speed : player.speed * 0.66;
      });
    }
  }
  if (scrollOffset >= ENDPOINT) {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
    playFinishAudio();
  }
  if (player.position.y + player.height + 2 > canvas.height) {
    playDeathAudio();
    resetGame();
  }
}

export function showLogoScreen() {
  if (!canvas) {
    const $canvas = $(".game-canvas");
    canvas = $canvas[0];
    if (!canvas || !canvas.getContext) return;
    ctx = canvas.getContext("2d");
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#64adff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const logoImg = new window.Image();
  logoImg.src = "./assets/sprites/logo.png";
  logoImg.onload = function () {
    const logoW = canvas.width / 2;
    const logoH = canvas.height / 3;
    const logoX = (canvas.width - logoW) / 2;
    const logoY = (canvas.height - logoH) / 2 - 20;
    ctx.drawImage(logoImg, logoX, logoY, logoW, logoH);
    ctx.font = "12px 'Press Start 2P', monospace";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.fillText("PRESS START TO PLAY", canvas.width / 2, logoY + logoH + 40);
  };
  if (logoImg.complete) logoImg.onload();
}

export function showGameOverScreen() {
  if (!canvas) {
    const $canvas = $(".game-canvas");
    canvas = $canvas[0];
    if (!canvas || !canvas.getContext) return;
    ctx = canvas.getContext("2d");
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#64adff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const gameOverImg = new window.Image();
  gameOverImg.src = "./assets/sprites/gameover.png";
  gameOverImg.onload = function () {
    const imgW = canvas.width / 2;
    const imgH = canvas.height / 3;
    const imgX = (canvas.width - imgW) / 2;
    const imgY = (canvas.height - imgH) / 2 - 20;
    ctx.drawImage(gameOverImg, imgX, imgY, imgW, imgH);
    ctx.font = "12px 'Press Start 2P', monospace";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.fillText("PRESS START TO PLAY", canvas.width / 2, imgY + imgH + 40);
  };
  if (gameOverImg.complete) gameOverImg.onload();
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
