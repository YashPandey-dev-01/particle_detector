const r = require("raylib");

function drawRange(x, y, width, height, color) {
    r.DrawRectangle(x, y, width, height, color);
}

function isOverlap(start1, end1, start2, end2) {
    return end1 >= start2 && end2 >= start1;
}

module.exports = {
    drawRange,
    isOverlap
};