import InputHandler from './input.js';
import Player from './player.js';
import Board from './board.js';

class Game {
  constructor(){
    this.$canvasWrapper = document.querySelector('#canvas-wrapper');
    this.$canvas = this.$canvasWrapper.querySelector('canvas');
    this.context = this.$canvas.getContext('2d');

    this.tileSize = 40;

    this.map = [ // 1: 벽, 0: 땅
      [0, 0, 0, 0, 0],
      [0, 1, 1, 0, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 0, 0, 0],
    ];

    this.player = new Player(this);
    this.board = new Board(this);
    this.input = new InputHandler();

    this.equalizeElementSize(this.$canvas, this.$canvasWrapper);
    window.addEventListener('resize', () => {
      this.equalizeElementSize(this.$canvas, this.$canvasWrapper);
    });

    this.gameStop = true;
    setTimeout(() => this.animate(), 500); // 이미지 loading 대기 시간
  }

  update(){
    this.board.update();
    this.player.update();
  }

  draw(){
    this.board.draw();
    this.player.draw();
  }

  startAnimation(){
    if(!this.gameStop) return;
    this.gameStop = false;
    requestAnimationFrame(this.animate);
  }

  endAnimation(){
    this.gameStop = true;
  }

  animate = () => {
    const { width, height } = this.$canvas;
    this.context.clearRect(0, 0, width, height);
    this.update();
    this.draw();
    if(!this.gameStop){
      requestAnimationFrame(this.animate);
    }
  }

  equalizeElementSize($target, $element){
    $target.width = $element.offsetWidth;
    $target.height = $element.offsetHeight;
  }
}

window.addEventListener('load', () => {
  const game = new Game();

  document.querySelector('#gameStartBtn').addEventListener('click', () => {
    game.startAnimation();
  });

  document.querySelector('#gameStopBtn').addEventListener('click', () => {
    game.endAnimation();
  });
});