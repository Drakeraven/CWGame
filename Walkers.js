
var speed = 50;
var aSpeed = .05;

function Walker4(game, img, lX, lY) {
    this.sY = lY;
    this.animation = null;
    this.img = img;
    this.ping = false; //TODO probably get rid of later 
    Entity.call(this, game, lX, lY);
}

Walker4.prototype = new Entity();
Walker4.prototype.constructor = Walker4;

Walker4.prototype.update = function () {
    if (this.y < 470 || this.ping) {
        this.ping = true;
        this.x -= this.game.clockTick * speed;
        this.y += this.game.clockTick * speed;
        this.animation.startY = 3 * this.animation.frameHeight;
    }
    if (this.x < 0 || this.y === 0) {
        this.ping = false;
        this.animation.startY = 0 * this.animation.frameHeight;

    }
    if (!this.ping) {
        this.x += this.game.clockTick * speed;
        this.y -= this.game.clockTick * speed;

    }
    Entity.prototype.update.call(this);
}

Walker4.prototype.draw = function (ctx) {
    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

//Cart Walkers 

function eCartMan(game, img, lX, lY) {
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

