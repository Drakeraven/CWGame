var fireResist = 5; // percent chance of burning? lowerable
var collapseResist = 3; //percent chance of collapse? lowerable.

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

function house(game, img, x, y, bWidth, bHeight) {
    this.game = game; 
    this.img = img;
    this.bWidth = bWidth;
    this.bHeight = bHeight;
    this.level = 0;
    this.destroyedAnim = null;
    this.currAnim = null;
    this.animFrame = [];        
    this.numHoused = 0;
    this.placeCost = null;
    this.waterLevel = false;
    this.foodLevel = 0;
    this.weaverLevel = false; 
    this.potterLevel = false; 
    this.brewerLevel = false;
    this.renderX = 0;
    this.renderY = 0; 
    this.buffer = { x: x - 1, y: y - 1, width: bWidth + 1, height: bHeight + 1};
    Entity.call(this, game, x, y);
}

house.prototype = new Entity();
house.prototype.constructor = house;

house.prototype.update = function () {
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

    if (!this.waterLevel) { 
        this.level = 0;
    } else { 
        if (this.waterLevel && this.foodLevel && this.potterLevel && this.weaverLevel && this.brewerLevel) { 
            this.level = 5;
            //change renderx and renderY 
        } else if (this.waterLevel && this.foodLevel 
            && ((this.potterLevel && this.weaverLevel) 
                || (this.potterLevel && this.brewerLevel)
                || (this.weaverLevel && this.brewerLevel))) {
            this.level = 4;     
            //change renderx and renderY 
        } else if(this.waterLevel && this.foodLevel 
            && (this.potterLevel || this.weaverLevel || this.brewerLevel)) {
            this.level = 3; 
            //change renderx and renderY 
        } else if(this.waterLevel && this.foodLevel) { 
            this.level = 2; 
            //change renderx and renderY 
        } else { 
            this.level = 1;
            //change renderx and renderY 
        }
    }
    this.currAnim = this.animFrame[this.level];
    this.numHoused = (this.level + 1) * 30; 
    //add later: if prosperity over certain %, upgrade?
    
    //detect who within your radius
    
    //get food from others >> after set amount of time, eat X amount of food 
    // if gametime = 1 month 
        //this.foodLevel -= numHoused;

    //UPDATE Pop:
    /*currentPop = 0;
    for (i = 0; i < this.game.housingArr.length; i++) {
        currentPop += numHoused;
    } 

    if (currentPop > this.game.gameWorld.population) { 
        this.game.gameWorld.addPop(currentPop - this.game.gameWorld.population);
    } else { 
        this.game.gameWorld.remPop(this.game.gameWorld.population - currentPop);
    }    */
    //Iterate over all buildings in array, add/subtract difference between gameWorld pop and array pop
    //PUSH POP TO INDUSTRY LIST > check gameWorld for population stat > 40%? > only give each industry building what they need 
}

house.prototype.draw = function (ctx) {
    pt1 = this.game.twodtoisoX(this.x, this.y) - this.renderX;
    pt2 = this.game.twodtoisoY(this.x, this.y) - this.renderY;
    ctx.fillRect(pt1, pt2, 5, 5);
    this.currAnim.drawFrame(this.game.clockTick, ctx, pt1, pt2);
    Entity.prototype.draw.call(this);
}


function Housing(img, game, x, y, bWidth, bHeight) {
    house.call(this, img, game, x, y, bWidth, bHeight);
    this.foodTime = game.timer.gameTime;
    this.img = img;
    this.level = 0;
    this.placeCost = 25;
    this.animFrame[0] = new Animation(img, 0, 0, 118, 97, 1, 0.15, 1, true);
    this.animFrame[1] = new Animation(img, 3, 0, 118, 97, 1, 0.15, 1, true);
    this.animFrame[2] = new Animation(img, 5, 0, 118, 97, 1, 0.15, 1, true);
    this.animFrame[3] = new Animation(img, 1, 1, 118, 97, 1, 0.15, 1, true);
    this.animFrame[4] = new Animation(img, 3, 1, 118, 97, 1, 0.15, 1, true);
    this.animFrame[5] = new Animation(img, 5, 1, 118, 97, 1, 0.15, 1, true);
    this.currAnim = this.animFrame[0];
    this.numHoused = 30;
    console.log(this.buffer);    
}

Housing.prototype = new house();
Housing.prototype.constructor = Housing;