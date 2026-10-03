const r = require("raylib");
const p = require("./particle.js");
const d = require("./detector.js");

function running() {
  return !r.WindowShouldClose();
}

function setup(HEIGHT, WIDTH, TITLE, FPS) {
  const world = {};

  r.SetTraceLogLevel(r.LOG_NONE);
  r.InitWindow(WIDTH, HEIGHT, TITLE);
  r.SetTargetFPS(FPS);

  world.d1 = d.createDetector(0, WIDTH / 2 - 20, 20, HEIGHT, 100, 0, 3, false);
  world.d2 = d.createDetector(WIDTH / 2, WIDTH - 20, 20, HEIGHT, WIDTH / 2, 0, 4, false);
  world.d3 = d.createDetector(0, HEIGHT - 20, WIDTH, 20, 0, 0, 3, false);

  world.p1 = p.createParticle(100, 0, 50, HEIGHT);
  world.p2 = p.createParticle(1000, 0, 200, HEIGHT);
  world.p3 = p.createParticle(0, 300, WIDTH, 150);

  return world;
}

function update(world) {
  world.d3 = d.updateH(world.d3, world.p3);
  world.d1 = d.updateV(world.d1, world.p1, world.p2);
  world.d2 = d.updateV(world.d2, world.p2, world.p1);
}

function draw(world) {
  r.BeginDrawing();
  r.ClearBackground(r.BLACK);

  world.p1 = p.draw(world.p1);
  world.p2 = p.draw(world.p2);
  world.p3 = p.draw(world.p3);

  world.d1 = d.draw(world.d1);
  world.d2 = d.draw(world.d2);
  world.d3 = d.draw(world.d3);

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
