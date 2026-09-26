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
    r.SetTraceLogLevel(r.LOG_NONE);
}

function isOverlap(rangeStart1, rangeEnd1, rangeStart2, rangeEnd2) {
    if (rangeEnd1 >= rangeStart2 && rangeEnd2 >= rangeStart1) {
        return true;
    }
    return false;
}

const verParticle1X = 100;
const verParticle1Width = 50;
const verParticle2X = 1000;
const verParticle2Width = 200;
const horzParticleY = 567;
const horzParticleHeight = 150;
const VERTICAL = "vertical";
const HORIZONTAL = "horizontal"


function detectorColor(dynamicAxis, size, detectorType) {
    if (detectorType === VERTICAL) {
        if (isOverlap(dynamicAxis, dynamicAxis + size, verParticle1X, verParticle1X + verParticle1Width)) {
            return r.RED;
        } else if (isOverlap(dynamicAxis, dynamicAxis + size, verParticle2X, verParticle2X + verParticle2Width)) {
            return r.RED;
        }
    }

    if (detectorType === HORIZONTAL) {
        if (isOverlap(dynamicAxis, dynamicAxis + size, horzParticleY, horzParticleY + horzParticleHeight)) {
            return r.RED;
        }
    }
    return r.WHITE;
}

function drawDetector(detectorX, detectorY, detectorW, detectorH, color) {
    r.DrawRectangle(detectorX, detectorY, detectorW, detectorH, color);
}

function drawParticle(verParticleX, verParticleY, verParticleW, verParticleH) {
    r.DrawRectangle(verParticleX, verParticleY, verParticleW, verParticleH, r.SKYBLUE);
}

const verDetector1Width = 20;
const verDetector2Width = 20;
const horzDetectorHeight = 20;

let verDetector1X = 0;
let verDetector2X = WIDTH / 2;
let horzDetectorY = 0;
let tToB = true; //for top to bottom detector
let ltoR1 = true; //for left side detector
let ltoR2 = true; //for right side detector

function update() {
    const verDetector1Speed = 1; // pixel per frame
    const verDetector2Speed = 3; // pixel per frame
    const horzDetectorSpeed = 2; // pixel per frame

    //for left side detector
    if (verDetector1X === 0) {
        ltoR1 = true;
    }
    if (verDetector1X >= WIDTH / 2 - verDetector1Width) {
        ltoR1 = false;
    }
    verDetector1X = ltoR1 ? verDetector1X + verDetector1Speed : verDetector1X - verDetector1Speed;

    //for right side detector
    if (verDetector2X === WIDTH / 2) {
        ltoR2 = true;
    }
    if (verDetector2X >= WIDTH - verDetector1Width) {
        ltoR2 = false;
    }
    verDetector2X = ltoR2 ? verDetector2X + verDetector2Speed : verDetector2X - verDetector2Speed;

    //for top to bottom detector
    if (horzDetectorY === 0) {
        tToB = true;
    }
    if (horzDetectorY >= HEIGHT - horzDetectorHeight) {
        tToB = false;
    }
    horzDetectorY = tToB ? horzDetectorY + horzDetectorSpeed : horzDetectorY - horzDetectorSpeed;
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    const verParticle1Y = 0;
    const verParticle2Height = HEIGHT;
    const verParticle2Y = 0;
    const verParticle1Height = HEIGHT;

    const verDetector1Y = 0;
    const verDetector1Height = HEIGHT;
    const verDetector2Y = 0;
    const verDetector2Height = HEIGHT;

    const horzParticleX = 0;
    const horzParticleWidth = WIDTH;

    const horzDetectorX = 0;
    const horzDetectorWidth = WIDTH;



    drawParticle(verParticle1X, verParticle1Y, verParticle1Width, verParticle1Height);
    drawParticle(verParticle2X, verParticle2Y, verParticle2Width, verParticle2Height);
    drawParticle(horzParticleX, horzParticleY, horzParticleWidth, horzParticleHeight);
    drawDetector(verDetector1X, verDetector1Y, verDetector1Width, verDetector1Height, detectorColor(verDetector1X, verDetector1Width, "vertical"));
    drawDetector(verDetector2X, verDetector2Y, verDetector2Width, verDetector2Height, detectorColor(verDetector2X, verDetector2Width, "vertical"));
    drawDetector(horzDetectorX, horzDetectorY, horzDetectorWidth, horzDetectorHeight, detectorColor(horzDetectorY, horzDetectorHeight, "horizontal"));
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
