function Palace(game, x, y) {
    this.game = game;
    this.img = ASSET_MANAGER.getAsset("./img/DONUTSTEAL.png");
    this.bWidth = 4;
    this.bHeight = 4;
    this.openAnim = new Animation(this.img, 0, 1, 298, 187, 6, .17, 12, true);
    this.closedAnim = new Animation(this.img, 0, 0, 298, 187, 1, .17, 1, true);
    this.currAnim = this.closedAnim;
    this.renderX = 91;
    this.renderY = 50;
    this.numEmployed = 20; // TESTING
    this.numEmpNeeded = 20;
    this.buffer = { x: x - 1, y: y - 1, width: this.bWidth + 1, height: this.bHeight + 1 };
    this.roadTiles = [];
    this.game.addEntity(this);
    Entity.call(this, game, x, y);
}

Palace.prototype = new Entity();
Palace.prototype.constructor = Palace;

Palace.prototype.update = function () {
    this.roadTiles = findRoad(this.buffer);
    if (this.numEmployed < this.numEmpNeeded) {
        this.currAnim = this.closedAnim;
        this.numEmployed = 0;
    } else {
        this.currAnim = this.openAnim;
        //if a gold cart arrives, take the amount of gold he has and add it to the total funds
        for (var i = 0; i < this.game.walkers.length; i++) {
            if (arrived(this.buffer, this.game.walkers[i].x, this.game.walkers[i].y)) {
                if (this.game.walkers[i] instanceof glCartMan) {
                    this.game.gameWorld.addFunds(this.game.walkers[i].loadCount);
                    this.game.walkers[i].removeFromWorld = true;
                }
            }
        }
    }
    Entity.prototype.update.call(this);
}

Palace.prototype.draw = function (ctx) {
    pt1 = this.game.twodtoisoX(this.x, this.y) - this.renderX;
    pt2 = this.game.twodtoisoY(this.x, this.y) - this.renderY;
    ctx.fillRect(pt1, pt2, 5, 5);
    this.currAnim.drawFrame(this.game.clockTick, ctx, pt1, pt2);
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

