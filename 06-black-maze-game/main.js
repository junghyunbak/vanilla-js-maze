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

    this.prevTimestamp;
    this.fps = 60;
    this.fpsInterval = 1000 / this.fps;

    this.equalizeElementSize(this.$canvas, this.$canvasWrapper);
    this.paint();

    window.addEventListener('resize', () => {
      this.equalizeElementSize(this.$canvas, this.$canvasWrapper);
      this.paint();
    });

    this.isStopped = true;
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

  paint = () => {
    // clear
    this.context.clearRect(
      0,
      0,
      this.$canvas.width,
      this.$canvas.height
    );
    // update
    this.board.update();
    this.decoration.update();
    this.player.update();
    // draw
    this.board.draw();
    this.decoration.draw();
    this.player.draw();
  }

  animate = (timestamp) => {
    if(this.prevTimestamp === undefined){
      this.prevTimestamp = window.performance.now();
    }

    const elapsed = timestamp - this.prevTimestamp;

    if(elapsed >= this.fpsInterval){
      this.prevTimestamp = timestamp - (elapsed % this.fpsInterval);
      this.paint();
    }

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