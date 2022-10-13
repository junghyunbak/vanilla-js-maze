import InputHandler from './input.js';
import Player from './player.js';
import Board from './board.js';

class Game {
  constructor(){
    this.$canvas = document.querySelector('#canvas-wrapper > canvas');
    this.context = this.$canvas.getContext('2d');

    this.$canvas.width = 400;
    this.$canvas.height = 200;

    this.tileSize = 40;

    this.map = [
      [0, 0, 0, 0, 0],
      [0, 1, 1, 0, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 0, 0, 0],
    ];

    this.player = new Player(this);
    this.board = new Board(this);
    this.input = new InputHandler();

    this.animate();
  }

  update(){
    this.board.update();
    this.player.update();
  }

  draw(){
    this.board.draw();
    this.player.draw();
  }

  animate = () => {
    const { width, height } = this.$canvas;
    this.context.clearRect(0, 0, width, height);
    this.update();
    this.draw();
    requestAnimationFrame(this.animate);
  }
}

window.addEventListener('load', () => {
  new Game();
});