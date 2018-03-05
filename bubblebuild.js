function bubbleBuilding(img, game, x, y, bWidth, bHeight, buf) {
    this.game = game;
    this.img = img;
    this.bWidth = bWidth;
    this.bHeight = bHeight;
    this.openAnim = null;
    this.closedAnim = null;
    this.currAnim = null;
    this.renderX = 0;
    this.renderY = 0;
<<<<<<< HEAD
    this.radius = null; 
    this.range = 30; 
    this.numEmployed = 0;
    this.numEmpNeeded = 6;
=======
    this.radius = null;
    this.range = 30;
    //this.numEmployed = 0;
    //this.numEmpNeeded = null;
>>>>>>> e33d63f68619669801944be0ce3dd88b6e9d7dd4
    this.placeCost = 10;
    this.pushTime = 15;
    this.workTime = 0;
    this.roadTiles = [];
    this.buffer = { x: x - 1, y: y - 1, width: bWidth + 1, height: bHeight + 1};
    Entity.call(this, game, x, y);
}

bubbleBuilding.prototype = Object.create(Entity.prototype);
bubbleBuilding.prototype.constructor = bubbleBuilding;

bubbleBuilding.prototype.update = function () {
    Entity.prototype.update.call(this);
    this.roadTiles = findRoad(this.buffer);
    //detect who within your radius
    //impart reduced/improved affect onto the buildings in turn.

    myPop = 0;
    for (i = 0; i < this.game.housingArr.length; i++) {
        //console.log("this, ", this.x, " | ", this.y)
        //console.log("that, ", this.game.housingArr[i].x, " | ", this.game.housingArr[i].y);
        if (arrived(this.radius, this.game.housingArr[i].x, this.game.housingArr[i].y, this, this)) {
            if (this instanceof TaxHouse) {
                myPop += this.game.housingArr[i].numHoused;
            } else if (this instanceof Well || this instanceof WaterSupply) {
                //console.log("arrived")
                this.game.housingArr[i].waterLevel = true;
            } else if (this instanceof FireHouse) {
                this.game.housingArr[i].fireResist == 0.01;
            } else if (this instanceof CopHouse) {
                //this should probably be over the list of walkers
            }
        }
    }

    // for a set interval, collect taxes from myPop
    //(30mon / 10ppl)
    if (this.numEmployed < this.numEmpNeeded) { 
        this.currAnim = this.closedAnim; 
    } else { 
        this.currAnim = this.openAnim; 
        if (this.game.timer.gameTime - this.workTime >= this.pushTime && this instanceof TaxHouse && myPop > 0) {
            this.workTime = this.game.timer.gameTime;
            //var myPop = this.game.gameWorld.population;
            var myTax = (Math.ceil((Math.floor((myPop / 10)) * 30) * 0.1)); //10 percent of 30 money per 10 people
            //console.log("Tax: ", myTax);
            //console.log("Pop: ", myPop);
            this.genWalker(this.game.gameWorld.palace, myTax, "gold");
            //send a gold cart man every 45-1min seconds w/ this fundage
            /* go through industry list later??? nope dont need to
            */
        }
    }
}

bubbleBuilding.prototype.remove = function () {
    //iterate over houses in the area of effect and disable benefits
    for (i = 0; i < this.game.housingArr.length; i++) {
        if (arrived(this.radius, this.game.housingArr[i].x, this.game.housingArr[i].y, this, this)) {
            if (this instanceof Well || this instanceof WaterSupply) {
                this.game.housingArr[i].waterLevel = false;
            } else if (this instanceof FireHouse) {
                //add later
            } else if (this instanceof CopHouse) {
                //this should probably be over the list of walkers
            }
        }
    }
}

bubbleBuilding.prototype.draw = function (ctx) {
    pt1 = this.game.twodtoisoX(this.x, this.y) - this.renderX;
    pt2 = this.game.twodtoisoY(this.x, this.y) - this.renderY;
    this.currAnim.drawFrame(this.game.clockTick, ctx, pt1, pt2);
    Entity.prototype.draw.call(this);
}

bubbleBuilding.prototype.toStringStats = function() {
   // str = "Employed: " + this.numEmployed + "\tEmployees Needed: " + (this.maxEmployed - this.numEmployed) +
    //"\nRange: " + this.range + "\n";;
    str = "Range: " + this.range + "\n";
    return str;
}

function Well (game, x, y) {
    img = ASSET_MANAGER.getAsset("./img/smallWell.png");
    bubbleBuilding.call(this, img, game, x, y, 1, 1, 10);
    workTime = game.timer.gameTime;
    this.radius = { x: x - 5, y: y - 5, width: 15, height: 15};
    this.renderX = 0;
    this.renderY = 21;
    this.range = 15;
    this.openAnim = new Animation(img, 0, 1, 58, 51, 1, 0.15, 1, true);
    this.closedAnim = new Animation(img, 0, 1, 58, 51, 1, 0.15, 1, true);
    this.currAnim = new Animation(img, 0, 1, 58, 51, 1, 0.15, 1, true);
}

Well.prototype = Object.create(bubbleBuilding.prototype);
Well.prototype.constructor = Well;

function WaterSupply (game, x, y) {
    img = ASSET_MANAGER.getAsset("./img/bigWell.png");
    bubbleBuilding.call(this, img, game, x, y, 2, 2, 30);
    workTime = game.timer.gameTime;
    this.renderX = 29;
    this.renderY = 17;
    this.radius = { x: x - 10, y: y - 10, width: 1 + 25, height: 1 + 25};
    this.openAnim = new Animation(img, 0, 1, 118, 77, 1, 0.15, 1, true);
    this.closedAnim = new Animation(img, 0, 1, 118, 77, 1, 0.15, 1, true);
    this.currAnim = new Animation(img, 0, 1, 118, 77, 1, 0.15, 1, true);
}

WaterSupply.prototype = new bubbleBuilding();
WaterSupply.prototype.constructor = WaterSupply;

function TaxHouse (game, x, y) {
    img = ASSET_MANAGER.getAsset("./img/taxHouse.png");
    bubbleBuilding.call(this, img, game, x, y, 2, 2, 30);
    this.workTime = game.timer.gameTime;
    this.radius = { x: x - 15, y: y - 15, width: 2 + 30, height: 2 + 30};
    this.renderX = 29;
    this.renderY = 35;
    this.openAnim = new Animation(img, 0, 1, 118, 96, 8, 0.15, 8, true);
    this.closedAnim = new Animation(img, 0, 0, 118, 96, 1, 0.15, 1, true);
    this.currAnim = this.closedAnim;
}

TaxHouse.prototype = Object.create(bubbleBuilding.prototype);
TaxHouse.prototype.constructor = TaxHouse;

function FireHouse (game, x, y) {
    img = ASSET_MANAGER.getAsset("./img/Firehouse-1.png");
    bubbleBuilding.call(this, img, game, x, y, 1, 1, 30);
    this.workTime = game.timer.gameTime;
    this.radius = {x: x - 15, y: y - 15, width: 2 + 30, height: 2 + 30};
    this.renderX = 0;
    this.renderY = 70;
    this.openAnim = new Animation(img, 0, 1, 58, 100, 6, .15, 12, true);
    this.closedAnim = new Animation(img, 0, 0, 58, 100, 1, .15, 1, true);
    this.currAnim = this.closedAnim;
}

FireHouse.prototype = Object.create(bubbleBuilding.prototype);
FireHouse.prototype.constructor = FireHouse;

function CopHouse (game, x, y) {
    img = ASSET_MANAGER.getAsset("./img/COPS-1.png");
    bubbleBuilding.call(this, img, game, x, y, 1, 1, 30);
    this.workTime = game.timer.gameTime;
    this.radius = {x: x - 15, y: y - 15, width: 2 + 30, height: 2 + 30};
    this.renderX = 0;
    this.renderY = 73;
    this.openAnim = new Animation(img, 0, 1, 58, 102, 6, .15, 12, true);
    this.closedAnim = new Animation(img, 0, 1, 58, 102, 6, .15, 12, true);
    this.currAnim = new Animation(img, 0, 1, 58, 102, 6, .15, 12, true);
}

CopHouse.prototype = Object.create(bubbleBuilding.prototype);
CopHouse.prototype.constructor = CopHouse;

bubbleBuilding.prototype.genWalker = function (destBuild, funds) {
    found = false;
    let indie = destBuild;
    console.log(indie);
    //WADDUP BETCH
    let canWalk = generateWalker(this.roadTiles, indie.roadTiles);
    if (canWalk != null) {
        found = true;
        console.log(canWalk);
        this.pushBoi(canWalk, funds);

    }
    //if (found) break;
    //console.log(found);
}

bubbleBuilding.prototype.pushBoi = function (canWalk, funds) {
    var glcm = new glCartMan(this.game, ASSET_MANAGER.getAsset("./img/goldCartMan.png"), walkerMap, canWalk[0], canWalk[1], this.game.gameWorld.palace);
    glcm.loadCount = funds;
    glcm.destX = canWalk[2];
    glcm.destY = canWalk[3];
    this.game.addWalker(glcm);

}
