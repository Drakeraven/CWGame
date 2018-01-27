function Weaver(game, img) {
    this.animation = new Animation(img, 0, 1, 118, 100, 6, .15, 12, true);
    Entity.call(this, game, 0, 0);

}

Weaver.prototype = new Entity();
Weaver.prototype.constructor = Weaver;

Weaver.prototype.update = function () {
    Entity.prototype.update.call(this);
}

Weaver.prototype.draw = function (ctx) {
    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}


function ArchBuild(game, img) {
    this.animation = new Animation(img, 0, 1, 58, 102, 6, .15, 12, true);
    Entity.call(this, game, 150, 0);

}

ArchBuild.prototype = new Entity();
ArchBuild.prototype.constructor = ArchBuild;

ArchBuild.prototype.update = function () {
    Entity.prototype.update.call(this);
}

ArchBuild.prototype.draw = function (ctx) {
    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

function Bazaar(game, img) {
    this.animation = new Animation(img, 0, 1, 118, 82, 4, .15, 12, true);
    Entity.call(this, game, 250, 0);

}

Bazaar.prototype = new Entity();
Bazaar.prototype.constructor = Bazaar;

Bazaar.prototype.update = function () {
    Entity.prototype.update.call(this);
}

Bazaar.prototype.draw = function (ctx) {
    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

function CopStore(game, img) {
    this.animation = new Animation(img, 0, 1, 58, 102, 6, .15, 12, true);
    Entity.call(this, game, 400, 0);

}

CopStore.prototype = new Entity();
CopStore.prototype.constructor = CopStore;

CopStore.prototype.update = function () {
    Entity.prototype.update.call(this);
}

CopStore.prototype.draw = function (ctx) {
    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

function Brewery(game, img) {
    this.animation = new Animation(img, 0, 1, 118, 90, 4, .15, 12, true);
    Entity.call(this, game, 500, 0);

}

Brewery.prototype = new Entity();
Brewery.prototype.constructor = Brewery;

Brewery.prototype.update = function () {
    Entity.prototype.update.call(this);
}

Brewery.prototype.draw = function (ctx) {
    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

function Firehouse(game, img) {
    this.animation = new Animation(img, 0, 1, 58, 100, 6, .15, 12, true);
    Entity.call(this, game, 650, 0);

}

Firehouse.prototype = new Entity();
Firehouse.prototype.constructor = Firehouse;

Firehouse.prototype.update = function () {
    Entity.prototype.update.call(this);
}

Firehouse.prototype.draw = function (ctx) {
    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

function Goldmine(game, img) {
    this.animation = new Animation(img, 0, 1, 118, 63, 17, .15, 9, true);
    Entity.call(this, game, 0, 110);

}

Goldmine.prototype = new Entity();
Goldmine.prototype.constructor = Goldmine;

Goldmine.prototype.update = function () {
    Entity.prototype.update.call(this);
}

Goldmine.prototype.draw = function (ctx) {
    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

function Housing(game, img) {
    this.animation = new Animation(img, 0, 0, 118, 97, 6, 1, 12, true);
    Entity.call(this, game, 150, 110);

}

Housing.prototype = new Entity();
Housing.prototype.constructor = Housing;

Housing.prototype.update = function () {
    Entity.prototype.update.call(this);
}

Housing.prototype.draw = function (ctx) {
    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

function HuntingLodge(game, img) {
    this.animation = new Animation(img, 0, 1, 118, 111, 9, 0.15, 18, true);
    Entity.call(this, game, 300, 110);

}

HuntingLodge.prototype = new Entity();
HuntingLodge.prototype.constructor = HuntingLodge;

HuntingLodge.prototype.update = function () {
    Entity.prototype.update.call(this);
}

HuntingLodge.prototype.draw = function (ctx) {
    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

function Mansion(game, img) {
    this.animation = new Animation(img, 0, 1, 238, 159, 6, 0.15, 12, true);
    Entity.call(this, game, 450, 110);

}

Mansion.prototype = new Entity();
Mansion.prototype.constructor = Mansion;

Mansion.prototype.update = function () {
    Entity.prototype.update.call(this);
}

Mansion.prototype.draw = function (ctx) {
    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

function Potter(game, img) {
    this.animation = new Animation(img, 0, 1, 118, 90, 6, 0.15, 12, true);
    Entity.call(this, game, 0, 220);

}

Potter.prototype = new Entity();
Potter.prototype.constructor = Potter;

Potter.prototype.update = function () {
    Entity.prototype.update.call(this);
}

Potter.prototype.draw = function (ctx) {
    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

function WorkCamp(game, img) {
    this.animation = new Animation(img, 0, 1, 118, 83, 10, 0.15, 20, true);
    Entity.call(this, game, 0, 320);

}

WorkCamp.prototype = new Entity();
WorkCamp.prototype.constructor = WorkCamp;

WorkCamp.prototype.update = function () {
    Entity.prototype.update.call(this);
}

WorkCamp.prototype.draw = function (ctx) {
    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

function TaxHouse(game, img) {
    this.animation = new Animation(img, 0, 1, 118, 96, 8, 0.15, 8, true);
    Entity.call(this, game, 150, 250);

}

TaxHouse.prototype = new Entity();
TaxHouse.prototype.constructor = TaxHouse;

TaxHouse.prototype.update = function () {
    Entity.prototype.update.call(this);
}

TaxHouse.prototype.draw = function (ctx) {
    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

function Palace(game, img) {
    this.animation = new Animation(img, 0, 1, 298, 187, 6, 0.15, 6, true);
    Entity.call(this, game, 300, 300);

}

Palace.prototype = new Entity();
Palace.prototype.constructor = Palace;

Palace.prototype.update = function () {
    Entity.prototype.update.call(this);
}

Palace.prototype.draw = function (ctx) {
    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

function Barley(game, img) {
    this.animation = new Animation(img, 0, 1, 178, 91, 6, 1, 6, true);
    Entity.call(this, game, 600, 300);

}

Barley.prototype = new Entity();
Barley.prototype.constructor = Barley;

Barley.prototype.update = function () {
    Entity.prototype.update.call(this);
}

Barley.prototype.draw = function (ctx) {
    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}







