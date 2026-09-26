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
    if (rangeX === 0) {
        lToR = true;
    }
    if (rangeX === WIDTH - rangeW) {
        lToR = false;
    }
    rangeX = lToR ? rangeX + 1 : rangeX - 1;
}

let rangeX = 0;
const rangeW = 20;

function draw() {
    const rangeY = 0;
    const rangeH = HEIGHT;

    r.BeginDrawing();
    r.ClearBackground(r.WHITE);
    r.DrawRectangle(rangeX, rangeY, rangeW, rangeH, r.RED);
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