const r = require("raylib");

const d = require("./detector.js");

const p1 = require("./particle/verticalParticle1.js");
const p2 = require("./particle/verticalParticle2.js");
const p3 = require("./particle/horizontalParticle.js");

let d1;
let d2;
let d3;

function running() {
  return !r.WindowShouldClose();
}

function setup(HEIGHT, WIDTH, TITLE, FPS) {
  r.SetTraceLogLevel(r.LOG_NONE);

  r.InitWindow(WIDTH, HEIGHT, TITLE);
  r.SetTargetFPS(FPS);



  d1 = d.createDetector(0, WIDTH / 2 - 20, 20, HEIGHT, 100, 0, 3);
  d2 = d.createDetector(WIDTH / 2, WIDTH - 20, 20, HEIGHT, WIDTH / 2, 0, 4);
  d3 = d.createDetector(0, HEIGHT - 20, WIDTH, 20, 0, 0, 3);
}

function update() {
  d1 = d.update(d1, "vertical");
  d2 = d.update(d2, "vertical");
  d3 = d.update(d3, "horizontal");
}

function draw() {
  r.BeginDrawing();
  r.ClearBackground(r.BLACK);

  d.drawRange(p1.startX, p1.startY, p1.width, p1.height, r.SKYBLUE);
  d.drawRange(p2.startX, p2.startY, p2.width, p2.height, r.SKYBLUE);
  d.drawRange(p3.startX, p3.startY, p3.width, p3.height, r.SKYBLUE);

  d1.color = d.detectorColor(
    d1.startX,
    d1.width,
    p1.startX,
    p1.width,
    p2.startX,
    p1.width,
  );

  d2.color = d.detectorColor(
    d2.startX,
    d2.width,
    p2.startX,
    p2.width,
    p2.startX,
    p2.width,
  );

  d3.color = d.detectorColor(d3.startY, d3.height, p3.startY, p3.height);

  d1 = d.draw(d1);
  d2 = d.draw(d2);
  d3 = d.draw(d3);

  r.EndDrawing();
}

function teardown() {
  r.CloseWindow();
}

module.exports = {
  running,
  setup,
  update,
  draw,
  teardown,
};
