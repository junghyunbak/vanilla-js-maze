import InputHandler from './input.js';
import Player from './player.js';
import Board from './board.js';
import Decoration from './decoration.js';

class Game {
  constructor(){
    this.$canvasWrapper = document.querySelector('#canvas-wrapper');
    this.$canvas = this.$canvasWrapper.querySelector('canvas');
    this.context = this.$canvas.getContext('2d');

    this.tileSize = 40;

    this.map = [ // 0: 땅, 1: 벽
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 0, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 1, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    this.startCoord = [1, 1];
    this.endCoord = [7, 7];

    this.player = new Player(this);
    this.board = new Board(this);
    this.decoration = new Decoration(this);
    this.input = new InputHandler();

    this.equalizeElementSize(this.$canvas, this.$canvasWrapper);
    window.addEventListener('resize', () => {
      this.equalizeElementSize(this.$canvas, this.$canvasWrapper);
    });

    this.isStopped = true;
    setTimeout(() => this.animate(), 500); // 이미지 loading 대기 시간
  }

  update(){
    this.board.update();
    this.decoration.update();
    this.player.update();
  }

  draw(){
    this.board.draw();
    this.decoration.draw();
    this.player.draw();
  }

  startAnimation(){
    if(!this.isStopped) return;
    this.isStopped = false;
    requestAnimationFrame(this.animate);
  }

  endAnimation(){
    this.isStopped = true;
    alert('finish');
  }

  resetGame(){
    this.isStopped = true;
    this.player.init();
    this.animate();
  }

  animate = () => {
    const { width, height } = this.$canvas;
    this.context.clearRect(0, 0, width, height);
    this.update();
    this.draw();
    if(!this.isStopped){
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

  document.querySelector('#gameResetBtn').addEventListener('click', () => {
    game.resetGame();
  });
});