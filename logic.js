const r = require("raylib");

function running() {
    return !r.WindowShouldClose();
}

const HEIGHT = 1045;
const WIDTH = 1718;

function setup() {
    const FPS = 80;

    r.InitWindow(WIDTH, HEIGHT, "Particle_detector");
    r.SetTargetFPS(FPS);
}

let lToR = true;

function update() {
    if (detectorX === 0) {
        lToR = true;
    }
    if (detectorX === WIDTH - detectorW) {
        lToR = false;
    }
    detectorX = lToR ? detectorX + 1 : detectorX - 1;
}

let detectorX = 0;
const detectorW = 20;

function drawDetector() {
    const detectorY = 0;
    const detectorH = HEIGHT;
    r.DrawRectangle(detectorX, detectorY, detectorW, detectorH, r.RED);
}

function drawBlueRange() {
    const blueRangeX = 100;
    const blueRangeY = 0;
    const blueRangeW = 50;
    const blueRangeH = HEIGHT;
    r.DrawRectangle(blueRangeX, blueRangeY, blueRangeW, blueRangeH, r.SKYBLUE);
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.WHITE);

    drawBlueRange();
    drawDetector();

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