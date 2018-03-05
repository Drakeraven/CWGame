const yardMax = 500;

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
            if (arrived(this.buffer, this.game.walkers[i].x, this.game.walkers[i].y, this, this.game.walkers[i].bRef)) {
                if (this.game.walkers[i] instanceof glCartMan && this.game.walkers[i].loadCount != 0) {
                    this.game.gameWorld.addFunds(this.game.walkers[i].loadCount);
                    this.game.walkers[i].loadCount -= this.game.walkers[i].loadCount;
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
    this.currAnim.drawFrame(this.game.clockTick, ctx, pt1, pt2);
    Entity.prototype.draw.call(this);
}

const maxFood = 1000;

Palace.prototype.toStringStats = function() {
    str = "Employed: " + this.numEmployed + "\nEmployees Needed: " + this.numEmpNeeded;//TODO
    return str;
}
function Granary(game, x, y) {
    this.game = game;
    this.img = ASSET_MANAGER.getAsset("./img/Granary.png");
    this.bWidth = 4;
    this.bHeight = 4;
    this.openAnim = new Animation(this.img, 0, 1, 238, 161, 8, .17, 24, true);
    this.closedAnim = new Animation(this.img, 0, 0, 238, 161, 1, .17, 1, true);
    this.currAnim = this.closedAnim;
    this.renderX = 89;
    this.renderY = 42;
    this.placeCost = 50;
    this.numEmployed = 0;
    this.numEmpNeeded = 20;
    this.foodSupply = 0;
    this.foodMax = 1000;
    this.workTime = this.game.timer.gameTime;
    this.pushTime = 15;
    this.buffer = { x: x - 1, y: y - 1, width: this.bWidth + 1, height: this.bHeight + 1 };
    this.roadTiles = [];
    Entity.call(this, game, x, y);
}

Granary.prototype = new Entity();
Granary.prototype.constructor = Granary;

Granary.prototype.update = function () {
    Entity.prototype.update.call(this);
    this.roadTiles = findRoad(this.buffer);

    if (this.numEmployed < this.numEmpNeeded) {
        this.currAnim = this.closedAnim;
        this.numEmployed = 0;
    } else {
        this.currAnim = this.openAnim;
        //food only storage yard, any and all food gets sent here then to the bazaar
        //NEED: take in walkers W/ food
        for (var i = 0; i < this.game.walkers.length; i++) {
            if (arrived(this.buffer, this.game.walkers[i].x, this.game.walkers[i].y, this, this.game.walkers[i].bRef)) {
                console.log("Arrived");
                console.log(this.game.walkers[i].loadType);
                if (this.game.walkers[i].loadType === "meat" || this.game.walkers[i].loadType === "grain") {
                    console.log(this.game.walkers[i].loadCount);
                    console.log(this.foodSupply + this.game.walkers[i].loadCount <= this.foodMax)
                    if (this.foodSupply + this.game.walkers[i].loadCount <= this.foodMax && this.game.walkers[i].loadCount != 0) {
                        this.foodSupply += this.game.walkers[i].loadCount;
                        this.game.walkers[i].loadCount -= this.game.walkers[i].loadCount;
                        this.game.walkers[i].removeFromWorld = true;
                        console.log("Food Amt: ", this.foodSupply)
                    } else {
                        //code to send the walker somewhere else, or kill it
                        for (var j = 0; j < this.game.granaries.length; j++) {
                            if (this.game.granaries[j] != this && this.game.granaries[j].foodSupply + this.game.walkers[i].loadCount <= this.foodMax) {
                                //generate walker to the granarie
                                walkerX = Math.floor(this.game.walkers[i].x);
                                walkerY = Math.floor(this.game.walkers[i].y);
                                canWalk = generateWalker([[walkerY, walkerX]], this.game.granaries[j].roadTiles, );
                                if (canWalk != null) {
                                    this.game.walkers[i].destX = canWalk[2];
                                    this.game.walkers[i].destY = canWalk[3];
                                    this.game.walkers[i].bRef = this.game.granaries[j];
                                }
                            }
                        }
                        if (this.game.walkers[i].bRef == this) this.game.walkers[i].removeFromWorld = true; // remove if no other yard
                    }
                }
            }
        }
        //SEND OUT WALKERS to bazaar

        if (this.game.timer.gameTime - this.workTime >= this.pushTime) {
            this.workTime = this.game.timer.gameTime;
            for (var i = 0; i < this.game.industries.length; i++){
                //send food to bazaar!
                if (this.game.industries[i] instanceof Bazaar) {
                    if (this.foodSupply > 100 && this.game.industries[i].foodLevel < 100) {
                            this.genWalker(this.game.industries[i], 100, "food", this.game.industries[i]);
                            this.foodSupply -= 100;
                    }
                }
            }
        }
    }
}

Granary.prototype.draw = function (ctx) {
    pt1 = this.game.twodtoisoX(this.x, this.y) - this.renderX;
    pt2 = this.game.twodtoisoY(this.x, this.y) - this.renderY;
    //ctx.fillRect(pt1, pt2, 5, 5);
    this.currAnim.drawFrame(this.game.clockTick, ctx, pt1, pt2);
    Entity.prototype.draw.call(this);
}

Granary.prototype.genWalker = function (destBuild, funds, type, bRef) {
    found = false;
    let indie = destBuild;
    console.log(indie);
    //WADDUP BETCH
    let canWalk = generateWalker(this.roadTiles, indie.roadTiles);
    if (canWalk != null) {
        found = true;
        console.log(canWalk);
        this.pushBoi(canWalk, funds, type, bRef);

    }
    //if (found) break;
    //console.log(found);
}

Granary.prototype.pushBoi = function (canWalk, funds, type, bRef) {
    console.log(funds, type);
    if (type === "food") {
        var ccm = new mCartMan(this.game, ASSET_MANAGER.getAsset("./img/meatCartMan.png"), walkerMap, canWalk[0], canWalk[1], bRef);
        ccm.loadCount = funds;
        ccm.destX = canWalk[2];
        ccm.destY = canWalk[3];
        this.game.addWalker(ccm);
    }
}

Granary.prototype.toStringStats = function() {
    str = "Employed: " + this.numEmployed + "\nEmployees Needed: " + this.numEmpNeeded +
        "\nFood Level: " + this.foodSupply; //TODO
    return str;
}
function StoreYard(game, x, y) {
    this.game = game;
    this.workTime = this.game.timer.gameTime
    this.pushTime = 7;
    this.img = ASSET_MANAGER.getAsset("./img/StoreYard.png");
    this.bWidth = 3;
    this.bHeight = 3;
    this.storeAnims = [];
    this.storeAnims[0] = new Animation(this.img, 0, 0, 176, 132, 1, .17, 1, true); //closed
    this.storeAnims[1] = new Animation(this.img, 0, 1, 176, 132, 16, .17, 16, true); // open empty
    this.storeAnims[2] = new Animation(this.img, 0, 2, 176, 132, 16, .17, 16, true);// open clay
    this.storeAnims[3] = new Animation(this.img, 0, 3, 176, 132, 16, .17, 16, true);//open bar
    this.storeAnims[4] = new Animation(this.img, 0, 4, 176, 132, 16, .17, 16, true);//open flax
    this.storeAnims[5] = new Animation(this.img, 0, 5, 176, 132, 16, .17, 16, true);//open clay bar
    this.storeAnims[6] = new Animation(this.img, 0, 6, 176, 132, 16, .17, 16, true); // open clay flax
    this.storeAnims[7] = new Animation(this.img, 0, 7, 176, 132, 16, .17, 16, true); // bar flax
    this.storeAnims[8] = new Animation(this.img, 0, 8, 176, 132, 16, .17, 16, true);// open all
    this.currAnim = this.storeAnims[0];
    this.placeCost = 60;
    this.renderX = 60;
    this.renderY = 43;
    this.numEmployed = 0;
    this.numEmpNeeded = 12;
    this.storage = [];
    this.storage["barley"] = 0;
    this.storage["flax"] = 0;
    this.storage["clay"] = 0;
    this.buffer = { x: x - 1, y: y - 1, width: this.bWidth + 1, height: this.bHeight + 1 };
    this.roadTiles = [];
    Entity.call(this, game, x, y);
}

StoreYard.prototype = new Entity();
StoreYard.prototype.constructor = StoreYard;

StoreYard.prototype.update = function () {
    this.roadTiles = findRoad(this.buffer);
    //console.log(this.roadTiles);
    //check if a cart has arrived for u
    if (this.numEmployed < this.numEmpNeeded) {
        this.currAnim = this.storeAnims[0];
        this.numEmployed = 0;
    } else {
        this.currAnim = this.storeAnims[this.changeAnim()];
        for (var i = 0; i < this.game.walkers.length; i++) {
            if (arrived(this.buffer, this.game.walkers[i].x, this.game.walkers[i].y, this, this.game.walkers[i].bRef)) {
                if (this.game.walkers[i] instanceof cCartMan
                    || this.game.walkers[i] instanceof barCartMan
                    || this.game.walkers[i] instanceof fCartMan) {

                    if (this.storage[this.game.walkers[i].loadType] + this.game.walkers[i].loadCount <= yardMax && this.game.walkers[i].loadCount != 0) {
                        this.storage[this.game.walkers[i].loadType] += this.game.walkers[i].loadCount;
                        this.game.walkers[i].loadCount -= this.game.walkers[i].loadCount;
                        this.game.walkers[i].removeFromWorld = true;

                    } else {
                        for (var j = 0; j < this.game.yards.length; j++) {
                            if (this.game.yards[j] != this &&
                                this.game.yards[j].storage[this.game.walkers[i].loadType] + this.game.walkers[i].loadCount <= yardMax) {

                                walkerX = Math.floor(this.game.walkers[i].x);
                                walkerY = Math.floor(this.game.walkers[i].y);
                                canWalk = generateWalker([[walkerY, walkerX]], this.game.yards[j].roadTiles);
                                if (canWalk != null) {

                                    walkerX = Math.floor(this.game.walkers[i].x);
                                    walkerY = Math.floor(this.game.walkers[i].y);
                                    this.game.walkers[i].destX = canWalk[2];
                                    this.game.walkers[i].destY = canWalk[3];
                                    this.game.walkers[i].bRef = this.game.yards[j];
                                }

                            }
                        }
                        if (this.game.walkers[i].bRef == this) this.game.walkers[i].removeFromWorld = true; // remove if no other yard
                    }
                }
            }
        }
        if (this.game.timer.gameTime - this.workTime >= this.pushTime) {
            this.workTime = this.game.timer.gameTime;
            for (var k = 0; k < this.game.industries.length; k++) {
                if (this.game.industries[k].numResources <= 100 && this.game.industries[k].numResources < 300 && this.storage[this.game.industries[k].resType] >= 100) {
                    this.storage[this.game.industries[k].resType] = Math.floor(this.storage[this.game.industries[k].resType]) - 100;
                    canWalk = generateWalker(this.roadTiles, this.game.industries[k].roadTiles);
                    cartBoi = null;
                    if (canWalk != null) {
                        switch (this.game.industries[k].resType) {
                            case "clay":
                                cartBoi = new cCartMan(this.game, ASSET_MANAGER.getAsset("./img/clayCartMan.png"), walkerMap, canWalk[0], canWalk[1], this.game.industries[k]);
                                break;
                            case "barley":
                                cartBoi = new barCartMan(this.game, ASSET_MANAGER.getAsset('./img/barleyCartMan.png'), walkerMap, canWalk[0], canWalk[1], this.game.industries[k]);
                                break;
                            case "flax":
                                cartBoi = new fCartMan(this.game, ASSET_MANAGER.getAsset("./img/flaxCartMan.png"), walkerMap, canWalk[0], canWalk[1], this.game.industries[k]);
                                break;
                        }
                        cartBoi.loadCount = 100;
                        cartBoi.destX = canWalk[2];
                        cartBoi.destY = canWalk[3];
                        this.game.addWalker(cartBoi);

                    }
                }
            }
        }

    }
    //if it has, and you have space, update your count and kill the walker
    //if you don't have space, try to send it off to another yard
    //if you can't send it off, kill the walker.

    //check industries, if they're lower than some amount and you have stock, send a cart boi
    Entity.prototype.update.call(this);
}

StoreYard.prototype.draw = function (ctx) {
    pt1 = this.game.twodtoisoX(this.x, this.y) - this.renderX;
    pt2 = this.game.twodtoisoY(this.x, this.y) - this.renderY;
    //ctx.fillRect(pt1, pt2, 5, 5);
    this.currAnim.drawFrame(this.game.clockTick, ctx, pt1, pt2);
    Entity.prototype.draw.call(this);
}
StoreYard.prototype.toStringStats = function() {
    str = "Employed: " + this.numEmployed + "\nEmployees Needed: " + this.numEmpNeeded;//TODO
    return str;
}

StoreYard.prototype.changeAnim = function () {

    if (this.storage['clay'] > 0 && this.storage['barley'] > 0 && this.storage['flax'] > 0) {
        return 8;
    } else if (this.storage['clay'] <= 0 && this.storage['barley'] <= 0 && this.storage['flax'] <= 0) {
        return 1;
    } else if (this.storage['clay'] > 0 && this.storage['barley'] > 0 && this.storage['flax'] <= 0) {
        return 5;
    } else if (this.storage['clay'] > 0 && this.storage['barley'] <= 0 && this.storage['flax'] > 0) {
        return 6;
    } else if (this.storage['clay'] <= 0 && this.storage['barley'] > 0 && this.storage['flax'] > 0) {
        return 7;
    } else if (this.storage['clay'] > 0 && this.storage['barley'] <= 0 && this.storage['flax'] <= 0) {
        return 2;
    } else if (this.storage['clay'] <= 0 && this.storage['barley'] > 0 && this.storage['flax'] <= 0) {
        return 3;
    } else {
        return 4;
    }
}
