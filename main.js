(function () {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  
  canvas.style["backgroundColor"] = "#000";
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  canvas.addEventListener("click", clickHandler);

  /* constants*/

  const STORE = "ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ";
  const CX = canvas.width / 2;
  const CY = 240;
  const RADIUS = 120;
  const TIME = 10;

  /* variables */
  
  var p = 1.5;
  var q = createQuiz();
  var s = 0;
  var _s = 0;
  var over = false

  /* run the game */

  setInterval(() => {
    clearCanvas();
    drawBackground();
    
    if (!over) {
      drawFill();
      drawQuiz();
    } else {
      drawOver();
    }

    setTime();
  }, 10);

  /* functions */

  function setTime() {
    _s++

    if (_s == 100) { // 1s
      s++;
      _s = 0;
    }

    if (s == TIME) {
      over = true;
    }
  }
  
  function createQuiz() {
    var a = Math.floor(Math.random() * STORE.length);
    var b = Math.floor(Math.random() * STORE.length);

    return STORE[a] + STORE[b];
  }

  /* draw */
  
  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function drawBackground() {
    ctx.font = "30px Monospace";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.fillText("# CHOSUNG GAME", CX, 60);

    ctx.beginPath();
    ctx.lineWidth = 16;
    ctx.strokeStyle = "#eee";
    ctx.arc(CX, CY, RADIUS, 0, 2 * Math.PI);
    ctx.stroke();
  }

  function drawFill() {
    p += (20 / TIME) / 1000;

    ctx.beginPath();
    ctx.lineWidth = 16;
    ctx.strokeStyle = "#08f";
    ctx.arc(CX, CY, RADIUS, p * Math.PI, 1.5 * Math.PI);
    ctx.stroke();
  }

  function drawQuiz() {
    ctx.font = "100px Monospace";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.fillText(q, CX, CY + (100 * 0.35));
  }

  function drawOver() {
    ctx.font = "30px Monospace";
    ctx.textAlign = "center";
    ctx.fillText("TIME OVER", CX, CY + (20 * 0.5));
  }

  /* control */

  function clickHandler(e) {
    var a = Math.pow((e.clientX - CX), 2) + Math.pow((e.clientY - CY), 2);
    var b = Math.pow(RADIUS, 2);

    if (a <= b) {
      p = 1.5;
      q = createQuiz();
      s = 0;
      _s = 0;
    }
  }
})();



