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
  quiz;
  p = 1.5;
  s = 0;
  start = false;
  timer;

  constructor() {
    this.timer = setInterval(() => this.actionPerformed(), 10);
  }

  initTime() {
    this.s = 0;
  }

  initGauge() {
    this.p = 1.5;
  }

  setGauge() {
    this.p += (20 / (this.TIME / 100)) / 1000;
  }

  updateQuiz() {
    const STORE = "ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ";
  
    var a = Math.floor(Math.random() * STORE.length);
    var b = Math.floor(Math.random() * STORE.length);
  
    this.quiz = STORE[a] + STORE[b];
  }

  renderFrame() {
    ctx.beginPath();
    ctx.lineWidth = 16;
    ctx.strokeStyle = "#eee";
    ctx.arc(this.CX, this.CY, this.RADIUS, 0, 2 * Math.PI);
    ctx.stroke();
  }

  renderInstruction() {
    ctx.font = "30px Monospace";
    ctx.textAlign = "center";
    ctx.fillStyle = "#fff";
    ctx.fillText("START GAME", this.CX, this.CY + (20 * 0.5));
  }

  renderGauge() {
    ctx.beginPath();
    ctx.lineWidth = 16;
    ctx.strokeStyle = "#08f";
    ctx.arc(this.CX, this.CY, this.RADIUS, this.p * Math.PI, 1.5 * Math.PI);
    ctx.stroke();
  }

  renderQuiz() {
    ctx.font = "100px Monospace";
    ctx.textAlign = "center";
    ctx.fillStyle = "#fff";
    ctx.fillText(this.quiz, this.CX, this.CY + (100 * 0.35));
  }

  renderOver() {
    ctx.font = "30px Monospace";
    ctx.textAlign = "center";
    ctx.fillStyle = "#fff";
    ctx.fillText("GAME OVER", this.CX, this.CY + (20 * 0.5));
  }

  clearScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  actionPerformed() {
    this.clearScreen();
    this.renderFrame();

    // Instructions
    if (!this.start) {
      this.renderInstruction();
      return;
    }
  
    // Gauge
    this.setGauge();
    this.renderGauge();

    // Time
    this.s++;  
  
    // Game Over
    if (this.s == this.TIME) {
      this.renderOver("GAME OVER");
      clearInterval(this.timer);
    } else {
      // Quiz
      this.renderQuiz();
    }
  }

  clickHandler(e) {
    var a = Math.pow((e.clientX - this.CX), 2) + Math.pow((e.clientY - this.CY), 2);
    var b = Math.pow(this.RADIUS, 2);
  
    if (a <= b) {
      if (!this.start) {
        this.start = true;
      } 

      this.updateQuiz();
      this.initTime();
      this.initGauge();
    }
  }
}

var game = new Game();
canvas.addEventListener("click", (e) => game.clickHandler(e));
