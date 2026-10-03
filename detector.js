const r = require("raylib");
const rg = require("./range.js")

function particleDetected(dStart, dsize, p1Start, p1size, p2Start, p2size) {
  const p1End = p1Start + p1size;
  const p2End = p2Start + p2size;
  const dEnd = dStart + dsize;
  return rg.isOverlap(p1Start, p1End, dStart, dEnd) || rg.isOverlap(p2Start, p2End, dStart, dEnd);
}

function detectorColor(dStart, dsize, p1Start, p1size, p2Start, p2size) {
  return particleDetected(dStart, dsize, p1Start, p1size, p2Start, p2size)
    ? r.RED
    : r.WHITE;
}

function isDetectorOutOfBound(start, lower, upper) {
  return start < lower || start > upper;
}

function detectorVelocity(velocity, start, lower, upper) {
  return isDetectorOutOfBound(start, lower, upper) ? -velocity : velocity;
}

function updateH(d, p1) {
  d.color = detectorColor(d.y, d.height, p1.y, p1.height);
  d.velocity = detectorVelocity(d.velocity, d.y, d.lowerBound, d.upperBound);
  d.y = d.y + d.velocity;
  return d;
}

function updateV(d, p1, p2) {
  d.color = detectorColor(d.x, d.width, p1.x, p1.width, p2.x, p2.width);
  d.velocity = detectorVelocity(d.velocity, d.x, d.lowerBound, d.upperBound);
  d.x = d.x + d.velocity;
  return d;
}

function draw(d) {
  rg.drawRange(d.x, d.y, d.width, d.height, d.color);
  return d;
}

function createDetector(lowerBound, upperBound, width, height, x, y, velocity) {
  const color = r.WHITE;
  return {
    lowerBound, upperBound, width, height, x, y, velocity, color
  };
}

module.exports = {
  draw,
  updateH,
  updateV,
  createDetector
};
