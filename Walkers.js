
var speed = 2.5;
var aSpeed = .06;
//TODO: Bazaar Woman Logic. Fireman/Hunter Logic. Fix rendering of sprite 
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function Walker4(game, img, map, lX, lY) {
    this.dX = 0;
    this.dY = -1;
    this.animation = [];
    this.animation["NE"] = null;
    this.animation["NW"] = null;
    this.animation["SE"] = null;
    this.animation["SW"] = null;
    this.currAnimation = null;
    this.facing = "";
    this.img = img;
    this.isWalking = false;
    this.isFindingPath = false;
    this.destX = null;
    this.destY = null;
    this.path = [];
    this.next = null;
    this.ID = null;
    this.loadCount = 0;
    this.loadType = "";
    this.easyStar = new EasyStar.js();
    this.easyStar.setGrid(map);
    this.easyStar.setAcceptableTiles([1]);
    this.easyStar.disableCornerCutting();
    Entity.call(this, game, lX, lY);
}

Walker4.prototype = Object.create(Entity.prototype);
Walker4.prototype.constructor = Walker4;

Walker4.prototype.update = function () {
    /*For Destination Walkers:
        Have a data structure of your viable destination buildings
        check if you meet requirements to embark for each building
        calculate shortest path with level data
        walk path to destination
        depending on goal, update your animation (eg. cart boi taking what)
        Calculate shortest path to return
        return, update data as needed.*/

    if (this.isFindingPath) return;
    if (this.isWalking) this.walkPath();
    if (this.destX != null && this.destY != null) {
        console.log(this.ID + "Before");
        this.isFindingPath = true;
        let that = this;
        this.easyStar.findPath(this.x, this.y, this.destX, this.destY, function (path) {
            console.log(that.ID);
            if (path === null) {
                console.log("No path :(");
            } else {
                console.log("Path! The first Point is " + path[0].x + " " + path[0].y);
                that.path = path;
                that.next = that.path.shift();
                that.isWalking = true; 
            }
        });
        this.easyStar.calculate();
        this.destX = null;
        this.destY = null;
        this.isFindingPath = false;
    }
    //console.log(this.ID + " " + this.isWalking);
    Entity.prototype.update.call(this);
}

Walker4.prototype.walkPath = function () {
    if (this.path.length == 0) {
        if (Math.floor(this.x) == this.next.x && Math.floor(this.y) == this.next.y) {
            this.dX = 0;
            this.dY = 0;
        }
        isWalking = false;
        return;
    }
    if (Math.floor(this.x) == this.next.x && Math.floor(this.y) == this.next.y) {
        this.next = this.path.shift();
        //console.log("current: " + Math.floor(this.x) + " " + Math.floor(this.y) +
        //    " next: " + this.next.x + " " + this.next.y);
        this.dX = setDirection(Math.floor(this.x), this.next.x);
        this.dY = setDirection(Math.floor(this.y), this.next.y);
        this.currAnimation = this.animation[setFace(this.dX, this.dY)];
        //console.log(this.dX + " "+ this.dY);
    }
    this.x += this.dX * this.game.clockTick * speed;
    this.y += this.dY * this.game.clockTick * speed;
}

Walker4.prototype.draw = function (ctx) {
    pt1 = twodtoisoX(this.x, this.y) + 27 - this.currAnimation.frameWidth / 2;
    pt2 = twodtoisoY(this.x, this.y) + 10 - this.currAnimation.frameHeight / 2;
    ctx.fillRect(pt1, pt2, 5, 5);
    //console.log(pt1, pt2);
    this.currAnimation.drawFrame(this.game.clockTick, ctx, pt1, pt2);
    Entity.prototype.draw.call(this);
}

//Cart Walkers 

function eCartMan(game, img, map, lX, lY)   {
    Walker4.call(this, game, img, map, lX, lY);
    this.animation["NE"] = new Animation(img, 0, 0, 60, 48, 12, aSpeed, 12, true);
    this.animation["NW"] = new Animation(img, 0, 1, 60, 48, 12, aSpeed, 12, true);
    this.animation["SE"] = new Animation(img, 0, 2, 60, 48, 12, aSpeed, 12, true);
    this.animation["SW"] = new Animation(img, 0, 3, 60, 48, 12, aSpeed, 12, true);
    this.currAnimation = this.animation["NE"];
    this.loadType = "empty";
}

eCartMan.prototype = Object.create(Walker4.prototype);
eCartMan.prototype.constructor = eCartMan;

function barCartMan(game, img, Ai, map, lX, lY)  {
    Walker4.call(this, game, img, map, lX, lY);
    this.animation["NE"] = new Animation(img, 0, 0, 60, 60, 12, aSpeed, 12, true);
    this.animation["NW"] = new Animation(img, 0, 1, 60, 60, 12, aSpeed, 12, true);
    this.animation["SE"] = new Animation(img, 0, 2, 60, 60, 12, aSpeed, 12, true);
    this.animation["SW"] = new Animation(img, 0, 3, 60, 60, 12, aSpeed, 12, true);
    this.currAnimation = this.animation["NE"];

}

barCartMan.prototype = Object.create(Walker4.prototype);
barCartMan.prototype.constructor = barCartMan;

function beCartMan(game, img, map, lX, lY) {
    Walker4.call(this, game, img, map, lX, lY);
    this.animation["NE"] = new Animation(img, 0, 0, 60, 60, 12, aSpeed, 12, true);
    this.animation["NW"] = new Animation(img, 0, 1, 60, 60, 12, aSpeed, 12, true);
    this.animation["SE"] = new Animation(img, 0, 2, 60, 60, 12, aSpeed, 12, true);
    this.animation["SW"] = new Animation(img, 0, 3, 60, 60, 12, aSpeed, 12, true);
    this.currAnimation = this.animation["NE"];
}

beCartMan.prototype = Object.create(Walker4.prototype);
beCartMan.prototype.constructor = beCartMan;

function cCartMan(game, img, Ai, lX, lY) {
    Walker4.call(this, game, img, Ai, lX, lY);
    this.animation["NE"] = new Animation(img, 0, 0, 60, 48, 12, aSpeed, 12, true);
    this.animation["NW"] = new Animation(img, 0, 1, 60, 48, 12, aSpeed, 12, true);
    this.animation["SE"] = new Animation(img, 0, 2, 60, 48, 12, aSpeed, 12, true);
    this.animation["SW"] = new Animation(img, 0, 3, 60, 48, 12, aSpeed, 12, true);
    this.currAnimation = this.animation["NE"];
}

cCartMan.prototype = Object.create(Walker4.prototype);
cCartMan.prototype.constructor = cCartMan;

function fCartMan(game, img, Ai, lX, lY) {
    Walker4.call(this, game, img, Ai, lX, lY);
    this.animation["NE"] = new Animation(img, 0, 0, 60, 48, 12, aSpeed, 12, true);
    this.animation["NW"] = new Animation(img, 0, 1, 60, 48, 12, aSpeed, 12, true);
    this.animation["SE"] = new Animation(img, 0, 2, 60, 48, 12, aSpeed, 12, true);
    this.animation["SW"] = new Animation(img, 0, 3, 60, 48, 12, aSpeed, 12, true);
    this.currAnimation = this.animation["NE"];
}

fCartMan.prototype = Object.create(Walker4.prototype);
fCartMan.prototype.constructor = fCartMan;

function glCartMan(game, img, Ai, lX, lY) {
    Walker4.call(this, game, img, Ai, lX, lY);
    this.animation["NE"] = new Animation(img, 0, 0, 60, 48, 12, aSpeed, 12, true);
    this.animation["NW"] = new Animation(img, 0, 1, 60, 48, 12, aSpeed, 12, true);
    this.animation["SE"] = new Animation(img, 0, 2, 60, 48, 12, aSpeed, 12, true);
    this.animation["SW"] = new Animation(img, 0, 3, 60, 48, 12, aSpeed, 12, true);
    this.currAnimation = this.animation["NE"];
}

glCartMan.prototype = Object.create(Walker4.prototype);
glCartMan.prototype.constructor = glCartMan;

function grCartMan(game, img, Ai, lX, lY) {
    Walker4.call(this, game, img, Ai, lX, lY);
    this.animation["NE"] = new Animation(img, 0, 0, 60, 48, 12, aSpeed, 12, true);
    this.animation["NW"] = new Animation(img, 0, 1, 60, 48, 12, aSpeed, 12, true);
    this.animation["SE"] = new Animation(img, 0, 2, 60, 48, 12, aSpeed, 12, true);
    this.animation["SW"] = new Animation(img, 0, 3, 60, 48, 12, aSpeed, 12, true);
    this.currAnimation = this.animation["NE"];
}

grCartMan.prototype = Object.create(Walker4.prototype);
grCartMan.prototype.constructor = grCartMan;

function lCartMan(game, img, Ai, lX, lY) {
    Walker4.call(this, game, img, Ai, lX, lY);
    this.animation["NE"] = new Animation(img, 0, 0, 60, 48, 12, aSpeed, 12, true);
    this.animation["NW"] = new Animation(img, 0, 1, 60, 48, 12, aSpeed, 12, true);
    this.animation["SE"] = new Animation(img, 0, 2, 60, 48, 12, aSpeed, 12, true);
    this.animation["SW"] = new Animation(img, 0, 3, 60, 48, 12, aSpeed, 12, true);
    this.currAnimation = this.animation["NE"];
}

lCartMan.prototype = Object.create(Walker4.prototype);
lCartMan.prototype.constructor = lCartMan;

function mCartMan(game, img, Ai, lX, lY) {
    Walker4.call(this, game, img, Ai, lX, lY);
    this.animation["NE"] = new Animation(img, 0, 0, 60, 48, 12, aSpeed, 12, true);
    this.animation["NW"] = new Animation(img, 0, 1, 60, 48, 12, aSpeed, 12, true);
    this.animation["SE"] = new Animation(img, 0, 2, 60, 48, 12, aSpeed, 12, true);
    this.animation["SW"] = new Animation(img, 0, 3, 60, 48, 12, aSpeed, 12, true);
    this.currAnimation = this.animation["NE"];
}

mCartMan.prototype = Object.create(Walker4.prototype);
mCartMan.prototype.constructor = mCartMan;

function pCartMan(game, img, Ai, lX, lY) {
    Walker4.call(this, game, img, Ai, lX, lY);
    this.animation["NE"] = new Animation(img, 0, 0, 60, 48, 12, aSpeed, 12, true);
    this.animation["NW"] = new Animation(img, 0, 1, 60, 48, 12, aSpeed, 12, true);
    this.animation["SE"] = new Animation(img, 0, 2, 60, 48, 12, aSpeed, 12, true);
    this.animation["SW"] = new Animation(img, 0, 3, 60, 48, 12, aSpeed, 12, true);
    this.currAnimation = this.animation["NE"];
}

pCartMan.prototype = Object.create(Walker4.prototype);
pCartMan.prototype.constructor = pCartMan;


function Walker8(game, img, Ai, lX, lY) {
    this.animation["N"] = null;
    this.animationS["S"] = null;
    this.animationE["E"] = null;
    this.animationW["W"] = null;
}

Walker8.prototype = Object.create(Walker4.prototype);
Walker8.prototype.constructor = Walker8;

Walker8.prototype.update = function ()  {
    //TODO Generalized Updating
    Walker4.prototype.update.call(this);
}

Walker8.prototype.draw = function () {
    Walker4.prototype.draw.call(this);
}

 function farmer(game, img, Ai, lX, lY) {
  Walker4.call(this, game, img, Ai, lX, lY);
     this.animation = new Animation(img, 0, 4, 43, 45, 12, aSpeed, 12, true);
 }
 
 farmer.prototype = Object.create(Walker4.prototype);
 farmer.prototype.constructor = farmer;
// 
// function fireMan(game, img, Ai, lX, lY) {
//  Walker4.call(this, game, img, Ai, lX, lY);
//     this.animation = new Animation(img, 0, 0, 46, 40, 12, aSpeed, 12, true);
// }
// 
// fireMan.prototype = Object.create(Walker4.prototype);
// fireMan.prototype.constructor = fireMan;

// function emigrant(game, img, Ai, lX, lY) {
//  Walker4.call(this, game, img, Ai, lX, lY);
//     this.animation = new Animation(img, 0, 2, 25, 26, 12, aSpeed, 12, true);
// }
// 
// emigrant.prototype = Object.create(Walker4.prototype);
// emigrant.prototype.constructor = emigrant


