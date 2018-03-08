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
    this.currAnim = this.closedAnim;
    this.animFrame = [];        
    this.numEmployed = 0;
    this.numEmpNeeded = 20;
    this.placeCost = 400;
    this.range = 30;
    this.foodLevel = 0;
    this.foodMax = 750; 
    this.weaverLevel = 110;
    this.weaverSell = 40;  
    this.potterLevel = 110;
    this.potterSell = 35; 
    this.brewerLevel = 110;
    this.brewerSell = 45;
    this.pushAmt = 10; 
    this.maxRes = 500;
    this.funds = 320; 
    this.workTime = 0;
    this.pushTime = 30;
    this.fireResist = .10; 
    this.radius = {x: x - 15, y: y - 15, width: 2 + 30, height: 2 + 30};
    this.buffer = { x: x - 1, y: y - 1, width: 2 + 1, height: 2 + 1}; 
    this.roadTiles = [];
    Entity.call(this, game, x, y);
}

Bazaar.prototype = new Entity();
Bazaar.prototype.constructor = Bazaar;

Bazaar.prototype.update = function () {
    Entity.prototype.update.call(this);
    this.roadTiles = findRoad(this.buffer);
    //console.log("Inside update")
    /*if (getRandomInt(1, 101) <= fireResist) {
        //Catches on fire
        return;
    }

    if (getRandomInt(1, 101) <= collapseResist) {
        //collapses
        return;
    }*/

    if (this.numEmployed < this.numEmpNeeded) {
        this.currAnim = this.closedAnim;
        this.numEmployed = 0;

    } else {
        this.currAnim = this.openAnim;

        //see if any walkers show up, not dependant on time
        //put limits on how much to take in
        for (var i = 0; i < this.game.walkers.length; i++) {//loop through walkers
            if (arrived(this.buffer, this.game.walkers[i].x, this.game.walkers[i].y,  this, this.game.walkers[i].bRef)) {
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
                    //this.funds += this.game.walkers[i].funds;
                    this.game.walkers[i].removeFromWorld = true;
                }
                if (this.game.walkers[i].bRef == this) this.game.walkers[i].removeFromWorld = true;
            }
        }

        if (this.game.timer.gameTime - this.workTime >= this.pushTime) {
            this.workTime = this.game.timer.gameTime;
            //console.log("Push time");
            for (var i = 0; i < this.game.industries.length; i++) {
                //send walker our w/ enough to buy up to 1 sets of each item to start with i
                //send bazaar lady to the industries:
                //console.log(this.game.industries[i]);
                if (!(this.game.industries[i] instanceof Bazaar)) {
                    //console.log("Boi");
                    if (this.funds >= 45) { 
                        //generate walker(s) to send
                        //console.log("send walker from bazaar");
                        if (this.game.industries[i] instanceof Brewery && this.funds > 45) { 
                            //genwaker beer
                            this.genWalker(this.game.industries[i], 45, "beer", this.game.industries[i], this);
                            this.funds -= 45; 
                        }
                        if (this.game.industries[i] instanceof Weaver && this.funds > 50) {
                            //genwalker linen
                            this.genWalker(this.game.industries[i], 50, "linen", this.game.industries[i], this);
                            this.funds -= 50; 
                        }
                        if (this.game.industries[i] instanceof Potter && this.funds > 55) { 
                            //genwalker pottery
                            this.genWalker(this.game.industries[i], 55, "pottery", this.game.industries[i], this);
                            this.funds -= 55; 
                        }
                    }
                }
            }
    
            // send food and goods to house 
            rangePop = 0; 
            amtPushed = 0; 
            for (i = 0; i < this.game.housingArr.length; i++) { 
                thisHouse = this.game.housingArr[i];
                rangePop += thisHouse.numHoused;
                if (arrived(this.radius, thisHouse.x, thisHouse.y, this, this)) { 
                    if (this.foodLevel > thisHouse.level * this.pushAmt * 2) { 
                        //this.genWalker(this.game.housingArr[i], thisHouse.level * 20, "food", this.game.housingArr[i]);
                        thisHouse.foodLevel += thisHouse.level * this.pushAmt * 2;
                        this.foodLevel -= thisHouse.level * this.pushAmt * 2; 
                    } 
                    if (this.potterLevel > thisHouse.level * this.pushAmt) {
                        thisHouse.potterLevel += thisHouse.level * this.pushAmt; 
                        this.potterLevel -= thisHouse.level * this.pushAmt; 
                        amtPushed += thisHouse.level * this.pushAmt; 
                    }
                    if (this.weaverLevel > thisHouse.level * this.pushAmt) { 
                        thisHouse.weaverLevel += thisHouse.level * this.pushAmt; 
                        this.weaverLevel -= thisHouse.level * this.pushAmt; 
                        amtPushed += thisHouse.level * this.pushAmt;
                    } 
                    if (this.brewerLevel > thisHouse.level * this.pushAmt) { 
                        thisHouse.brewerLevel += thisHouse.level * this.pushAmt; 
                        this.brewerLevel -= thisHouse.level * this.pushAmt; 
                        amtPushed += thisHouse.level * this.pushAmt;
                    }
                } 
            }
            //send gold guy to palace 
            var toSend = 0; 
            if (this.game.gameWorld.funds > 0 && this.brewerLevel > 0 || this.potterLevel > 0 || this.weaverLevel > 0) {
                //It just happens 
                //grab the excess for sold amount then send it in a gold card to the palace 
                //toSend += (this.brewerLevel / 100 * 75) + (this.weaverLevel / 100 * 80) + (this.potterLevel / 100 * 85);
                this.funds += amtPushed * 0.25; 
                if (amtPushed != 0) { 
                    this.genWalker(this.game.gameWorld.palace, (amtPushed * 0.25), "gold", this.game.gameWorld.palace, this);
                }
            }
        }

    }
    //only send walkers out on a set schedule - atm every 30 seconds


}

Bazaar.prototype.draw = function (ctx) {
    Entity.prototype.draw.call(this);
    pt1 = this.game.twodtoisoX(this.x, this.y) - this.renderX;
    pt2 = this.game.twodtoisoY(this.x, this.y) - this.renderY;
    //ctx.fillRect(pt1, pt2, 5, 5);
    this.currAnim.drawFrame(this.game.clockTick, ctx, pt1, pt2);
}

Bazaar.prototype.genWalker = function (destBuild, funds, type, bRef, hRef) {
    found = false;
    let indie = destBuild;
    //console.log(indie);
    //WADDUP BETCH
    let canWalk = generateWalker(this.roadTiles, indie.roadTiles);
    if (canWalk != null) {
        found = true;
       // console.log(canWalk);
        this.pushBoi(canWalk, funds, type, bRef, hRef);

    }
}

Bazaar.prototype.pushBoi = function (canWalk, funds, type, bRef, hRef) {
    //console.log(funds, type);
    if (type === "gold") {
        var glcm = new glCartMan(this.game, ASSET_MANAGER.getAsset("./img/goldCartMan.png"), walkerMap, canWalk[0], canWalk[1], bRef);
        glcm.loadCount = funds;
        glcm.destX = canWalk[2];
        glcm.destY = canWalk[3];
        this.game.addWalker(glcm);
    } else {
        var pcm = new bazLad(this.game, ASSET_MANAGER.getAsset("./img/bazaarLady 22x42.png"), walkerMap, canWalk[0], canWalk[1], funds, type, bRef, hRef);
        pcm.destX = canWalk[2];
        pcm.destY = canWalk[3];
        this.game.addWalker(pcm);
    } 
}

Bazaar.prototype.toStringStats = function () {
    str = "Employed: " + this.numEmployed + "\nEmployees Needed: " + this.numEmpNeeded +
            "\nRange: " + this.range + "\nFunds: " + this.funds +
            "\nFood lvl: " + this.foodLevel + 
            "\nBeer lvl: " + this.brewerLevel + 
           // "\Beer sale: " + this.brewerSell +
            "\nLinen lvl: " + this.weaverLevel +
           // "\Linen sale: " + this.weaverSell + 
            "\nPotter lvl: " + this.potterLevel ;
           // "\nPotter sale: " + this.potterSell ;
    return str;
}
