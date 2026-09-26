const l = require("./logic");

function loop() {
    while (l.running()) {
        l.update();
        l.draw();
    }
}

function main() {
    l.setup();
    loop();
    l.teardown();
}

main();