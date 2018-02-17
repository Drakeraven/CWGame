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
    this.numEmployed = 0; // TESTING
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
                    console.log(this.game.gameWorld.funds);
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

const maxFood = 1000; 

function Granary(game, x, y) {
    this.game = game;
    this.img = ASSET_MANAGER.getAsset("./img/Granary.png");
    this.bWidth = 4;
    this.bHeight = 4;
    this.openAnim = new Animation(this.img, 0, 1, 238, 161, 8, .17, 24, true);
    this.closedAnim = new Animation(this.img, 0, 0, 238, 161, 1, .17, 1, true);
    this.currAnim = this.closedAnim;
    this.renderX = 33;
    this.renderY = 71;
    this.placeCost = 50; 
    this.numEmployed = 0; // TESTING
    this.numEmpNeeded = 20;
    this.foodSupply = 0; 
    this.buffer = { x: x - 1, y: y - 1, width: this.bWidth + 1, height: this.bHeight + 1 };
    this.roadTiles = [];
    this.game.addEntity(this);
    Entity.call(this, game, x, y);
}

Granary.prototype = new Entity();
Granary.prototype.constructor = Granary;

Granary.prototype.update = function () {
    Entity.prototype.update.call(this);
    this.roadTiles = findRoad(this.buffer);

    //food only storage yard, any and all food gets sent here then to the bazaar 
    //NEED: take in walkers W/ food 
    for (var i = 0; i < this.game.walkers.length; i++) {
        if (arrived(this.buffer, this.game.walkers[i].x, this.game.walkers[i].y)) {
            if (this.game.walkers[i] instanceof mCartMan) {
                this.foodSupply = this.game.walkers[i].loadCount;
                this.game.walkers[i].removeFromWorld = true;
                console.log(this.game.gameWorld.funds);
            }
        }
    }


    //SEND OUT WALKERS to bazaar 

    if (this.game.timer.gameTime - this.workTime >= this.pushTime) {
        this.workTime = this.game.timer.gameTime;
        for (var i = 0; i < this.game.industries.length; i++){
            //send food to bazaar! 
            if (this.game.industries[i] instanceof Bazaar) {
                if (this.foodLevel > 50 && this.numEmployed === this.maxEmployed) { 
                        this.genWalker(this.game.industries[i], 50, "food");
                        this.foodLevel -= 50; 
                }
            }
        }
    }
}

Granary.prototype.draw = function (ctx) {
    pt1 = this.game.twodtoisoX(this.x, this.y) - this.renderX;
    pt2 = this.game.twodtoisoY(this.x, this.y) - this.renderY;
    ctx.fillRect(pt1, pt2, 5, 5);
    this.currAnim.drawFrame(this.game.clockTick, ctx, pt1, pt2);
    Entity.prototype.draw.call(this);
}

Granary.prototype.genWalker = function (destBuild, funds, type) {
    found = false;
    let indie = destBuild;
    console.log(indie);
    //WADDUP BETCH
    let canWalk = generateWalker(this.roadTiles, indie.roadTiles);
    if (canWalk != null) {
        found = true;
        console.log(canWalk);
        this.pushBoi(canWalk, funds, type);

    }
    //if (found) break;
    //console.log(found);
}

Granary.prototype.pushBoi = function (canWalk, funds, type) {
    console.log(funds, type);
    if (type === "food") {
        var ccm = new mCartMan(this.game, ASSET_MANAGER.getAsset("./img/meatCartMan.png"), walkerMap, canWalk[0], canWalk[1]);
        this.loadCount = funds; 
        ccm.destX = canWalk[2];
        ccm.destY = canWalk[3];
        this.game.addWalker(ccm);
    }
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

