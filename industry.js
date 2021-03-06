var wageRate = 30; //annually removed, change to percentage of pop?
var fireResist = 5; // percent chance of burning? lowerable
var collapseResist = 3; //percent chance of collapse? lowerable.

var merchStep = 100; //how much of an item is created at the end of a buidl cycle

function industry(game, x, y) {
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
    this.numEmpNeeded = 0;
    this.placeCost = null;
    this.numResources = 0;
    this.resType = "";
    this.merchType = null;
    this.numMerch = 0;
    this.merchCost = 0;
    this.prodTime = 0;
    this.fireResist = 0.10;
    this.radius = { x: x - 15, y: y - 15, width: this.bWidth + 30, height: this.bHeight + 30 };
    this.buffer = { x: x - 1, y: y - 1, width: this.bWidth + 1, height: this.bHeight + 1 };
    this.roadTiles = [];
    this.working = false;
    Entity.call(this, game, x, y);
}

industry.prototype = Object.create(Entity.prototype);
industry.prototype.constructor = industry;

industry.prototype.update = function () {
    Entity.prototype.update.call(this);
    this.roadTiles = findRoad(this.buffer);

    for (var i = 0; i < this.game.walkers.length; i++) {//loop through walkers
        if (arrived(this.buffer, this.game.walkers[i].x, this.game.walkers[i].y, this, this.game.walkers[i].bRef)) {
            //("ping!", this.game.walkers.length);
            if (this.game.walkers[i].loadType == this.resType && this.numResources < 500) {
                this.numResources += this.game.walkers[i].loadCount;
                this.game.walkers[i].removeFromWorld = true;
            } else if (this.game.walkers[i].loadType == this.resType) {
                this.game.walkers[i].removeFromWorld = true;
            }
            if (this.game.walkers[i].loadType == this.merchType) {
                while (this.game.walkers[i].funds >= this.merchCost && this.numMerch > this.game.walkers[i].loadCount) {
                    this.game.walkers[i].funds -= this.merchCost;
                    this.numMerch -= 100; //amt bought at a time
                    this.game.walkers[i].loadCount += 100;
                }
                this.game.walkers[i].x = Math.floor(this.game.walkers[i].x);
                this.game.walkers[i].y = Math.floor(this.game.walkers[i].y);
                this.game.walkers[i].destX = this.game.walkers[i].startX;
                this.game.walkers[i].destY = this.game.walkers[i].startY;
                this.game.walkers[i].bRef = this.game.walkers[i].hRef;
                this.game.walkers[i].hRef = this;
            }
        }

    }

    /*for (i = 0; i < this.game.housingArr.length; i++) { 
        if (arrived(this.radius, this.game.housingArr[i].x, this.game.housingArr[i].y, this, this)) {
            if (this instanceof Potter) { 
                this.game.housingArr[i].potterLevel = true;
            } else if (this instanceof Weaver) {
                this.game.housingArr[i].weaverLevel = true;
            } else if (this instanceof Brewery) { 
                this.game.housingArr[i].brewerLevel = true;
            } 
        }
    }*/
    
    //this.roadTiles = findRoad(this.buffer);
    //Checks for fire/collapse. Need to make this happen, not ALOT of the time...
    //if (getRandomInt(1, 101) <= fireResist) {
        //Catches on fire
        //for (var i = 0; i < this.game.industries.length; i++) {
        //    if (this.game.industries[i] == this) {
        //        console.log(this);
        //    }
        //}
        //this.removeFromWorld = true;
    //    return;
    //}

    //if (getRandomInt(1, 101) <= collapseResist) {
    //    //collapses
    //    return;
    //}

    //if out of employees or no resources, close operation

    if (this.numEmployed < this.numEmpNeeded || this.numResources == 0) {
        this.currAnim = this.closedAnim;
        this.numEmployed = 0;

    } else {
        this.currAnim = this.openAnim;
        //if (this.game.timer.gameTime - this.workTime >= this.prodTime) {
        //    this.workTime = this.game.timer.gameTime;
        //    this.numMerch += merchStep;
        //    this.numResources -= merchStep;
        //}
        if (!this.working) {
            this.working = true;
            that = this;
            setTimeout(function () {
                //console.log("Creating product");
                that.numMerch += merchStep;
                that.numResources -= merchStep;
                that.working = false;
            }, this.prodTime * 1000);
        }
    }
}
industry.prototype.toStringStats = function() {
    str = "Employed: " + this.numEmployed + "\nEmployees Needed: " + this.numEmpNeeded +
    "\nResource Type: " + this.resType + "\nProduct Type/Cost: " + this.merchType + "/" + this.merchCost +
        "\nResources: " + this.numResources + "\nProduct: " + this.numMerch;
    return str;
}
industry.prototype.draw = function (ctx) {
    pt1 = this.game.twodtoisoX(this.x, this.y) - this.renderX;
    pt2 = this.game.twodtoisoY(this.x, this.y) - this.renderY;
    this.currAnim.drawFrame(this.game.clockTick, ctx, pt1, pt2);
    Entity.prototype.draw.call(this);
}

industry.prototype.remove = function () { 
    //iterate over houses in the area of effect and disable benefits 
    for (i = 0; i < this.game.housingArr.length; i++) { 
        if (arrived(this.radius, this.game.housingArr[i].x, this.game.housingArr[i].y, this, this)) {
            if (this instanceof Potter) {
                this.game.housingArr[i].potterLevel = false;
            } else if (this instanceof Weaver) { 
                this.game.housingArr[i].weaverLevel = false;
            } else if (this instanceof Brewery) { 
                this.game.housingArr[i].brewerLevel = false; 
            } 
        }
    }
}

//For each industry, define a resource type as a string.
function Weaver(game, x, y) {
    industry.call(this, game, x, y);
    this.img = ASSET_MANAGER.getAsset("./img/Weaver.png");
    this.workTime = game.timer.gameTime;
    this.openAnim = new Animation(this.img, 0, 1, 118, 100, 6, .15, 12, true);
    this.closedAnim = new Animation(this.img, 0, 0, 118, 100, 1, .15, 1, true); // maybe set false??
    this.currAnim = this.closedAnim;
    this.renderX = 31;
    this.renderY = 40;
    this.resType = "flax";
    this.merchType = "linen";
    this.numEmpNeeded = 12;
    this.placeCost = 50;
    this.merchCost = 50;
    this.prodTime = 10;
    this.numEmployed = 12;
}

Weaver.prototype = Object.create(industry.prototype);
Weaver.prototype.constructor = Weaver;

function Brewery(game, x, y) {
    industry.call(this, game, x, y);
    this.img = ASSET_MANAGER.getAsset("./img/Brewery.png");
    this.workTime = game.timer.gameTime;
    this.openAnim = new Animation(this.img, 0, 1, 118, 90, 4, .15, 12, true);
    this.closedAnim = new Animation(this.img, 0, 0, 118, 90, 1, .15, 1, true);
    this.currAnim = this.closedAnim;
    this.renderX = 31;
    this.renderY = 30;
    this.resType = "barley";
    this.merchType = "beer";
    this.numEmpNeeded = 14;
    this.placeCost = 60;
    this.merchCost = 45;
    this.prodTime = 15;
}

Brewery.prototype = Object.create(industry.prototype);
Brewery.prototype.constructor = Brewery;

function Potter(game, x, y) {
    industry.call(this, game, x, y);
    this.img = ASSET_MANAGER.getAsset("./img/Potter.png");
    this.workTime = game.timer.gameTime;
    this.openAnim = new Animation(this.img, 0, 1, 118, 90, 9, 0.15, 18, true);
    this.closedAnim = new Animation(this.img, 0, 0, 118, 90, 1, 0.15, 1, true);
    this.currAnim = this.closedAnim;
    this.renderX = 31;
    this.renderY = 30;
    this.resType = "clay";
    this.merchType = "pottery";
    this.numEmpNeeded = 16;
    this.placeCost = 70;
    this.merchCost = 55;
    this.prodTime = 20;
}

Potter.prototype = Object.create(industry.prototype);
Potter.prototype.constructor = Potter;
