const rg = require("./range.js");
const r = require("raylib");

function createParticle(x, y, width, height) {
    const color = r.SKYBLUE;
    return { x, y, width, height, color };
}

function draw(p) {
    rg.drawRange(p.x, p.y, p.width, p.height, p.color);
    return p;
}

module.exports = {
    createParticle,
    draw
};