import Mouse from "./mouse.js";
import Ball from "./ball.js";

let canvas = document.querySelector("#drawOnMe");
let ctx = canvas.getContext("2d");
let pos = new Mouse(canvas);
let balls = [];
let mouse = new Ball(0, 0, 30, "green");

for (let i = 0; i < 1000; i++) {
  balls.push(
    new Ball(
      200 + 100 * Math.cos((i * 2 * Math.PI) / 100),
      200 + 100 * Math.sin((i * 2 * Math.PI) / 100)
    )
  );
}

function ConnectDots(dots) {
  ctx.beginPath();

  for (var i = 0, jlen = dots.length; i <= jlen; ++i) {
    var p0 = dots[i + 0 >= jlen ? i + 0 - jlen : i + 0];
    var p1 = dots[i + 1 >= jlen ? i + 1 - jlen : i + 1];
    ctx.quadraticCurveTo(p0.x, p0.y, (p0.x + p1.x) * 0.5, (p0.y + p1.y) * 0.5);
  }

  ctx.closePath();
  ctx.fill();
}

function Render() {
  window.requestAnimationFrame(Render);
  ctx.clearRect(0, 0, 600, 600);
  mouse.setPos(pos.x, pos.y);
  mouse.draw(ctx);
  balls.forEach((ball) => {
    ball.think(pos);
  });

  ConnectDots(balls);
}

Render();
