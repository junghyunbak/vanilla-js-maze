export default class Board {
  constructor(game){
    this.game = game;
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
        context.beginPath();

        context.rect(
          baseX + x*tileSize,
          baseY + y*tileSize,
          tileSize,
          tileSize
        )

        context.fillStyle = 'white';
        context.fill();

        context.stroke();

        if(map[y][x]){
          context.beginPath();

          context.moveTo(
            baseX + x*tileSize,
            baseY + y*tileSize
          );
          context.lineTo(
            baseX + x*tileSize + tileSize,
            baseY + y*tileSize + tileSize
          );

          context.moveTo(
            baseX + x*tileSize + tileSize,
            baseY + y*tileSize
          );
          context.lineTo(
            baseX + x*tileSize,
            baseY + y*tileSize + tileSize
          );

          context.stroke();
        }
      });
    })
  }
}