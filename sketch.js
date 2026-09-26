const r = require("raylib");

function running() {
    return !r.WindowShouldClose();
}

const HEIGHT = 1045;
const WIDTH = 1718;

function setup() {
    const FPS = 100;

    r.InitWindow(WIDTH, HEIGHT, "Particle_detector");
    r.SetTargetFPS(FPS);
    r.SetTraceLogLevel(r.LOG_NONE);
}

function isOverlap(rangeStart1, rangeEnd1, rangeStart2, rangeEnd2) {
    if (rangeEnd1 >= rangeStart2 && rangeEnd2 >= rangeStart1) {
        return true;
    }
    return false;
}

const particle1X = 100;
const particle1Width = 50;
const particle2X = 1000;
const particle2Width = 100;

function detectorColor(detectorX, detectorW) {
    if (isOverlap(detectorX, detectorX + detectorW, particle1X, particle1X + particle1Width)) {
        return r.RED;
    }
    if (isOverlap(detectorX, detectorX + detectorW, particle2X, particle2X + particle2Width)) {
        return r.RED;
    }
    return r.WHITE;
}

function drawDetector(detectorX, detectorY, detectorW, detectorH, color) {
    r.DrawRectangle(detectorX, detectorY, detectorW, detectorH, color);
}

function drawparticle(particleX, particleY, particleW, particleH) {
    r.DrawRectangle(particleX, particleY, particleW, particleH, r.SKYBLUE);
}

const detector1Width = 20;
const detector2Width = 20;
let detector1X = 0;
let detector2X = WIDTH / 2;
let lToR1 = true; // for left side detector 
let lToR2 = true; // for right side detector 

function update() {
    detector1Speed = 1; // pixel per frame
    detector2Speed = 3; // pixel per frame

    //for left side detector
    if (detector1X === 0) {
        lToR1 = true;
    }
    if (detector1X >= WIDTH / 2 - detector1Width) {
        lToR1 = false;
    }
    detector1X = lToR1 ? detector1X + detector1Speed : detector1X - detector1Speed;

    //for right side detector
    if (detector2X === WIDTH / 2) {
        lToR2 = true;
    }
    if (detector2X >= WIDTH - detector2Width) {
        lToR2 = false;
    }
    detector2X = lToR2 ? detector2X + detector2Speed : detector2X - detector2Speed;

}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    const particle1Y = 0;
    const particle2Height = HEIGHT;
    const particleY2 = 0;
    const particle1Height = HEIGHT;

    const detector1Y = 0;
    const detector1Height = HEIGHT;
    const detectorY2 = 0;
    const detector2Height = HEIGHT;

    drawparticle(particle1X, particle1Y, particle1Width, particle1Height);
    drawparticle(particle2X, particleY2, particle2Width, particle2Height);
    drawDetector(detector1X, detector1Y, detector1Width, detector1Height, detectorColor(detector1X, detector1Width));
    drawDetector(detector2X, detectorY2, detector2Width, detector2Height, detectorColor(detector2X, detector2Width));

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