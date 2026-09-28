const r = require("raylib");

const d = require("./detector/detectorFunctions.js");

const p1 = require("./particle/verticalParticle1.js");
const p2 = require("./particle/verticalParticle2.js");
const p3 = require("./particle/horizontalParticle.js");

const d1 = require("./detector/verticalDetector1.js");
const d2 = require("./detector/verticalDetector2.js");
const d3 = require("./detector/horizontalDetector.js");

function running() {
  return !r.WindowShouldClose();
}

function setup(HEIGHT, WIDTH, TITLE, FPS) {
  r.SetTraceLogLevel(r.LOG_NONE);

  r.InitWindow(WIDTH, HEIGHT, TITLE);
  r.SetTargetFPS(FPS);

  d1.upperBound = WIDTH / 2 - d1.width;
  d1.height = HEIGHT;

  d2.upperBound = WIDTH - d2.width;
  d2.lowerBound = WIDTH / 2;
  d2.height = HEIGHT;
  d2.startX = WIDTH / 2;

  d3.width = WIDTH;
  d3.upperBound = HEIGHT - d3.height;
}

function update() {
  d1.velocity = d.detectorVelocity(
    d1.velocity,
    d1.startX,
    d1.lowerBound,
    d1.upperBound,
  );
  d1.startX = d1.startX + d1.velocity;

  d2.velocity = d.detectorVelocity(
    d2.velocity,
    d2.startX,
    d2.lowerBound,
    d2.upperBound,
  );
  d2.startX = d2.startX + d2.velocity;

  d3.velocity = d.detectorVelocity(
    d3.velocity,
    d3.startY,
    d3.lowerBound,
    d3.upperBound,
  );
  d3.startY = d3.startY + d3.velocity;
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

  d.drawRange(d1.startX, d1.startY, d1.width, d1.height, d1.color);
  d.drawRange(d2.startX, d2.startY, d2.width, d2.height, d2.color);
  d.drawRange(d3.startX, d3.startY, d3.width, d3.height, d3.color);

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
