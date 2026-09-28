const r = require("raylib");
const p1 = require("./particleInputs/verticalParticle1.js");
const p2 = require("./particleInputs/verticalParticle2.js");
const p3 = require("./particleInputs/horizontalParticle.js");
const d1 = require("./detectorInputs/verticalDetector1.js");
const d2 = require("./detectorInputs/verticalDetector2.js");
const d3 = require("./detectorInputs/horizontalDetector.js");

function running() {
    return !r.WindowShouldClose();
}

const HEIGHT = 1045;
const WIDTH = 1718;

function setup() {
    r.SetTraceLogLevel(r.LOG_NONE);
    const FPS = 80;

    r.InitWindow(WIDTH, HEIGHT, "Particle_detector");
    r.SetTargetFPS(FPS);
}

function isOverlap(rangeStart1, rangeEnd1, rangeStart2, rangeEnd2) {
    return (rangeEnd1 >= rangeStart2 && rangeEnd2 >= rangeStart1) ? true : false;
}

const VERTICAL = "vertical";
const HORIZONTAL = "horizontal"


function detectorColor(dynamicAxis, size, detectorType) {
    if (detectorType === VERTICAL) {
        if (isOverlap(dynamicAxis, dynamicAxis + size, p1.startX, p1.startX + p1.width)) {
            return r.RED;
        } else if (isOverlap(dynamicAxis, dynamicAxis + size, p2.startX, p2.startX + p2.width)) {
            return r.RED;
        }
    }

    if (detectorType === HORIZONTAL) {
        if (isOverlap(dynamicAxis, dynamicAxis + size, p3.startY, p3.startY + p3.height)) {
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

let tToB = true; //for top to bottom detector
let ltoR1 = true; //for left side detector
let ltoR2 = true; //for right side detector

function update() {


    //for left side detector
    if (d1.startX === 0) {
        ltoR1 = true;
    }
    if (d1.startX >= WIDTH / 2 - d1.width) {
        ltoR1 = false;
    }
    d1.startX = ltoR1 ? d1.startX + d1.velocity : d1.startX - d1.velocity;

    //for right side detector
    if (d2.startX === WIDTH / 2) {
        ltoR2 = true;
    }
    if (d2.startX >= WIDTH - d1.width) {
        ltoR2 = false;
    }
    d2.startX = ltoR2 ? d2.startX + d2.velocity : d2.startX - d2.velocity;

    //for top to bottom detector
    if (d3.startY === 0) {
        tToB = true;
    }
    if (d3.startY >= HEIGHT - d3.height) {
        tToB = false;
    }
    d3.startY = tToB ? d3.startY + d3.velocity : d3.startY - d3.velocity;
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);


    drawParticle(p1.startX, p1.startY, p1.width, p1.height);
    drawParticle(p2.startX, p2.startY, p2.width, p2.height);
    drawParticle(p3.startX, p3.startY, p3.width, p3.height);
    drawDetector(d1.startX, d1.startY, d1.width, d1.height, detectorColor(d1.startX, d1.width, "vertical"));
    drawDetector(d2.startX, d2.startY, d2.width, d2.height, detectorColor(d2.startX, d2.width, "vertical"));

    drawDetector(d3.startX, d3.startY, d3.width, d3.height, detectorColor(d3.startY, d3.height, "horizontal"));
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

