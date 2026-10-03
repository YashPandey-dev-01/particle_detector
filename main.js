const s = require("./sketch");

function loop(world) {
  while (s.running()) {
    s.update(world);
    s.draw(world);
  }
}

function main() {
  const HEIGHT = 1014;
  const WIDTH = 1718;
  const TITLE = "Particle Detector";
  const FPS = 70;
  const world = s.setup(HEIGHT, WIDTH, TITLE, FPS);
  loop(world);
  s.teardown();
}

main();
