const r = require("raylib");

const HEIGHT = 1045;
const WIDTH = 1718;
const detectorW = 20;
const blueRangeX1 = 100;
const blueRangeW1 = 50;
const blueRangeX2 = 200;
const blueRangeW2 = 5;

let lToR = true;
let detectorX = 0;

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    const FPS = 100;

    r.InitWindow(WIDTH, HEIGHT, "Particle_detector");
    r.SetTargetFPS(FPS);
}

function isOverlap(rangeStart1, rangeEnd1, rangeStart2, rangeEnd2) {
    if (rangeEnd1 >= rangeStart2 && rangeEnd2 >= rangeStart1) {
        return true;
    }
    return false;
}

function scannerColor() {
    if (isOverlap(detectorX, detectorX + detectorW, blueRangeX1, blueRangeX1 + blueRangeW1)) {
        return r.RED;
    }
    if (isOverlap(detectorX, detectorX + detectorW, blueRangeX2, blueRangeX2 + blueRangeW2)) {
        return r.RED;
    }
    return r.WHITE;
}

function drawDetector() {
    const detectorY = 0;
    const detectorH = HEIGHT;
    const detectorColor = scannerColor();
    r.DrawRectangle(detectorX, detectorY, detectorW, detectorH, detectorColor);
}

function drawBlueRange(blueRangeX, blueRangeY, blueRangeW, blueRangeH) {
    r.DrawRectangle(blueRangeX, blueRangeY, blueRangeW, blueRangeH, r.SKYBLUE);
}

function update() {
    if (detectorX === 0) {
        lToR = true;
    }
    if (detectorX === WIDTH - detectorW) {
        lToR = false;
    }
    detectorX = lToR ? detectorX + 1 : detectorX - 1;
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    const blueRangeY1 = 0;
    const blueRangeH2 = HEIGHT;
    const blueRangeY2 = 0;
    const blueRangeH1 = HEIGHT;

    drawBlueRange(blueRangeX1, blueRangeY1, blueRangeW1, blueRangeH1);
    drawBlueRange(blueRangeX2, blueRangeY2, blueRangeW2, blueRangeH2);
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