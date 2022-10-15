export default class Player {
  constructor(game){
    this.game = game;
    this.mapPos = { y: 0, x: 0 };
    this.canvasPos = { y: 0, x: 0 };
    this.moveCnt = { right: 0, left: 0, down: 0, up: 0 };
    this.speed = 2;
  }

  update(){
    const { keys } = this.game.input;
    
    if(keys.has('ArrowRight')){
      const { ny, nx } = this.getNextPosition('ArrowRight');
      if(
        this.validatePosition(ny, nx) &&
        !this.moveCnt.right
      ){
        this.moveCnt.right = this.game.tileSize;
        this.setMapPosition(ny, nx);
      }
    }

    if(keys.has('ArrowLeft')){
      const { ny, nx } = this.getNextPosition('ArrowLeft');
      if(
        this.validatePosition(ny, nx) &&
        !this.moveCnt.left
      ){
        this.moveCnt.left = this.game.tileSize;
        this.setMapPosition(ny, nx);
      }
    }

    if(keys.has('ArrowDown')){
      const { ny, nx } = this.getNextPosition('ArrowDown');
      if(
        this.validatePosition(ny, nx) &&
        !this.moveCnt.down
      ){
        this.moveCnt.down = this.game.tileSize;
        this.setMapPosition(ny, nx);
        return;
      }
    }

    if(keys.has('ArrowUp')){
      const { ny, nx } = this.getNextPosition('ArrowUp');
      if(
        this.validatePosition(ny, nx) &&
        !this.moveCnt.up
      ){
        this.moveCnt.up = this.game.tileSize;
        this.setMapPosition(ny, nx);
        return;
      }
    }

    if(this.moveCnt.right > 0){
      this.moveCnt.right -= this.speed;
      this.canvasPos.x += this.speed;
    }

    if(this.moveCnt.left > 0){
      this.moveCnt.left -= this.speed;
      this.canvasPos.x -= this.speed;
    }

    if(this.moveCnt.up > 0){
      this.moveCnt.up -= this.speed;
      this.canvasPos.y -= this.speed;
    }

    if(this.moveCnt.down > 0){
      this.moveCnt.down -= this.speed;
      this.canvasPos.y += this.speed;
    }
  }

  draw(){
    const { context, tileSize } = this.game;
    context.beginPath();
    context.arc(
      this.canvasPos.x + tileSize/2,
      this.canvasPos.y + tileSize/2,
      tileSize/4,
      0,
      2*Math.PI
    );
    context.stroke();
    context.fillStyle = 'black'
    context.fill();
  }

  setMapPosition(y, x){
    this.mapPos.y = y;
    this.mapPos.x = x;
  }

  validatePosition(y, x){
    const { map } = this.game;
    const r = map.length;
    const c = map[0].length;
    if(y < 0 || y >= r || x < 0 || x >= c) return false;
    if(map[y][x]) return false;
    return true;
  }

  getNextPosition(key){
    const nextPos = { ny: this.mapPos.y, nx: this.mapPos.x };
    switch(key){
      case ARROW_TYPE.RIGHT:
        nextPos.nx += 1;
        break;
      case ARROW_TYPE.LEFT:
        nextPos.nx -= 1;
        break;
      case ARROW_TYPE.DOWN:
        nextPos.ny += 1;
        break;
      case ARROW_TYPE.UP:
        nextPos.ny -= 1;
        break;
    }
    return nextPos;
  }
}