// canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.style["backgroundColor"] = "#000";
canvas.width = innerWidth;
canvas.height = innerHeight;

class Game {
  // constants 
  CX = canvas.width / 2;
  CY = 240;
  RADIUS = 120;
  TIME = 1000;
  // variables
  p = 1.5;
  quiz = this.createQuiz();
  s = 0;
  timer;

  constructor() {
    this.timer = setInterval(() => this.actionPerformed(), 10);
  }

  createQuiz() {
    const STORE = "ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ";
  
    var a = Math.floor(Math.random() * STORE.length);
    var b = Math.floor(Math.random() * STORE.length);
  
    return STORE[a] + STORE[b];
  }

  renderFrame() {
    ctx.beginPath();
    ctx.lineWidth = 16;
    ctx.strokeStyle = "#eee";
    ctx.arc(this.CX, this.CY, this.RADIUS, 0, 2 * Math.PI);
    ctx.stroke();
  }

  renderGauge() {
    this.p += (20 / (this.TIME / 100)) / 1000;

    ctx.beginPath();
    ctx.lineWidth = 16;
    ctx.strokeStyle = "#08f";
    ctx.arc(this.CX, this.CY, this.RADIUS, this.p * Math.PI, 1.5 * Math.PI);
    ctx.stroke();
  }

  renderQuiz() {
    ctx.font = "100px Monospace";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.fillText(this.quiz, this.CX, this.CY + (100 * 0.35));
  }

  renderMessage(message) {
    ctx.font = "30px Monospace";
    ctx.textAlign = "center";
    ctx.fillText(message, this.CX, this.CY + (20 * 0.5));
  }

  clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  actionPerformed() {
    this.clearCanvas();
    this.renderFrame();
  
    this.s++;  
  
    if (this.s == this.TIME) {
      this.renderMessage("GAME OVER");
      clearInterval(this.timer);
    } else {
      this.renderGauge();
      this.renderQuiz();
    }
  }

  clickHandler(e) {
    var a = Math.pow((e.clientX - this.CX), 2) + Math.pow((e.clientY - this.CY), 2);
    var b = Math.pow(this.RADIUS, 2);
  
    if (a <= b) {
      this.s = 0;
      this.quiz = this.createQuiz();
      this.p = 1.5;
    }
  }
}

var game = new Game();
canvas.addEventListener("click", (e) => game.clickHandler(e));
