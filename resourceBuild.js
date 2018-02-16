const resSpeed = .10;

function resourceBuild(game, x, y) {
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
    this.placeCost = null;
    this.resType = "";
    this.prodTime = 0;
    this.buffer = { x: x - 1, y: y - 1, width: this.bWidth + 1, height: this.bHeight + 1 };
    this.roadTiles = [];
    Entity.call(this, game, x, y);
}

resourceBuild.prototype = new Entity();
resourceBuild.prototype.constructor = resourceBuild;

resourceBuild.prototype.update = function () {
    this.roadTiles = findRoad(this.buffer);

    if (this.numEmployed < this.numEmpNeeded) {
        this.currAnim = this.closedAnim;
        this.numEmployed = 0;

    } else {
        this.currAnim = this.openAnim;
        if (this.game.timer.gameTime - this.workTime >= this.prodTime) {
            this.workTime = this.game.timer.gameTime;
            if (this instanceof goldMine) {
                //skip genWalker-- generateWalker with goldmine road tiles and palace road tiles, if it works just make the walker
                var canWalk = this.generateWalker(this.game.gameWorld.Palace.roadTiles);
                if (canWalk != null) this.pushBoi(canWalk);
            } else if (this instanceof huntLodge) {
                var huntah = new Hunter(this.game, ASSET_MANAGER.getAsset("./img/Hunter1.5.png"),
                    ASSET_MANAGER.getAsset("./img/Hunter2.png"), walkerMap, this.roadTiles[0][1], this.roadTiles[0][0]);
                huntah.destX = 12;//FOR TESTING, NEEDS A FOREST COORD 
                huntah.destY = 18;
                this.game.addWalker(huntah);

            } else { // instance of clay pit 
                this.genWalker(this.game.yards);

            }
        }
    }
    Entity.prototype.update.call(this);
}

resourceBuild.prototype.draw = function (ctx) {
    pt1 = this.game.twodtoisoX(this.x, this.y) - this.renderX;
    pt2 = this.game.twodtoisoY(this.x, this.y) - this.renderY;
    ctx.fillRect(pt1, pt2, 5, 5);
    this.currAnim.drawFrame(this.game.clockTick, ctx, pt1, pt2);
    Entity.prototype.draw.call(this);
}

resourceBuild.prototype.genWalker = function (destBuild) {
    found = false;
    for (let i = 0; i < destBuild.length; i++) {
        let indie = destBuild[i];
        //WADDUP BETCH
        let canWalk = generateWalker(this.roadTiles, indie.roadTiles);
        if (canWalk != null) {
            found = true;
            console.log(canWalk);
            this.pushBoi(canWalk);

        }
        if (found) break;
    }
}

resourceBuild.prototype.pushBoi = function (canWalk) {
    if (this instanceof clayPit) {
        var ccm = new cCartMan(this.game, ASSET_MANAGER.getAsset("./img/clayCartMan.png"), walkerMap, canWalk[0], canWalk[1]);
        ccm.destX = canWalk[2];
        ccm.destY = canWalk[3];
        this.game.addWalker(ccm);
    } else if (this instanceof huntLodge) {
        var mcm = new mCartMan(this.game, ASSET_MANAGER.getAsset("./img/meatCartMan.png"), walkerMap, canWalk[0], canWalk[1]);
        mcm.destX = canWalk[2];
        mcm.destY = canWalk[3];
        this.game.addWalker(mcm);
    } else if (this instanceof goldMine) {
        var glcm = new glCartMan(this.game, ASSET_MANAGER.getAsset("./img/goldCartMan.png"), walkerMap, canWalk[0], canWalk[1]);
        glcm.destX = canWalk[2];
        glcm.destY = canWalk[3];
        this.game.addWalker(glcm);
    }

}
resourceBuild.prototype.toStringStats = function() {
    str = "";//TODO
    return str;
}
function goldMine(game, x, y) {
    resourceBuild.call(this, game, x, y);
    this.img = ASSET_MANAGER.getAsset('./img/GoldMine.png');
    this.workTime = game.timer.gameTime;
    this.closedAnim = new Animation(this.img, 0, 0, 118, 63, 1, resSpeed, 1, true);
    this.openAnim = new Animation(this.img, 0, 1, 118, 63, 9, resSpeed, 17, true);
    this.currAnim = this.closedAnim;
    this.resType = "gold";
    this.prodTime = 30;
    this.numEmpNeeded = 16;
    this.renderX = 25;
    this.renderY = 5;
    this.placeCost = 100;
}

goldMine.prototype = new resourceBuild();
goldMine.prototype.constructor = goldMine;
GoldMine.prototype.toStringStats = function() {
    str = "";//TODO
    return str;
}
function clayPit(game, x, y) {
    resourceBuild.call(this, game, x, y);
    this.img = ASSET_MANAGER.getAsset('./img/ClayThingy.png');
    this.workTime = game.timer.gameTime;
    this.closedAnim = new Animation(this.img, 0, 0, 118, 77, 1, resSpeed, 1, true);
    this.openAnim = new Animation(this.img, 0, 1, 118, 77, 8, resSpeed, 24, true);
    this.currAnim = this.closedAnim;
    this.resType = "clay";
    this.prodTime = 20;
    this.numEmpNeeded = 14;
    this.renderX = 29;
    this.renderY = 9;
    this.placeCost = 20;
}

clayPit.prototype = new resourceBuild();
clayPit.prototype.constructor = clayPit;
clayPit.prototype.toStringStats = function() {
    str = "";//TODO
    return str;
}
//Possibly Hunting Lodge? Extend the update behavior to deal with returning hunters. 
function huntLodge(game, x, y) {
    resourceBuild.call(this, game, x, y);
    this.img = ASSET_MANAGER.getAsset("./img/HuntingLodge.png");
    this.workTime = game.timer.gameTime;
    this.closedAnim = new Animation(this.img, 0, 0, 118, 111, 1, resSpeed, 1, true);
    this.openAnim = new Animation(this.img, 0, 1, 118, 111, 9, resSpeed, 18, true);
    this.currAnim = this.closedAnim;
    this.resType = "meat";
    this.prodTime = 15;
    this.numEmpNeeded = 18;
    this.renderX = 27;
    this.renderY = 53;
    this.placeCost = 35;
    this.foodStore = 0;
}

huntLodge.prototype = new resourceBuild();
huntLodge.prototype.constructor = huntLodge;

huntLodge.prototype.update = function () {
    resourceBuild.prototype.update.apply(this);
    for (var i = 0; i < this.game.walkers.length; i++) {
        if (arrived(this.buffer, this.game.walkers[i].x, this.game.walkers[i].y)) {
            if (this.game.walkers[i] instanceof Hunter && this.game.walkers[i].hunted) {
                this.foodStore += 100;
                this.game.walkers[i].removeFromWorld = true;
               
            }
        }
    }
    if (this.foodStore > 100) this.genWalker(this.game.granaries);

}
huntLodge.prototype.toStringStats = function() {
    str = "";//TODO
    return str;
}