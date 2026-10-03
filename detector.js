const r = require("raylib");
const rg = require("./range.js")

function particleDetected(d, p1, p2) {
  const p1End = p1.x + p1.width;
  const p2End = p2.x + p2.width;
  const dEnd = d.x + d.width;
  return rg.isOverlap(p1.x, p1End, d.x, dEnd) || rg.isOverlap(p2.x, p2End, d.x, dEnd);
}

function isDetectorOutOfBound(start, lower, upper) {
  return start < lower || start > upper;
}

function detectorVelocity(velocity, start, lower, upper) {
  return isDetectorOutOfBound(start, lower, upper) ? -velocity : velocity;
}

function updateH(d, p1) {
  d.hasDetected = rg.isOverlap(d.y, d.y + d.height, p1.y, p1.y + p1.height);
  d.velocity = detectorVelocity(d.velocity, d.y, d.lowerBound, d.upperBound);
  d.y = d.y + d.velocity;
  return d;
}

function updateV(d, p1, p2) {
  d.hasDetected = particleDetected(d, p1, p2);
  d.velocity = detectorVelocity(d.velocity, d.x, d.lowerBound, d.upperBound);
  d.x = d.x + d.velocity;
  return d;
}

function draw(d) {
  const color = d.hasDetected ? r.ColorAlpha(r.RED, 0.7) : r.WHITE
  rg.drawRange(d.x, d.y, d.width, d.height, color);
  return d;
}

function createDetector(lowerBound, upperBound, width, height, x, y, velocity, hasDetected) {
  return {
    lowerBound, upperBound, width, height, x, y, velocity, hasDetected
  };
}

module.exports = {
  draw,
  updateH,
  updateV,
  createDetector
};
