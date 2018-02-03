
function forward(x, y, neighbors) {
    if (isUp(x,y)) {
        return neighbors["above"].tileType;
    } else if (isDown(x,y)) {
        return neighbors["below"].tileType;
    } else if (isLeft(x,y)) {
        return neighbors["left"].tileType;
    } else {
        return neighbors["right"].tileType;
    }

}

function backward(x, y, neighbors) {
    if (isUp(x,y)) {
        return neighbors["below"].tileType;
    } else if (isDown(x,y)) {
        return neighbors['above'].tileType;
    } else if (isLeft(x,y)) {
        return neighbors['right'].tileType;
    } else {
        return neighbors['left'].tileType;
    }
}

function left(x, y, neighbors) {
    if (isUp(x,y)) {
        return neighbors["left"].tileType;
    } else if (isDown(x,y)) {
        return neighbors['right'].tileType;
    } else if (isLeft(x,y)) {
        return neighbors['below'].tileType;
    } else {
        return neighbors['above'].tileType;
    }
}

function right(x, y, neighbors) {
    if (isUp(x,y)) {
        return neighbors["right"].tileType;
    } else if (isDown(x,y)) {
        return neighbors['left'].tileType;
    } else if (isLeft(x,y)) {
        return neighbors['above'].tileType;
    } else {
        return neighbors['below'].tileType;
    }

}

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

function setDX(x, y, choice) {
    result = 0;
    up1 = isUp(x, y) && choice === "left";
    down1 = isUp(x, y) && choice === "right";
    if (up1 || down1) {
        result = -1;
    } else if (isUp(x, y) || isDown(x, y)) result = 1;
    return result;
}

function setDY(x, y, choice) {
    result = 0;
    left1 = isLeft(x, y) && choice === "left";
    right1 = isRight(x, y) && choice === "right";
    if (left1 || right1) {
        result = 1;
    } else if (isLeft(x, y) || isRight(x,y)) {
        result = -1;
    }

    return result;
}