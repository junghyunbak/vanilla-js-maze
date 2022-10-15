const ARROW_TYPE = Object.freeze({
  RIGHT: 'ArrowRight',
  LEFT: 'ArrowLeft',
  DOWN: 'ArrowDown',
  UP: 'ArrowUp',
});

const DIR_TYPE = Object.freeze({
  RIGHT: 0,
  LEFT: 1,
  DOWN: 2,
  UP: 3,
});

export default class Player {
  constructor(game){
    this.game = game;
    this.init();
  }

  init(){
    this.mapPos = { y: 1, x: 1 };
    this.canvasPos = { y: this.game.tileSize, x: this.game.tileSize };

    this.moveCnt = { right: 0, left: 0, down: 0, up: 0 };
    this.speed = 2;

    this.dir = DIR_TYPE.DOWN; // 0: 동, 1: 서, 2: 남, 3: 북
    this.dirImageCoord = [
      [
        [16, 0, 16, 17],
        [16, 17, 16, 17],
        [16, 34, 16, 17],
      ],
      [
        [48, 0, 16, 17],
        [48, 17, 16, 17],
        [48, 34, 16, 17],
      ],
      [
        [0, 0, 16, 17],
        [0, 17, 16, 17],
        [0, 34, 16, 17],
      ],
      [
        [32, 0, 16, 17],
        [32, 17, 16, 17],
        [32, 34, 16, 17],
      ],
    ];

    this.image = document.querySelector('#tinyMale01');

    this.exit = false;
  }

  update(){
    const { keys } = this.game.input;
    
    if(!this.isMove()){
      if(keys.has(ARROW_TYPE.RIGHT)){
        const { ny, nx } = this.getNextPosition(ARROW_TYPE.RIGHT);
        this.dir = DIR_TYPE.RIGHT;
        if(this.validatePosition(ny, nx)){
          this.moveCnt.right = this.game.tileSize;
          this.setMapPosition(ny, nx);
        }
      }
      else if(keys.has(ARROW_TYPE.LEFT)){
        const { ny, nx } = this.getNextPosition(ARROW_TYPE.LEFT);
        this.dir = DIR_TYPE.LEFT;
        if(this.validatePosition(ny, nx)){
          this.moveCnt.left = this.game.tileSize;
          this.setMapPosition(ny, nx);
        }
      }
      else if(keys.has(ARROW_TYPE.DOWN)){
        const { ny, nx } = this.getNextPosition(ARROW_TYPE.DOWN);
        this.dir = DIR_TYPE.DOWN;
        if(this.validatePosition(ny, nx)){
          this.moveCnt.down = this.game.tileSize;
          this.setMapPosition(ny, nx);
        }
      }
      else if(keys.has(ARROW_TYPE.UP)){
        const { ny, nx } = this.getNextPosition(ARROW_TYPE.UP);
        this.dir = DIR_TYPE.UP;
        if(this.validatePosition(ny, nx)){
          this.moveCnt.up = this.game.tileSize;
          this.setMapPosition(ny, nx);
        }
      }
    }

    if(this.moveCnt.right > 0){
      this.moveCnt.right -= this.speed;
      this.canvasPos.x += this.speed;
    }
    else if(this.moveCnt.left > 0){
      this.moveCnt.left -= this.speed;
      this.canvasPos.x -= this.speed;
    }
    else if(this.moveCnt.up > 0){
      this.moveCnt.up -= this.speed;
      this.canvasPos.y -= this.speed;
    }
    else if(this.moveCnt.down > 0){
      this.moveCnt.down -= this.speed;
      this.canvasPos.y += this.speed;
    }
    else{
      if(this.isGoal()){
        this.game.endAnimation();
        this.exit = true;
      }
    }
  }

  draw(){
    const { context, tileSize, $canvas } = this.game;

    // foggy
    context.beginPath();
    context.arc(
      $canvas.width/2,
      $canvas.height/2,
      Math.max($canvas.width, $canvas.height),
      0,
      2*Math.PI,
      true
    ); // outer clockwise
    context.arc(
      $canvas.width/2,
      $canvas.height/2,
      100,
      0,
      2*Math.PI,
      false
    ); // inner clockwise
    context.fill();
    context.closePath();

    if(this.exit) return;

    // character
    const walkState = !this.isMove()
      ? 0
      : this.getMaxMoveCnt() > tileSize/2
      ? 1
      : 2;
    context.drawImage(
      this.image,
      ...this.dirImageCoord[this.dir][walkState],
      $canvas.width/2 - tileSize/2,
      $canvas.height/2 - tileSize/2,
      tileSize,
      tileSize,
    );
  }

  isMove(){
    const { left, right, down, up } = this.moveCnt;
    return (left || right || down || up);
  }

  isGoal(){
    const [dy, dx] = this.game.endCoord;
    return (dy === this.mapPos.y && dx === this.mapPos.x);
  }

  getMaxMoveCnt(){
    const { left, right, down, up } = this.moveCnt;
    return Math.max(left, right, down, up);
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