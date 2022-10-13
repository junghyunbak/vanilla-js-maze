export default class InputHandler {
  constructor(){
    this.keys = new Set();
    this.setBtnEvent();
    this.setKeyEvent();
  }

  setBtnEvent(){
    document.querySelectorAll('button[id$=ArrowBtn]').forEach(button => {
      button.addEventListener('mousedown', (e) => {
        this.keys.add(e.target.value);
      });
      
      button.addEventListener('mouseup', (e) => {
        this.keys.delete(e.target.value);
      });
      
      button.addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.keys.add(e.target.value);
      });

      button.addEventListener('touchend', (e) => {
        this.keys.delete(e.target.value);
      });
    });
  }

  setKeyEvent(){
    window.addEventListener('keydown', (e) => {
      if(
        e.key === 'ArrowDown' ||
        e.key === 'ArrowUp' ||
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight'
      ){
        this.keys.add(e.key);
      }
    });

    window.addEventListener('keyup', (e) => {
      if(
        e.key === 'ArrowDown' ||
        e.key === 'ArrowUp' ||
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight'
      ){
        this.keys.delete(e.key);
      }
    });
  }
}