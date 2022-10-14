export default class Board {
  constructor(game){
    this.game = game;

    this.image = new Image();
    this.image.src = './tiles.png';

    this.groundCoord = [0, 0, 32, 32];
    this.wallCoord = [32, 0, 32, 32];
  }

  update(){}

  draw(){
    const { map, context, tileSize, player, $canvas } = this.game;
    const uy = player.canvasPos.y; // user y, x
    const ux = player.canvasPos.x;
    const ch = $canvas.height; // canvas height, width
    const cw = $canvas.width;
    const baseX = (cw/2 - ux) - tileSize/2;
    const baseY = (ch/2 - uy) - tileSize/2;

    map.forEach((row, y) => {
      row.forEach((col, x) => {
        const bgImageCoord = map[y][x] === 1
          ? this.wallCoord
          : this.groundCoord;
        context.drawImage(
          this.image,
          ...bgImageCoord,
          baseX + x*tileSize,
          baseY + y*tileSize,
          tileSize,
          tileSize,
        );
      });
    })
  }
}