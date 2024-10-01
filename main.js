(function () {
  // canvas
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  canvas.style["backgroundColor"] = "#000";
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  canvas.addEventListener("click", clickHandler);

  // constants 
  const CX = canvas.width / 2;
  const CY = 240;
  const RADIUS = 120;
  const TIME = 5;

  // variables
  var p = 1.5;
  var quiz = createQuiz();
  var s = 0;
  var _s = 0;

  // controller
  function clickHandler(e) {
    var a = Math.pow((e.clientX - CX), 2) + Math.pow((e.clientY - CY), 2);
    var b = Math.pow(RADIUS, 2);

    if (a <= b) {
      s = 0;
      _s = 0;
      quiz = createQuiz();
      p = 1.5;
    }
  }

  // functions 
  function createQuiz() {
    const STORE = "ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ";

    var a = Math.floor(Math.random() * STORE.length);
    var b = Math.floor(Math.random() * STORE.length);

    return STORE[a] + STORE[b];
  }

  // run
  function main() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // frame
    ctx.beginPath();
    ctx.lineWidth = 16;
    ctx.strokeStyle = "#eee";
    ctx.arc(CX, CY, RADIUS, 0, 2 * Math.PI);
    ctx.stroke();

    // time
    _s++;

    if (_s == 100) { 
      s++;
      _s = 0;
    }

    if (s == TIME) {
      ctx.font = "30px Monospace";
      ctx.textAlign = "center";
      ctx.fillText("TIME OVER", CX, CY + (20 * 0.5));
    } else {
      // gauge
      p += (20 / TIME) / 1000;
      ctx.beginPath();
      ctx.lineWidth = 16;
      ctx.strokeStyle = "#08f";
      ctx.arc(CX, CY, RADIUS, p * Math.PI, 1.5 * Math.PI);
      ctx.stroke();

      // quiz
      ctx.font = "100px Monospace";
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.fillText(quiz, CX, CY + (100 * 0.35));

      requestAnimationFrame(main);
    }
  }

  main();
})();
