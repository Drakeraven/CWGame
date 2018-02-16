function Palace(game, x, y) {
    this.game = game;
    this.img = null;
    this.bWidth = 2;
    this.bHeight = 2;
    this.openAnim = null;
    this.closedAnim = null;
    this.currAnim = null;
    this.renderX = 0;
    this.renderY = 0;
    this.numEmployed = 0;
    this.numEmpNeeded = null;
    this.buffer = { x: x - 1, y: y - 1, width: this.bWidth + 1, height: this.bHeight + 1 };
    this.roadTiles = [];
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


Palace.prototype.toStringStats = function() {
    str = "Employees: " + this.numEmployed + "Employees Needed: " + this.numEmpNeeded;//TODO
    return str;
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
Granary.prototype.toStringStats = function() {
    str = "Employees: " + this.numEmployed + "Employees Needed: " + this.numEmpNeeded;//TODO
    return str;
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
StoreYard.prototype.toStringStats = function() {
    str = "Employees: " + this.numEmployed + "Employees Needed: " + this.numEmpNeeded;//TODO
    return str;
}

