const r = require("raylib");

function isOverlap(start1, end1, start2, end2) {
  return end1 >= start2 && end2 >= start1 ? true : false;
}

function particleDetected(dStart, dsize, p1Start, p1size, p2Start, p2size) {
  const p1End = p1Start + p1size;
  const p2End = p2Start + p2size;
  const dEnd = dStart + dsize;
  return isOverlap(p1Start, p1End, dStart, dEnd) ||
    isOverlap((p2Start, p2End, dStart, dEnd))
    ? true
    : false;
}

function detectorColor(dStart, dsize, p1Start, p1size, p2Start, p2size) {
  return particleDetected(dStart, dsize, p1Start, p1size, p2Start, p2size)
    ? r.RED
    : r.WHITE;
}

function drawRange(startX, startY, width, height, color) {
  r.DrawRectangle(startX, startY, width, height, color);
}

function isDetectorOutOfBound(start, lower, upper) {
  return start < lower || start > upper;
}

function detectorVelocity(velocity, start, lower, upper) {
  return isDetectorOutOfBound(start, lower, upper) ? -velocity : velocity;
}

module.exports = {
  isOverlap,
  particleDetected,
  drawRange,
  isDetectorOutOfBound,
  detectorVelocity,
  detectorColor,
};
