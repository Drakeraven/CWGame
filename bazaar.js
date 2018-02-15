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
    this.placeCost = 50;
    this.range = 30;
    this.foodLevel = 100;
    this.weaverLevel = 0; 
    this.potterLevel = 0; 
    this.brewerLevel = 0;
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
    for (i = 0; i < this.game.housingArr.length; i++) { 
        //compare x and y to the range
        thishouse = this.game.housingArr[i];
        if (arrived(this.buffer, thisHouse.x, thisHouse.y)
             && this.game.timer.gameTime - this.workTime >= this.pushTime) { 
            this.workTime = this.game.timer.gameTime;
            console.log("within range");
            //push food/goods && send bazaar lady
            if (this.foodLevel > 0) { 
                thisHouse.foodLevel += thisHouse.level * 5;
                this.foodLevel -= 5; 
                console.log("food level");
                console.log(this.game.housingArr[i].foodLevel);
            }
        } 
        //for any house in the area, push food to them 
        //set amount to each place - 2 per person? idk housing level * amt 
        //sell stock of items 
        //gain money from general fund (item cost * items sold)
    }


}

bazaar.prototype.draw = function (ctx) {
    Entity.prototype.draw.call(this);
    pt1 = this.game.twodtoisoX(this.x, this.y) - this.renderX;
    pt2 = this.game.twodtoisoY(this.x, this.y) - this.renderY;
    ctx.fillRect(pt1, pt2, 5, 5);
    this.currAnim.drawFrame(this.game.clockTick, ctx, pt1, pt2);
}
