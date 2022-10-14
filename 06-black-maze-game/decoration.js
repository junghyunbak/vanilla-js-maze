export default class Decoration {
  constructor(game){
    this.game = game;

    this.image = new Image();
    this.image.src = './tiles.png';

    this.startCoord = [...this.game.startCoord, 64, 0, 32, 32]; // y, x, sx, sy, sw, sh
    this.endCoord = [...this.game.endCoord, 96, 0, 32, 32];
  }

  update(){}

  draw(){
    const { context, tileSize, player, $canvas } = this.game;
    const uy = player.canvasPos.y; // user y, x
    const ux = player.canvasPos.x;
    const ch = $canvas.height; // canvas height, width
    const cw = $canvas.width;
    const baseX = (cw/2 - ux) - tileSize/2;
    const baseY = (ch/2 - uy) - tileSize/2;

    [this.startCoord, this.endCoord].forEach(coord => {
      const [y, x, ...imgCoord] = coord;
      context.drawImage(
        this.image,
        ...imgCoord,
        baseX + x*tileSize,
        baseY + y*tileSize,
        tileSize,
        tileSize,
      );
    });
  }
}