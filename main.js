const s = require("./sketch");

function loop() {
  while (s.running()) {
    s.update();
    s.draw();
  }
}

function main() {
  const HEIGHT = 1014;
  const WIDTH = 1718;
  const TITLE = "Particle Detector";
  const FPS = 70;
  s.setup(HEIGHT, WIDTH, TITLE, FPS);
  loop();
  s.teardown();
}

main();
