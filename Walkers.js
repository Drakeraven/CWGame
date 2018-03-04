/*Requirements for initiating a walker:
Initiate the right kind of walker, give him a load count (amt he carries)
Set his starting point on a VALID TILE
set his destX and destY for a building of your choice.
*/
const speed = 2.5;
const aSpeed = .06;
//TODO:Fix rendering of sprite
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function Walker4(game, img, map, lX, lY, bRef) {
    this.bRef = bRef;
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
    this.loadCount = 0; // how much of a load the walker is carrying
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
    if (this.isFindingPath) return;
    if (this.isWalking) this.walkPath();
    if (this.destX != null && this.destY != null) {
        this.isFindingPath = true;
        let that = this;
        this.easyStar.findPath(Math.floor(this.x), Math.floor(this.y), this.destX, this.destY, function (path) {
            that.isFindingPath = false;
            that.destX = null;
            that.destY = null;
            if (path === null) {
                //console.log("No path :("); 
            } else {
                //console.log("Path! The first Point is " + path[0].x + " " + path[0].y);
                that.path = path;
                that.next = that.path.shift();
                that.isWalking = true;
            }
        });
        this.easyStar.calculate();
    }

    Entity.prototype.update.call(this);
}

Walker4.prototype.walkPath = function () {
    arriv = Math.floor(this.x) == this.next.x && Math.floor(this.y) == this.next.y;

    if (this.path.length == 0 && !arriv) {
        this.dX = setDirection(Math.floor(this.x), this.next.x);
        this.dY = setDirection(Math.floor(this.y), this.next.y);
        this.currAnimation = this.animation[setFace(this.dX, this.dY)];
    } else if (this.path.length == 0 && arriv) {
        this.dX = 0;
        this.dY = 0;
        this.isWalking = false;
        return;
    } else if (arriv) {
        this.next = this.path.shift();
        this.dX = setDirection(Math.floor(this.x), this.next.x);
        this.dY = setDirection(Math.floor(this.y), this.next.y);
        this.currAnimation = this.animation[setFace(this.dX, this.dY)];
    }
    this.x += this.dX * this.game.clockTick * speed;
    this.y += this.dY * this.game.clockTick * speed;
}

Walker4.prototype.draw = function (ctx) {
    pt1 = this.game.twodtoisoX(this.x, this.y) + 27 - this.currAnimation.frameWidth / 2;
    pt2 = this.game.twodtoisoY(this.x, this.y) + 10 - this.currAnimation.frameHeight / 2;
    //ctx.fillRect(pt1, pt2, 5, 5);
    this.currAnimation.drawFrame(this.game.clockTick, ctx, pt1, pt2);
    Entity.prototype.draw.call(this);
}

//Cart Walkers

function eCartMan(game, img, map, lX, lY, bRef)   {
    Walker4.call(this, game, img, map, lX, lY, bRef);
    this.animation["NE"] = new Animation(img, 0, 0, 60, 48, 12, aSpeed, 12, true);
    this.animation["NW"] = new Animation(img, 0, 1, 60, 48, 12, aSpeed, 12, true);
    this.animation["SE"] = new Animation(img, 0, 2, 60, 48, 12, aSpeed, 12, true);
    this.animation["SW"] = new Animation(img, 0, 3, 60, 48, 12, aSpeed, 12, true);
    this.currAnimation = this.animation["NE"];
    this.loadType = "empty";
}

eCartMan.prototype = Object.create(Walker4.prototype);
eCartMan.prototype.constructor = eCartMan;

function barCartMan(game, img, map, lX, lY, bRef)  {
    Walker4.call(this, game, img, map, lX, lY, bRef);
    this.animation["NE"] = new Animation(img, 0, 0, 60, 60, 12, aSpeed, 12, true);
    this.animation["NW"] = new Animation(img, 0, 1, 60, 60, 12, aSpeed, 12, true);
    this.animation["SE"] = new Animation(img, 0, 2, 60, 60, 12, aSpeed, 12, true);
    this.animation["SW"] = new Animation(img, 0, 3, 60, 60, 12, aSpeed, 12, true);
    this.currAnimation = this.animation["NE"];
    this.loadType = "barley";

}

barCartMan.prototype = Object.create(Walker4.prototype);
barCartMan.prototype.constructor = barCartMan;

function beCartMan(game, img, map, lX, lY, bRef) {
    Walker4.call(this, game, img, map, lX, lY, bRef);
    this.animation["NE"] = new Animation(img, 0, 0, 60, 60, 12, aSpeed, 12, true);
    this.animation["NW"] = new Animation(img, 0, 1, 60, 60, 12, aSpeed, 12, true);
    this.animation["SE"] = new Animation(img, 0, 2, 60, 60, 12, aSpeed, 12, true);
    this.animation["SW"] = new Animation(img, 0, 3, 60, 60, 12, aSpeed, 12, true);
    this.currAnimation = this.animation["NE"];
    this.loadType = "beer";
}

beCartMan.prototype = Object.create(Walker4.prototype);
beCartMan.prototype.constructor = beCartMan;

function cCartMan(game, img, map, lX, lY, bRef)  {
    Walker4.call(this, game, img, map, lX, lY, bRef);
    this.animation["NE"] = new Animation(img, 0, 0, 60, 48, 12, aSpeed, 12, true);
    this.animation["NW"] = new Animation(img, 0, 1, 60, 48, 12, aSpeed, 12, true);
    this.animation["SE"] = new Animation(img, 0, 2, 60, 48, 12, aSpeed, 12, true);
    this.animation["SW"] = new Animation(img, 0, 3, 60, 48, 12, aSpeed, 12, true);
    this.currAnimation = this.animation["NE"];
    this.loadType = "clay";
}

cCartMan.prototype = Object.create(Walker4.prototype);
cCartMan.prototype.constructor = cCartMan;

function fCartMan(game, img, map, lX, lY, bRef)  {
    Walker4.call(this, game, img, map, lX, lY, bRef);
    this.animation["NE"] = new Animation(img, 0, 0, 60, 48, 12, aSpeed, 12, true);
    this.animation["NW"] = new Animation(img, 0, 1, 60, 48, 12, aSpeed, 12, true);
    this.animation["SE"] = new Animation(img, 0, 2, 60, 48, 12, aSpeed, 12, true);
    this.animation["SW"] = new Animation(img, 0, 3, 60, 48, 12, aSpeed, 12, true);
    this.currAnimation = this.animation["NE"];
    this.loadType = "flax";
}

fCartMan.prototype = Object.create(Walker4.prototype);
fCartMan.prototype.constructor = fCartMan;

function glCartMan(game, img, map, lX, lY, bRef)  {
    Walker4.call(this, game, img, map, lX, lY, bRef);
    this.animation["NE"] = new Animation(img, 0, 0, 60, 48, 12, aSpeed, 12, true);
    this.animation["NW"] = new Animation(img, 0, 1, 60, 48, 12, aSpeed, 12, true);
    this.animation["SE"] = new Animation(img, 0, 2, 60, 48, 12, aSpeed, 12, true);
    this.animation["SW"] = new Animation(img, 0, 3, 60, 48, 12, aSpeed, 12, true);
    this.currAnimation = this.animation["NE"];
    this.loadType = "gold";
}

glCartMan.prototype = Object.create(Walker4.prototype);
glCartMan.prototype.constructor = glCartMan;

function grCartMan(game, img, map, lX, lY, bRef)  {
    Walker4.call(this, game, img, map, lX, lY, bRef);
    this.animation["NE"] = new Animation(img, 0, 0, 60, 48, 12, aSpeed, 12, true);
    this.animation["NW"] = new Animation(img, 0, 1, 60, 48, 12, aSpeed, 12, true);
    this.animation["SE"] = new Animation(img, 0, 2, 60, 48, 12, aSpeed, 12, true);
    this.animation["SW"] = new Animation(img, 0, 3, 60, 48, 12, aSpeed, 12, true);
    this.currAnimation = this.animation["NE"];
    this.loadType = "grain";
}

grCartMan.prototype = Object.create(Walker4.prototype);
grCartMan.prototype.constructor = grCartMan;

function lCartMan(game, img, map, lX, lY, bRef)  {
    Walker4.call(this, game, img, map, lX, lY, bRef);
    this.animation["NE"] = new Animation(img, 0, 0, 60, 48, 12, aSpeed, 12, true);
    this.animation["NW"] = new Animation(img, 0, 1, 60, 48, 12, aSpeed, 12, true);
    this.animation["SE"] = new Animation(img, 0, 2, 60, 48, 12, aSpeed, 12, true);
    this.animation["SW"] = new Animation(img, 0, 3, 60, 48, 12, aSpeed, 12, true);
    this.currAnimation = this.animation["NE"];
    this.loadType = "linen";
}

lCartMan.prototype = Object.create(Walker4.prototype);
lCartMan.prototype.constructor = lCartMan;

function mCartMan(game, img, map, lX, lY, bRef)  {
    Walker4.call(this, game, img, map, lX, lY, bRef);
    this.animation["NE"] = new Animation(img, 0, 0, 60, 48, 12, aSpeed, 12, true);
    this.animation["NW"] = new Animation(img, 0, 1, 60, 48, 12, aSpeed, 12, true);
    this.animation["SE"] = new Animation(img, 0, 2, 60, 48, 12, aSpeed, 12, true);
    this.animation["SW"] = new Animation(img, 0, 3, 60, 48, 12, aSpeed, 12, true);
    this.currAnimation = this.animation["NE"];
    this.loadType = "meat";
}

mCartMan.prototype = Object.create(Walker4.prototype);
mCartMan.prototype.constructor = mCartMan;

function pCartMan(game, img, map, lX, lY, bRef)  {
    Walker4.call(this, game, img, map, lX, lY, bRef);
    this.animation["NE"] = new Animation(img, 0, 0, 60, 48, 12, aSpeed, 12, true);
    this.animation["NW"] = new Animation(img, 0, 1, 60, 48, 12, aSpeed, 12, true);
    this.animation["SE"] = new Animation(img, 0, 2, 60, 48, 12, aSpeed, 12, true);
    this.animation["SW"] = new Animation(img, 0, 3, 60, 48, 12, aSpeed, 12, true);
    this.currAnimation = this.animation["NE"];
    this.loadType = "pottery";
}

pCartMan.prototype = Object.create(Walker4.prototype);
pCartMan.prototype.constructor = pCartMan;

//bazaar lady's load count accounts for how much of the item she's bought
function bazLad(game, img, map, lX, lY, funds, buying, bRef, hRef)  {
    Walker4.call(this, game, img, map, lX, lY, bRef);
    this.animation["NE"] = new Animation(img, 0, 0, 22, 42, 12, aSpeed, 12, true);
    this.animation["NW"] = new Animation(img, 0, 2, 22, 42, 12, aSpeed, 12, true);
    this.animation["SE"] = new Animation(img, 0, 1, 22, 42, 12, aSpeed, 12, true);
    this.animation["SW"] = new Animation(img, 0, 3, 22, 42, 12, aSpeed, 12, true);
    this.currAnimation = this.animation["NE"];
    this.funds = funds;
    this.loadType = buying;
    this.hRef = hRef;
    this.startX = lX;
    this.startY = lY;
}

bazLad.prototype = Object.create(Walker4.prototype);
bazLad.prototype.constructor = bazLad;

bazLad.prototype.update = function () {
    Walker4.prototype.update.apply(this);

}

function Walker8(game, img, map, lX, lY, bRef) {
    Walker4.call(this, game, img, map, lX, lY, bRef);
    this.animation["N"] = null;
    this.animation["S"] = null;
    this.animation["E"] = null;
    this.animation["W"] = null;
    this.easyStar.enableDiagonals();
    this.easyStar.setAcceptableTiles([0, 1]);
}

Walker8.prototype = Object.create(Walker4.prototype);
Walker8.prototype.constructor = Walker8;

function FireMan(game, img1, img2, map, lX, lY, bRef) {
    Walker8.call(this, game, img1, map, lX, lY, bRef);
    this.animation["N"] =  new Animation(img1, 0, 0, 54, 47, 12, aSpeed, 12, true);
    this.animation["NE"] = new Animation(img1, 0, 1, 54, 47, 12, aSpeed, 12, true);
    this.animation["E"] =  new Animation(img1, 0, 2, 54, 47, 12, aSpeed, 12, true);
    this.animation["SE"] = new Animation(img1, 0, 3, 54, 47, 12, aSpeed, 12, true);
    this.animation["S"] =  new Animation(img1, 0, 4, 54, 47, 12, aSpeed, 12, true);
    this.animation["SW"] = new Animation(img1, 0, 5, 54, 47, 12, aSpeed, 12, true);
    this.animation["W"] =  new Animation(img1, 0, 6, 54, 47, 12, aSpeed, 12, true);
    this.animation["NW"] = new Animation(img1, 0, 7, 54, 47, 12, aSpeed, 12, true);
    this.fireAnim = new Animation(img2, 0, 3, 53, 52, 37, aSpeed, 37, true);
    this.currAnimation = this.animation['NE'];
    this.fireOutTime = 0;
}
FireMan.prototype = Object.create(Walker8.prototype);
FireMan.prototype.constructor = FireMan;

FireMan.prototype.update = function () {
    Walker8.prototype.update.apply(this);
    if (this.path == 0) {
        this.currAnimation = this.fireAnim;
        this.fireOutTime++;
        if (this.fireOutTime > 500) {
            this.removeFromWorld = true;
        }
    }
}

function Hunter(game, img1, img2, map, lX, lY, bRef) {
    Walker8.call(this, game, img1, map, lX, lY, bRef);
    this.animation["N"] =  new Animation(img1, 0, 0, 37, 36, 12, aSpeed, 12, true);
    this.animation["NE"] = new Animation(img1, 0, 1, 37, 36, 12, aSpeed, 12, true);
    this.animation["E"] =  new Animation(img1, 0, 2, 37, 36, 12, aSpeed, 12, true);
    this.animation["SE"] = new Animation(img1, 0, 3, 37, 36, 12, aSpeed, 12, true);
    this.animation["S"] =  new Animation(img1, 0, 4, 37, 36, 12, aSpeed, 12, true);
    this.animation["SW"] = new Animation(img1, 0, 5, 37, 36, 12, aSpeed, 12, true);
    this.animation["W"] =  new Animation(img1, 0, 6, 37, 36, 12, aSpeed, 12, true);
    this.animation["NW"] = new Animation(img1, 0, 7, 37, 36, 12, aSpeed, 12, true);
    this.huntAnim = [];
    this.huntAnim["N"] =  new Animation(img2, 0, 1, 45, 38, 12, aSpeed, 12, true);
    this.huntAnim["NE"] = new Animation(img2, 0, 2, 45, 38, 12, aSpeed, 12, true);
    this.huntAnim["E"] =  new Animation(img2, 0, 3, 45, 38, 12, aSpeed, 12, true);
    this.huntAnim["SE"] = new Animation(img2, 0, 4, 45, 38, 12, aSpeed, 12, true);
    this.huntAnim["S"] =  new Animation(img2, 0, 5, 45, 38, 12, aSpeed, 12, true);
    this.huntAnim["SW"] = new Animation(img2, 0, 6, 45, 38, 12, aSpeed, 12, true);
    this.huntAnim["W"] =  new Animation(img2, 0, 7, 45, 38, 12, aSpeed, 12, true);
    this.huntAnim["NW"] = new Animation(img2, 0, 8, 45, 38, 12, aSpeed, 12, true);
    this.currAnimation = this.animation['NE'];
    this.startX = lX;
    this.startY = lY;
    this.huntTime = 0;
    this.hunted = false;
}

Hunter.prototype = Object.create(Walker8.prototype);
Hunter.prototype.constructor = Hunter;

Hunter.prototype.update = function () {
    Walker8.prototype.update.apply(this);
    if (this.dX == 0 && this.dY == 0 && !this.hunted) {
        this.currAnimation.loop = false;
        this.huntTime++;
    }
    if (this.huntTime > 300) {
        this.hunted = true;
        this.currAnimation.loop = true;
        //this.destX = this.startX;
        //this.destY = this.startY;
        if (this.bRef.roadTiles.length > 0) {
            this.destX = this.bRef.roadTiles[0][1];
            this.destY = this.bRef.roadTiles[0][0];
        } else {
            this.removeFromWorld = true;
        }
        this.huntTime = 0;
    }

    if (this.hunted) {
        this.currAnimation = this.huntAnim[setFace(this.dX, this.dY)];
    }

}

 function Migrant(game, img, map, lX, lY, bRef) {
     Walker8.call(this, game, img, map, lX, lY, bRef);
     this.animation["N"] =  new Animation(img, 0, 0, 48.8, 48, 12, aSpeed, 12, true);
     this.animation["NE"] = new Animation(img, 0, 1, 48.8, 48, 12, aSpeed, 12, true);
     this.animation["E"] =  new Animation(img, 0, 2, 48.8, 48, 12, aSpeed, 12, true);
     this.animation["SE"] = new Animation(img, 0, 3, 48.8, 48, 12, aSpeed, 12, true);
     this.animation["S"] =  new Animation(img, 0, 4, 48.8, 48, 12, aSpeed, 12, true);
     this.animation["SW"] = new Animation(img, 0, 5, 48.8, 48, 12, aSpeed, 12, true);
     this.animation["W"] =  new Animation(img, 0, 6, 48.8, 48, 12, aSpeed, 12, true);
     this.animation["NW"] = new Animation(img, 0, 7, 48.8, 48, 12, aSpeed, 12, true);
     this.currAnimation = this.animation['NE'];

 }

 Migrant.prototype = Object.create(Walker8.prototype);
 Migrant.prototype.constructor = Migrant;
