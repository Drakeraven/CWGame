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

function bazaar(game, x, y) {
    this.img = ASSET_MANAGER.getAsset("./img/Bazaar.png");
    this.bWidth = 2;
    this.bHeight = 2;
    this.renderX = 0;
    this.renderY = 7;
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
    this.pushTime = 10;
    this.buffer = { x: x - 1, y: y - 1, width: 2 + 30, height: 2 + 30}; 
    Entity.call(this, game, x, y);
}

bazaar.prototype = new Entity();
bazaar.prototype.constructor = bazaar;

bazaar.prototype.update = function () {
    Entity.prototype.update.call(this);
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

    //do this at a set time, 
    rangePop = 0; 
    for (i = 0; i < this.game.housingArr.length; i++) { 
        thisHouse = this.game.housingArr[i];
        rangePop += thisHouse.numHoused;
        if (arrived(this.buffer, thisHouse.x, thisHouse.y)
             && this.game.timer.gameTime - this.workTime >= this.pushTime) { 
            this.workTime = this.game.timer.gameTime;
            //push food/goods && send bazaar lady
            if (this.foodLevel > 0) { 
                thisHouse.foodLevel += thisHouse.level * 5;
                this.foodLevel -= thisHouse.level * 5; 
                console.log(this.game.housingArr[i].foodLevel);
            }
        } 
    }

    if (this.game.gameWorld.funds > 0) {
        //It just happens 
        //grab the excess for sold amount then send it in a gold card to the palace 
        //item amount x100 * itemSellprice 
    }


}

bazaar.prototype.draw = function (ctx) {
    Entity.prototype.draw.call(this);
    pt1 = this.game.twodtoisoX(this.x, this.y) - this.renderX;
    pt2 = this.game.twodtoisoY(this.x, this.y) - this.renderY;
    ctx.fillRect(pt1, pt2, 5, 5);
    this.currAnim.drawFrame(this.game.clockTick, ctx, pt1, pt2);
}

bazaar.prototype.toStringStats = function () {
    str = "Employeed: " + this.numEmployed + "\tEmployees Needed: " + (this.maxEmployed - this.numEmployed) + 
            "\nRange: " + this.range + "\tFunds: " + this.funds + "\n";
    return str;
}
