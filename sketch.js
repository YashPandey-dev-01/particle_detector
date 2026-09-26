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

function isOverlap(rangeStart1, rangeEnd1, rangeStart2, rangeEnd2) {
    if (rangeEnd1 >= rangeStart2 && rangeEnd2 >= rangeStart1) {
        return true;
    }
    if (rangeStart1 >= rangeEnd2 && rangeStart2 >= rangeEnd1) {
        return true;
    }
    return false;
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
    const detectorColor = isOverlap(blueRangeX, blueRangeX + blueRangeW, detectorX, detectorX + detectorW) ? r.RED : r.WHITE;
    r.DrawRectangle(detectorX, detectorY, detectorW, detectorH, detectorColor);
}

const blueRangeX = 100;
const blueRangeW = 50;

function drawBlueRange() {
    const blueRangeY = 0;
    const blueRangeH = HEIGHT;
    r.DrawRectangle(blueRangeX, blueRangeY, blueRangeW, blueRangeH, r.SKYBLUE);
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

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