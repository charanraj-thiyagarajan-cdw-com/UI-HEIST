const tiles = "assets/sprites/tiles.png";
const mountain = "assets/sprites/mountain.png";
const clouds = "assets/sprites/clouds.png";

const items = {
  ground: {
    src: tiles,
    x: 0,
    y: 0,
    w: 16,
    h: 16,
  },
  mountain: {
    src: mountain,
    x: 0,
    y: 0,
    w: 90,
    h: 39,
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
};

let loadedImages = {};

export function loadTilesImage() {
  const sources = [tiles, mountain, clouds];
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

const sprites = {
  ground: new Sprite({ name: "ground" }),
  mountain: new Sprite({ name: "mountain" }),
  smallCloud: new Sprite({ name: "smallCloud", sw: 1.5 }),
  mediumCloud: new Sprite({ name: "mediumCloud", sw: 1.5 }),
  largeCloud: new Sprite({ name: "largeCloud", sw: 1.5 }),
};

export default function getSprite(name) {
  if (sprites[name]) {
    return sprites[name];
  }
}
