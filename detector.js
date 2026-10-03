const r = require("raylib");
const r = require("./range.js")


function particleDetected(dStart, dsize, p1Start, p1size, p2Start, p2size) {
  const p1End = p1Start + p1size;
  const p2End = p2Start + p2size;
  const dEnd = dStart + dsize;
  return r.isOverlap(p1Start, p1End, dStart, dEnd) ||
    r.isOverlap((p2Start, p2End, dStart, dEnd))
    ? true
    : false;
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

function update(d, type) {
  const dynamicAxis = type === "vertical" ? "startX" : "startY";
  d.velocity = detectorVelocity(d.velocity, d[dynamicAxis], d.lowerBound, d.upperBound);
  d[dynamicAxis] = d[dynamicAxis] + d.velocity;
  return d;
}

function draw(d) {
  r.drawRange(d.startX, d.startY, d.width, d.height, d.color);
  return d;
}

function createDetector(lowerBound, upperBound, width, height, startX, startY, velocity) {
  const color = r.WHITE;
  return {
    lowerBound, upperBound, width, height, startX, startY, velocity, color
  };
}

module.exports = {
  draw,
  update
};
