function arrived(rect1, r2X, r2Y) {
    //return (rect1.x < rect2X + 0) &&
    //    (rect1.x + rect1.width > r2X && rect1.y < r2Y + 0) &&
    //    (rect1.height + rect1.y > r2);
    return (r2X < rect1.x + rect1.width && r2X > rect1.x) &&
        (r2Y < rect1.y + rect1.height && r2Y > rect1.y);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function Bazaar(game, x, y) {
    this.img = ASSET_MANAGER.getAsset("./img/Bazaar.png");
    this.bWidth = 2;
    this.bHeight = 2;
    this.renderX = 30;
    this.renderY = 21;
    this.openAnim = new Animation(this.img, 0, 1, 118, 82, 4, .15, 12, true);
    this.closedAnim = new Animation(this.img, 0, 0, 118, 82, 1, .15, 1, true);
    this.destroyedAnim = null;
    this.currAnim = new Animation(this.img, 0, 0, 118, 82, 1, .15, 1, true);
    this.animFrame = [];        
    this.numEmployed = 0;
    this.maxEmployed = 20;
    this.placeCost = 400;
    this.range = 30;
    this.foodLevel = 0;
    this.weaverLevel = 0;
    this.weaverSell = 40;  
    this.potterLevel = 0;
    this.potterSell = 35; 
    this.brewerLevel = 0;
    this.brewerSell = 45; 
    this.funds = 320; 
    this.workTime = 0;
    this.pushTime = 30;
    this.radius = { x: x - 1, y: y - 1, width: 2 + 30, height: 2 + 30};
    this.buffer = { x: x - 1, y: y - 1, width: 2 + 1, height: 2 + 1}; 
    Entity.call(this, game, x, y);
}

Bazaar.prototype = new Entity();
Bazaar.prototype.constructor = Bazaar;

Bazaar.prototype.update = function () {
    Entity.prototype.update.call(this);
    this.roadTiles = findRoad(this.buffer);
    //console.log("Inside update")
    if (getRandomInt(1, 101) <= fireResist) {
        //Catches on fire
        return;
    }

    if (getRandomInt(1, 101) <= collapseResist) {
        //collapses
        return;
    }
    if (this.numEmployed === this.maxEmployed) { 
        this.currAnim = this.openAnim;
    } else { 
        this.currAnim = this.closedAnim;
    }

    if (this.numEmployed < this.numEmpNeeded || this.numResources == 0) {
        this.currAnim = this.closedAnim;
        this.numEmployed = 0;

    } else {
        this.currAnim = this.openAnim;

        //see if any walkers show up, not dependant on time
        for (var i = 0; i < this.game.walkers.length; i++) {//loop through walkers
            if (arrived(this.buffer, this.game.walkers[i].x, this.game.walkers[i].y)) {
                if (this.game.walkers[i].loadType === "beer") {  //put item in right var 
                    this.brewerLevel += this.game.walkers[i].loadCount;
                    this.funds += this.game.walkers[i].funds;
                    this.game.walkers[i].removeFromWorld = true;
                } else if (this.game.walkers[i].loadType === "pottery") { 
                    this.potterLevel += this.game.walkers[i].loadCount;
                    this.funds += this.game.walkers[i].funds;
                    this.game.walkers[i].removeFromWorld = true;
                } else if (this.game.walkers[i].loadType === "linen") {
                    this.weaverLevel += this.game.walkers[i].loadCount;
                    this.funds += this.game.walkers[i].funds;
                    this.game.walkers[i].removeFromWorld = true;
                } else if (this.game.walkers[i].loadType === "meat") { 
                    this.foodLevel += this.game.walkers[i].loadCount;
                    this.funds += this.game.walkers[i].funds;
                    this.game.walkers[i].removeFromWorld = true;
                }
            }
        }
    }
    //only send walkers out on a set schedule - atm every 30 seconds
    if (this.game.timer.gameTime - this.workTime >= this.pushTime) {
        this.workTime = this.game.timer.gameTime;
        if (this.funds >= 200) {
            //send walker our w/ enough to buy up to 1 sets of each item to start with i
            //send bazaar lady to the industries:
            console.log("Push Time!"); 
            for (var i = 0; i < this.game.industries.length; i++) {
                if (!(this.game.industries[i] instanceof Bazaar)) { 
                    //generate walker(s) to send
                    if (this.game.industries[i] instanceof Brewery) { 
                        //genwaker beer
                        console.log("Generating beer walker");
                        this.genWalker(this.game.industries[i], 45, "beer");
                    }
                    if (this.game.industries[i] instanceof Weaver) {
                        //genwalker linen
                        this.genWalker(this.game.industries[i], 50, "linen");
                    }
                    if (this.game.industries[i] instanceof Potter) { 
                        //genwalker pottery
                        this.genWalker(this.game.industries[i], 55, "pottery");
                    }
                }
            }
        }



        //do this at a set time, 
        rangePop = 0; 
        for (i = 0; i < this.game.housingArr.length; i++) { 
            thisHouse = this.game.housingArr[i];
            rangePop += thisHouse.numHoused;
            if (arrived(this.radius, thisHouse.x, thisHouse.y)) { 
                
                if (this.foodLevel > 0) { 
                    //insert a walker here - give the walker food, have it go to the house
                    //if done, make sure the house has code to kill walker!!!
                    thisHouse.foodLevel += thisHouse.level * 5;
                    this.foodLevel -= thisHouse.level * 5; 
                    console.log(this.game.housingArr[i].foodLevel);
                } 
            } 
        }
    }


    if (this.game.gameWorld.funds > 0) {
        //It just happens 
        //grab the excess for sold amount then send it in a gold card to the palace 
        //item amount x100 * itemSellprice 
    }


}

Bazaar.prototype.draw = function (ctx) {
    Entity.prototype.draw.call(this);
    pt1 = this.game.twodtoisoX(this.x, this.y) - this.renderX;
    pt2 = this.game.twodtoisoY(this.x, this.y) - this.renderY;
    ctx.fillRect(pt1, pt2, 5, 5);
    this.currAnim.drawFrame(this.game.clockTick, ctx, pt1, pt2);
}

Bazaar.prototype.genWalker = function (destBuild, funds, type) {
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

Bazaar.prototype.pushBoi = function (canWalk, funds, type) {
    console.log(funds, type);
    if (type === "beer") {
        console.log("Pushboi");
        var ccm = new bazLad(this.game, ASSET_MANAGER.getAsset("./img/bazaarLady 22x42.png"), walkerMap, canWalk[0], canWalk[1], funds, type);
        ccm.destX = canWalk[2];
        ccm.destY = canWalk[3];
        this.game.addWalker(ccm);
    } else if (type === "linen") {
        var mcm = new bazLad(this.game, ASSET_MANAGER.getAsset("./img/bazaarLady 22x42.png"), walkerMap, canWalk[0], canWalk[1], funds, type);
        mcm.destX = canWalk[2];
        mcm.destY = canWalk[3];
        this.game.addWalker(mcm);
    } else if (type === "gold") {
        var glcm = new glCartMan(this.game, ASSET_MANAGER.getAsset("./img/goldCartMan.png"), walkerMap, canWalk[0], canWalk[1]);
        glcm.destX = canWalk[2];
        glcm.destY = canWalk[3];
        this.game.addWalker(glcm);
    } else if (type === "pottery") {
        var pcm = new bazLad(this.game, ASSET_MANAGER.getAsset("./img/bazaarLady 22x42.png"), walkerMap, canWalk[0], canWalk[1], funds, type);
        pcm.destX = canWalk[2];
        pcm.destY = canWalk[3];
        this.game.addWalker(pcm);
    }

}
