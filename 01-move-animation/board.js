export default class Board {
  constructor(game){
    this.game = game;
  }

  update(){}

  draw(){
    const { map, context, tileSize } = this.game;

    map.forEach((row, y) => {
      row.forEach((col, x) => {
        context.beginPath();

        context.rect(
          x*tileSize,
          y*tileSize,
          tileSize,
          tileSize
        )

        context.fillStyle = 'white';
        context.fill();

        context.stroke();

        if(map[y][x]){
          context.beginPath();

          context.moveTo(x*tileSize, y*tileSize);
          context.lineTo(x*tileSize + tileSize, y*tileSize + tileSize);

          context.moveTo(x*tileSize + tileSize, y*tileSize);
          context.lineTo(x*tileSize, y*tileSize + tileSize);

          context.stroke();
        }
      });
    })
  }
}