function Palace(game, x y) {
    Entity.call(this, game, x, y);
}

Palace.prototype = new Entity();
Palace.prototype.constructor = Palace;

Palace.prototype.update = function () {
    Entity.prototype.update.call(this);
}

Palace.prototype.draw = function (ctx) {
    Entity.prototype.draw.call(this);
}


function Granary(game, x, y) {
    Entity.call(this, game, x, y);
}

Granary.prototype = new Entity();
Granary.prototype.constructor = Granary;

Granary.prototype.update = function () {
    Entity.prototype.update.call(this);
}

Granary.prototype.draw = function () {
    Entity.prototype.draw.call(this);
}

function StoreYard(game, x, y) {
    Entity.call(this);
}

StoreYard.prototype = new Entity();
StoreYard.prototype.constructor = StoreYard;

StoreYard.prototype.update = function () {
    Entity.prototype.update.call(this);
}

StoreYard.prototype.draw = function (ctx) {
    Entity.prototype.draw.call(this);
}

