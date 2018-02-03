
var speed = 2.5;
var aSpeed = .06;


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function Walker4(game, img, lX, lY) {
    this.dX = 0;
    this.dY = -1;
    this.animation = null;
    this.img = img;
    this.ping = false; //TODO probably get rid of later 
    Entity.call(this, game, lX, lY);
}

Walker4.prototype = new Entity();
Walker4.prototype.constructor = Walker4;

Walker4.prototype.update = function () {
        /*For mindless walkers:
        if a walker can continue forward, do so
        if he can't continue forward, randomly pick to go left or right
        if he can't go left OR right, double back on himself
        Calculate new facing direction animation
        move piece forward
    */
    surround = getNeighbors(Math.floor(this.y), Math.floor(this.x), this.game);
    //console.log(surround);
    //console.log(Math.floor(this.y), Math.floor(this.x));
    //console.log(getTileInfo(Math.floor(this.y), Math.floor(this.x), this.game));
    if (forward(this.dX, this.dY, surround)) {
        console.log("forward");
    } else {
        if (left(this.dX, this.dY, surround)) {
            picked = "left";
            nX = setDX(this.dX, this.dY, picked);
            nY = setDY(this.dX, this.dY, picked);
            this.dX = nX;
            this.dY = nY;
       } else if (right(this.dX, this.dY, surround)) {
            picked = "right";
               nX = setDX(this.dX, this.dY, picked);
                nY = setDY(this.dX, this.dY, picked);
                this.dX = nX;
                this.dY = nY;
        } else {
            this.dX = 0;
            this.dY = 0;
        }
    }

    this.x += (this.dX * this.game.clockTick * speed);
    this.y += (this.dY * this.game.clockTick *  speed);

    

    
    
    /*For Destination Walkers:
        Have a data structure of your viable destination buildings
        check if you meet requirements to embark for each building
        calculate shortest path with level data
        walk path to destination
        depending on goal, update your animation (eg. cart boi taking what)
        Calculate shortest path to return
        return, update data as needed.*/
    Entity.prototype.update.call(this);
}

Walker4.prototype.draw = function (ctx) {
    pt1 = twodtoisoX(this.x, this.y);
    pt2 = twodtoisoY(this.x, this.y);
    //console.log(pt1, pt2);
    this.animation.drawFrame(this.game.clockTick, ctx, pt1 + this.xOffset, pt2 + this.yOffset);
    Entity.prototype.draw.call(this);
}

//Cart Walkers 

function eCartMan(game, img, lX, lY) {
    this.xOffset = 0;
    this.yOffset = -15;
    Walker4.call(this, game, img, lX, lY);
    this.animation = new Animation(img, 0, 0, 60, 48, 12, aSpeed, 12, true);
}

eCartMan.prototype = new Walker4();
eCartMan.prototype.constructor = eCartMan;

function barCartMan(game, img, lX, lY) {
    Walker4.call(this, game, img, lX, lY);
    this.animation = new Animation(img, 0, 0, 60, 60, 12, aSpeed, 12, true);
}

barCartMan.prototype = new Walker4();
barCartMan.prototype.constructor = barCartMan;

function beCartMan(game, img, lX, lY) {
    Walker4.call(this, game, img, lX, lY);
    this.animation = new Animation(img, 0, 0, 60, 60, 12, aSpeed, 12, true);
}

beCartMan.prototype = new Walker4();
beCartMan.prototype.constructor = beCartMan;

function cCartMan(game, img, lX, lY) {
    Walker4.call(this, game, img, lX, lY);
    this.animation = new Animation(img, 0, 0, 60, 48, 12, aSpeed, 12, true);
}

cCartMan.prototype = new Walker4();
cCartMan.prototype.constructor = cCartMan;

function fCartMan(game, img, lX, lY) {
    Walker4.call(this, game, img, lX, lY);
    this.animation = new Animation(img, 0, 0, 60, 48, 12, aSpeed, 12, true);
}

fCartMan.prototype = new Walker4();
fCartMan.prototype.constructor = fCartMan;

function glCartMan(game, img, lX, lY) {
    Walker4.call(this, game, img, lX, lY);
    this.animation = new Animation(img, 0, 0, 60, 48, 12, aSpeed, 12, true);
}

glCartMan.prototype = new Walker4();
glCartMan.prototype.constructor = glCartMan;

function grCartMan(game, img, lX, lY) {
    Walker4.call(this, game, img, lX, lY);
    this.animation = new Animation(img, 0, 0, 60, 48, 12, aSpeed, 12, true);
}

grCartMan.prototype = new Walker4();
grCartMan.prototype.constructor = grCartMan;

function lCartMan(game, img, lX, lY) {
    Walker4.call(this, game, img, lX, lY);
    this.animation = new Animation(img, 0, 0, 60, 48, 12, aSpeed, 12, true);
}

lCartMan.prototype = new Walker4();
lCartMan.prototype.constructor = lCartMan;

function mCartMan(game, img, lX, lY) {
    Walker4.call(this, game, img, lX, lY);
    this.animation = new Animation(img, 0, 0, 60, 48, 12, aSpeed, 12, true);
}

mCartMan.prototype = new Walker4();
mCartMan.prototype.constructor = mCartMan;

function pCartMan(game, img, lX, lY) {
    Walker4.call(this, game, img, lX, lY);
    this.animation = new Animation(img, 0, 0, 60, 48, 12, aSpeed, 12, true);
}

pCartMan.prototype = new Walker4();
pCartMan.prototype.constructor = pCartMan;

function watahMan(game, img, lX, lY) {
    Walker4.call(this, game, img, lX, lY);
    this.animation = new Animation(img, 0, 0, 48, 46, 12, aSpeed, 12, true);
}

watahMan.prototype = new Walker4();
watahMan.prototype.constructor = watahMan;

//End of Cart Walkers

//function architect(game, img, lX, lY) {
//     Walker4.call(this, game, img, lX, lY);
//     this.animation = new Animation(img, 0, 1, 32, 38, 12, aSpeed, 12, true);
// }
// 
// architect.prototype = new Walker4();
// architect.prototype.constructor = architect;
// 
// function cop(game, img, lX, lY) {
//     Walker4.call(this, game, img, lX, lY);
//     this.animation = new Animation(img, 0, 14, 21, 34, 12, aSpeed, 12, true);
// }
// 
// cop.prototype = new Walker4();
// cop.prototype.constructor = cop;
// 
// function farmer(game, img, lX, lY) {
//     Walker4.call(this, game, img, lX, lY);
//     this.animation = new Animation(img, 0, 4, 43, 45, 12, aSpeed, 12, true);
// }
// 
// farmer.prototype = new Walker4();
// farmer.prototype.constructor = farmer;
// 
// function fireMan(game, img, lX, lY) {
//     Walker4.call(this, game, img, lX, lY);
//     this.animation = new Animation(img, 0, 0, 46, 40, 12, aSpeed, 12, true);
// }
// 
// fireMan.prototype = new Walker4();
// fireMan.prototype.constructor = fireMan;
// 
// function gazelle(game, img, lX, lY) {
//     Walker4.call(this, game, img, lX, lY);
//     this.animation = new Animation(img, 0, 2, 45, 48, 60, aSpeed, 60, true);
// }
// 
// gazelle.prototype = new Walker4();
// gazelle.prototype.constructor = gazelle
// 
// function emigrant(game, img, lX, lY) {
//     Walker4.call(this, game, img, lX, lY);
//     this.animation = new Animation(img, 0, 2, 25, 26, 12, aSpeed, 12, true);
// }
// 
// emigrant.prototype = new Walker4();
// emigrant.prototype.constructor = emigrant
// 
// function taxMan(game, img, lX, lY) {
//     Walker4.call(this, game, img, lX, lY);
//     this.animation = new Animation(img, 0, 2, 41, 38, 12, aSpeed, 12, true);
// }
// 
// taxMan.prototype = new Walker4();
// taxMan.prototype.constructor = taxMan

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

