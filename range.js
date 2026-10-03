function drawRange(startX, startY, width, height, color) {
    r.DrawRectangle(startX, startY, width, height, color);
}

function isOverlap(start1, end1, start2, end2) {
    return end1 >= start2 && end2 >= start1 ? true : false;
}

module.exports = {
    drawRange,
    isOverlap
};