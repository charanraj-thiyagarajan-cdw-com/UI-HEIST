const tiles = "./assets/sprites/tiles.png";
const mountain = "./assets/sprites/mountain.png";
const clouds = "./assets/sprites/clouds.png";
const characters = "./assets/sprites/characters.png";
const castle = "./assets/sprites/castle.png";

const items = {
  ground: {
    src: tiles,
    x: 0,
    y: 0,
    w: 16,
    h: 16,
  },
  water: {
    src: tiles,
    x: 50,
    y: 397,
    w: 20,
    h: 20,
  },
  mountain: {
    src: mountain,
    x: 0,
    y: 0,
    w: 90,
    h: 39,
  },
  shrub: {
    src: tiles,
    x: 198.5,
    y: 162.5,
    w: 53,
    h: 17,
  },
  smallCloud: {
    src: clouds,
    x: 64.5,
    y: 0,
    w: 33,
    h: 24,
  },
  mediumCloud: {
    src: clouds,
    x: 0,
    y: 24.5,
    w: 48,
    h: 24,
  },
  largeCloud: {
    src: clouds,
    x: 0,
    y: 0,
    w: 64,
    h: 24,
  },
  pipe: {
    src: tiles,
    x: 0,
    y: 180,
    w: 35,
    h: 35,
  },
  brick: {
    src: tiles,
    x: 0,
    y: 18,
    w: 18,
    h: 18,
  },
  marioRight: {
    src: characters,
    x: 293,
    y: 0,
    w: 19,
    h: 32,
  },
  marioLeft: {
    src: characters,
    x: 220,
    y: 0,
    w: 19,
    h: 32,
  },
  marioRightStand: {
    src: characters,
    x: 236,
    y: 0,
    w: 19,
    h: 32,
  },
  marioLeftStand: {
    src: characters,
    x: 218,
    y: 0,
    w: 19,
    h: 32,
  },
  castle: {
    src: castle,
    x: 0,
    y: 0,
    w: 80,
    h: 80,
  },
};

let loadedImages = {};

export function loadTilesImage() {
  const sources = [tiles, mountain, clouds, characters, castle];
  sources.forEach((src) => {
    if (loadedImages[src]) return;
    const img = new window.Image();
    img.src = src;
    img.onload = () => {
      loadedImages[src] = img;
    };
  });
}

class Sprite {
  constructor({ name, sw = 1, sh = 1 } = {}) {
    let item = items[name];
    this.name = name;
    this.x = item.x;
    this.y = item.y;
    this.w = item.w;
    this.h = item.h;
    this.src = item.src;
    this.sw = sw * item.w;
    this.sh = sh * item.h;
  }
  draw(ctx, dx = 0, dy = 0) {
    const img = loadedImages[this.src];
    if (img) {
      ctx.drawImage(img, this.x, this.y, this.w, this.h, dx, dy, this.sw, this.sh);
    }
  }
}

class CharacterSprite {
  constructor({ character }) {
    this.character = character;
    let item = items[character];
    this.x = item.x;
    this.y = item.y;
    this.w = item.w;
    this.h = item.h;
    this.src = item.src;
  }
  draw(ctx, frame, dx, dy, w, h) {
    const img = loadedImages[this.src];
    if (img) {
      ctx.drawImage(img, this.x + frame * this.w, this.y, this.w, this.h, dx, dy, w, h);
    }
  }
}

const sprites = {
  ground: new Sprite({ name: "ground" }),
  mountain: new Sprite({ name: "mountain" }),
  smallCloud: new Sprite({ name: "smallCloud", sw: 1.5 }),
  mediumCloud: new Sprite({ name: "mediumCloud", sw: 1.5 }),
  largeCloud: new Sprite({ name: "largeCloud", sw: 1.5 }),
  shrub: new Sprite({ name: "shrub" }),
  pipe: new Sprite({ name: "pipe" }),
  water: new Sprite({ name: "water" }),
  brick: new Sprite({ name: "brick", sw: 0.75, sh: 0.75 }),
  marioRight: new CharacterSprite({ character: "marioRight" }),
  marioLeft: new CharacterSprite({ character: "marioLeft" }),
  marioRightStand: new CharacterSprite({ character: "marioRightStand" }),
  marioLeftStand: new CharacterSprite({ character: "marioLeftStand" }),
  castle: new Sprite({ name: "castle" }),
};

export default function getSprite(name) {
  if (sprites[name]) {
    return sprites[name];
  }
}
