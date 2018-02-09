
var speed = 2.5;
var aSpeed = .06;
//TODO: Farmer logic, Fireman/Hunter Logic. Fix rendering of sprite 
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function Walker4(game, img, Ai, lX, lY) {
    this.easyStar = Ai;
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
    this.loadCount = 0;
    Entity.call(this, game, lX, lY);
}

Walker4.prototype = new Entity();
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
        this.isFindingPath = true;
        that = this;
        easyStar.findPath(this.x, this.y, this.destX, this.destY, function (path) {
            if (path === null) {
                console.log("No path :(");
            } else {
                console.log("Path! The first Point is " + path[0].x + " " + path[0].y);
                that.path = path;
                that.next = that.path.shift();
                that.isWalking = true;
            }
        });
        this.destX = null;
        this.destY = null;
        this.isFindingPath = false;
        easyStar.calculate();
    }
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

function eCartMan(game, img, Ai, lX, lY) {
    Walker4.call(this, game, img, Ai, lX, lY);
    this.animation["NE"] = new Animation(img, 0, 0, 60, 48, 12, aSpeed, 12, true);
    this.animation["NW"] = new Animation(img, 0, 1, 60, 48, 12, aSpeed, 12, true);
    this.animation["SE"] = new Animation(img, 0, 2, 60, 48, 12, aSpeed, 12, true);
    this.animation["SW"] = new Animation(img, 0, 3, 60, 48, 12, aSpeed, 12, true);
    this.currAnimation = this.animation["NE"];
}

eCartMan.prototype = new Walker4();
eCartMan.prototype.constructor = eCartMan;

function barCartMan(game, img, Ai, lX, lY) {
    Walker4.call(this, game, img, Ai, lX, lY);
    this.animation["NE"] = new Animation(img, 0, 0, 60, 60, 12, aSpeed, 12, true);
    this.animation["NW"] = new Animation(img, 0, 1, 60, 60, 12, aSpeed, 12, true);
    this.animation["SE"] = new Animation(img, 0, 2, 60, 60, 12, aSpeed, 12, true);
    this.animation["SW"] = new Animation(img, 0, 3, 60, 60, 12, aSpeed, 12, true);
    this.currAnimation = this.animation["NE"];

}

barCartMan.prototype = new Walker4();
barCartMan.prototype.constructor = barCartMan;

function beCartMan(game, img, Ai, lX, lY) {
    Walker4.call(this, game, img, Ai, lX, lY);
    this.animation["NE"] = new Animation(img, 0, 0, 60, 60, 12, aSpeed, 12, true);
    this.animation["NW"] = new Animation(img, 0, 1, 60, 60, 12, aSpeed, 12, true);
    this.animation["SE"] = new Animation(img, 0, 2, 60, 60, 12, aSpeed, 12, true);
    this.animation["SW"] = new Animation(img, 0, 3, 60, 60, 12, aSpeed, 12, true);
    this.currAnimation = this.animation["NE"];
}

beCartMan.prototype = new Walker4();
beCartMan.prototype.constructor = beCartMan;

function cCartMan(game, img, Ai, lX, lY) {
    Walker4.call(this, game, img, Ai, lX, lY);
    this.animation["NE"] = new Animation(img, 0, 0, 60, 48, 12, aSpeed, 12, true);
    this.animation["NW"] = new Animation(img, 0, 1, 60, 48, 12, aSpeed, 12, true);
    this.animation["SE"] = new Animation(img, 0, 2, 60, 48, 12, aSpeed, 12, true);
    this.animation["SW"] = new Animation(img, 0, 3, 60, 48, 12, aSpeed, 12, true);
    this.currAnimation = this.animation["NE"];
}

cCartMan.prototype = new Walker4();
cCartMan.prototype.constructor = cCartMan;

function fCartMan(game, img, Ai, lX, lY) {
    Walker4.call(this, game, img, Ai, lX, lY);
    this.animation["NE"] = new Animation(img, 0, 0, 60, 48, 12, aSpeed, 12, true);
    this.animation["NW"] = new Animation(img, 0, 1, 60, 48, 12, aSpeed, 12, true);
    this.animation["SE"] = new Animation(img, 0, 2, 60, 48, 12, aSpeed, 12, true);
    this.animation["SW"] = new Animation(img, 0, 3, 60, 48, 12, aSpeed, 12, true);
    this.currAnimation = this.animation["NE"];
}

fCartMan.prototype = new Walker4();
fCartMan.prototype.constructor = fCartMan;

function glCartMan(game, img, Ai, lX, lY) {
    Walker4.call(this, game, img, Ai, lX, lY);
    this.animation["NE"] = new Animation(img, 0, 0, 60, 48, 12, aSpeed, 12, true);
    this.animation["NW"] = new Animation(img, 0, 1, 60, 48, 12, aSpeed, 12, true);
    this.animation["SE"] = new Animation(img, 0, 2, 60, 48, 12, aSpeed, 12, true);
    this.animation["SW"] = new Animation(img, 0, 3, 60, 48, 12, aSpeed, 12, true);
    this.currAnimation = this.animation["NE"];
}

glCartMan.prototype = new Walker4();
glCartMan.prototype.constructor = glCartMan;

function grCartMan(game, img, Ai, lX, lY) {
    Walker4.call(this, game, img, Ai, lX, lY);
    this.animation["NE"] = new Animation(img, 0, 0, 60, 48, 12, aSpeed, 12, true);
    this.animation["NW"] = new Animation(img, 0, 1, 60, 48, 12, aSpeed, 12, true);
    this.animation["SE"] = new Animation(img, 0, 2, 60, 48, 12, aSpeed, 12, true);
    this.animation["SW"] = new Animation(img, 0, 3, 60, 48, 12, aSpeed, 12, true);
    this.currAnimation = this.animation["NE"];
}

grCartMan.prototype = new Walker4();
grCartMan.prototype.constructor = grCartMan;

function lCartMan(game, img, Ai, lX, lY) {
    Walker4.call(this, game, img, Ai, lX, lY);
    this.animation["NE"] = new Animation(img, 0, 0, 60, 48, 12, aSpeed, 12, true);
    this.animation["NW"] = new Animation(img, 0, 1, 60, 48, 12, aSpeed, 12, true);
    this.animation["SE"] = new Animation(img, 0, 2, 60, 48, 12, aSpeed, 12, true);
    this.animation["SW"] = new Animation(img, 0, 3, 60, 48, 12, aSpeed, 12, true);
    this.currAnimation = this.animation["NE"];
}

lCartMan.prototype = new Walker4();
lCartMan.prototype.constructor = lCartMan;

function mCartMan(game, img, Ai, lX, lY) {
    Walker4.call(this, game, img, Ai, lX, lY);
    this.animation["NE"] = new Animation(img, 0, 0, 60, 48, 12, aSpeed, 12, true);
    this.animation["NW"] = new Animation(img, 0, 1, 60, 48, 12, aSpeed, 12, true);
    this.animation["SE"] = new Animation(img, 0, 2, 60, 48, 12, aSpeed, 12, true);
    this.animation["SW"] = new Animation(img, 0, 3, 60, 48, 12, aSpeed, 12, true);
    this.currAnimation = this.animation["NE"];
}

mCartMan.prototype = new Walker4();
mCartMan.prototype.constructor = mCartMan;

function pCartMan(game, img, Ai, lX, lY) {
    Walker4.call(this, game, img, Ai, lX, lY);
    this.animation["NE"] = new Animation(img, 0, 0, 60, 48, 12, aSpeed, 12, true);
    this.animation["NW"] = new Animation(img, 0, 1, 60, 48, 12, aSpeed, 12, true);
    this.animation["SE"] = new Animation(img, 0, 2, 60, 48, 12, aSpeed, 12, true);
    this.animation["SW"] = new Animation(img, 0, 3, 60, 48, 12, aSpeed, 12, true);
    this.currAnimation = this.animation["NE"];
}

pCartMan.prototype = new Walker4();
pCartMan.prototype.constructor = pCartMan;

//End 4Walkers

//function Walker8(game, imgNE, imgNW, imgSE, imgSW, imgD, imgN, imgS, imgE, imgW, lX, lY) {
//    Walker4.call(game, imgNE, imgNW, imgSE, imSW, imgD, lX, lY);
//    this.animationN = imgN;
//    this.animationS = imgS;
//    this.animationE = imgE;
//    this.animationW = imgW;
//}

//Walker8.prototype = new Walker4();
//Walker8.prototype.constructor = Walker8;

//Walker8.prototype.update = function () {
//    //TODO Generalized Updating
//    Walker4.prototype.update.call(this);
//}

//Walker8.prototype.draw = function () {
//    //TODO Generalized Drawing
//    Walker4.prototype.draw.call(this);
//}

// function farmer(game, img, Ai, lX, lY) {
//  Walker4.call(this, game, img, Ai, lX, lY);
//     this.animation = new Animation(img, 0, 4, 43, 45, 12, aSpeed, 12, true);
// }
// 
// farmer.prototype = new Walker4();
// farmer.prototype.constructor = farmer;
// 
// function fireMan(game, img, Ai, lX, lY) {
//  Walker4.call(this, game, img, Ai, lX, lY);
//     this.animation = new Animation(img, 0, 0, 46, 40, 12, aSpeed, 12, true);
// }
// 
// fireMan.prototype = new Walker4();
// fireMan.prototype.constructor = fireMan;

// function emigrant(game, img, Ai, lX, lY) {
//  Walker4.call(this, game, img, Ai, lX, lY);
//     this.animation = new Animation(img, 0, 2, 25, 26, 12, aSpeed, 12, true);
// }
// 
// emigrant.prototype = new Walker4();
// emigrant.prototype.constructor = emigrant


