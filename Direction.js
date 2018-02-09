function isUp(x, y) {
    return x === 0 && y === -1;
}

function isDown(x, y) {
    return x === 0 && y === 1;
}
function isLeft(x, y) {
    return x === -1 && y === 0;
}

function isRight(x, y) {
    return x === 1 && y === 0;
}

function setDirection(current, next) {
    result = 0;
    if (current < next) {
        result = 1;
    } else if (current > next) {
        result = -1;
    } else {
        result = 0;
    }
    return result;
}

function setFace(x, y) {
    if (x == 0) {
        if (y == -1) return "NE";
        return "SW";
    } else if (y == 0) {
        if (x == 1) return "SE";
        return "NW";
    }
}
